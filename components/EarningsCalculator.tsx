"use client";

import { useEffect, useMemo, useState } from "react";
import { buildEstimateModes } from "@/lib/earningsCalculator";
import { formatNumber } from "@/lib/formatters";
import { translations } from "@/lib/i18n";
import { getRpmRange, tipsByNiche, type ContentFormat, type CountrySlug, type NicheSlug } from "@/lib/rpmData";
import type { ChannelEstimateError, ChannelEstimateResponse, EstimateMode } from "@/lib/youtubeTypes";
import { useLanguage } from "./LanguageContext";
import ToastNotification from "./ToastNotification";

type EarningsCalculatorProps = {
  defaultNiche?: NicheSlug;
  full?: boolean;
};

type CountryCode = "" | "SA" | "AE" | "KW" | "QA" | "BH" | "OM" | "EG" | "MA" | "DZ" | "TN" | "LY" | "IQ" | "JO" | "SY" | "LB" | "MIX";

type NicheOption = {
  slug: NicheSlug;
  ar: string;
  en: string;
  icon: string;
};

const nicheOptions: NicheOption[] = [
  { slug: "general", ar: "عام", en: "General", icon: "✨" },
  { slug: "tech", ar: "تقنية", en: "Tech", icon: "🖥️" },
  { slug: "finance", ar: "مال وأعمال", en: "Finance", icon: "💰" },
  { slug: "education", ar: "تعليم", en: "Education", icon: "📚" },
  { slug: "cooking", ar: "طبخ", en: "Cooking", icon: "🍳" },
  { slug: "gaming", ar: "ألعاب", en: "Gaming", icon: "🎮" },
  { slug: "entertainment", ar: "ترفيه", en: "Entertainment", icon: "😂" },
  { slug: "sports", ar: "رياضة", en: "Sports", icon: "⚽" },
  { slug: "travel", ar: "سفر", en: "Travel", icon: "🌍" },
  { slug: "kids", ar: "أطفال", en: "Kids", icon: "👶" },
  { slug: "religion", ar: "دين", en: "Religion", icon: "🕌" },
  { slug: "beauty", ar: "صحة وجمال", en: "Health & Beauty", icon: "💄" },
  { slug: "comedy", ar: "كوميديا", en: "Comedy", icon: "🎭" }
];

const quickPickValues = [1000, 10000, 100000, 1000000];
const termsStorageKey = "arbah_terms_accepted";

const countryToRpmCountry: Record<Exclude<CountryCode, "">, CountrySlug> = {
  SA: "sa",
  AE: "ae",
  KW: "kw",
  QA: "ae",
  BH: "kw",
  OM: "other",
  EG: "eg",
  MA: "ma",
  DZ: "ma",
  TN: "ma",
  LY: "eg",
  IQ: "iq",
  JO: "jo",
  SY: "jo",
  LB: "jo",
  MIX: "other"
};

const englishTips: Record<NicheSlug, string> = {
  tech: "For tech channels, focus on product reviews, comparisons, and purchase-intent topics because these usually attract higher-value ads.",
  finance: "Finance content works best when it answers a clear beginner question and includes careful disclaimers without promising outcomes.",
  education: "Educational channels grow faster when lessons are grouped into series and each video solves one specific problem.",
  cooking: "Cooking channels benefit from practical recipes, ingredient costs, substitutes, and clear final-result shots.",
  gaming: "For gaming, mix highlights with searchable tutorials, settings, updates, and walkthroughs so videos keep getting views after publishing.",
  entertainment: "Entertainment videos need a strong first ten seconds, recurring formats, and a clear reason to watch until the end.",
  sports: "Sports channels should publish close to matches and events, then add analysis instead of only repeating the news.",
  beauty: "Health and beauty content works better when it names the skin, hair, or lifestyle context and avoids unsupported medical claims.",
  travel: "Travel channels should include budgets, best times to visit, common mistakes, and practical details viewers can use.",
  kids: "Kids content should stay safe, simple, recurring, and family-friendly, with learning value where possible.",
  religion: "Religious content should be calm, well-sourced, and clear, avoiding sensational titles or unsupported claims.",
  comedy: "Comedy channels grow through repeatable characters, relatable situations, and testing short ideas before expanding them.",
  general: "For mixed channels, choose one clear angle per video. A focused audience helps YouTube understand who should see your content."
};

function sliderToViews(value: number) {
  const min = Math.log10(100);
  const max = Math.log10(5000000);
  return Math.round(10 ** (min + (value / 100) * (max - min)));
}

function viewsToSlider(value: number) {
  const min = Math.log10(100);
  const max = Math.log10(5000000);
  return Math.round(((Math.log10(Math.max(100, value)) - min) / (max - min)) * 100);
}

function currencyRange(low: number, high: number, useArabicNumerals: boolean) {
  return `${formatNumber(low, useArabicNumerals, { currency: true, decimals: low < 100 ? 2 : 0 })} – ${formatNumber(high, useArabicNumerals, {
    currency: true,
    decimals: high < 100 ? 2 : 0
  })}`;
}

function localizeError(code: ChannelEstimateError["error"]["code"] | "unknown", isArabic: boolean) {
  const ar: Record<string, string> = {
    missing_query: "أدخل رابط قناة يوتيوب أو @handle أو اسم قناة.",
    missing_api_key: "مفتاح YouTube API غير مضبوط على الخادم. يمكنك استخدام الحاسبة اليدوية الآن.",
    invalid_url: "الرابط غير واضح. جرّب رابط قناة يوتيوب أو اسم القناة.",
    not_found: "لم نتمكن من العثور على قناة عامة مطابقة.",
    quota_exceeded: "تم الوصول إلى حد استخدام YouTube API. جرّب لاحقا أو استخدم الإدخال اليدوي.",
    no_recent_videos: "لا توجد فيديوهات عامة حديثة كافية لتقدير المشاهدات.",
    youtube_error: "تعذر تحميل بيانات يوتيوب الآن. استخدم الإدخال اليدوي.",
    network_error: "حدث خطأ في الاتصال. تحقق من الشبكة وحاول مرة أخرى.",
    unknown: "حدث خطأ غير متوقع. يمكنك استخدام الحاسبة اليدوية."
  };
  const en: Record<string, string> = {
    missing_query: "Enter a YouTube channel URL, @handle, or channel name.",
    missing_api_key: "The YouTube API key is not configured on the server. You can use manual input for now.",
    invalid_url: "The URL is not clear. Try a YouTube channel URL or channel name.",
    not_found: "We could not find a matching public channel.",
    quota_exceeded: "YouTube API quota has been reached. Try again later or use manual input.",
    no_recent_videos: "There are not enough recent public videos to estimate views.",
    youtube_error: "YouTube data could not be loaded right now. Use manual input.",
    network_error: "Network error. Check your connection and try again.",
    unknown: "Unexpected error. You can still use the manual calculator."
  };
  return (isArabic ? ar : en)[code] ?? (isArabic ? ar.unknown : en.unknown);
}

export default function EarningsCalculator({ defaultNiche = "general" }: EarningsCalculatorProps) {
  const { lang } = useLanguage();
  const t = translations[lang];
  const isArabic = lang === "ar";
  const [hasCalculated, setHasCalculated] = useState(false);
  const [channelQuery, setChannelQuery] = useState("");
  const [channelEstimate, setChannelEstimate] = useState<ChannelEstimateResponse | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState("");
  const [channelName, setChannelName] = useState("");
  const [viewsMode, setViewsMode] = useState<"daily" | "monthly">("daily");
  const [dailyViews, setDailyViews] = useState(10000);
  const [slider, setSlider] = useState(viewsToSlider(10000));
  const [niche, setNiche] = useState<NicheSlug>(defaultNiche);
  const [country, setCountry] = useState<CountryCode>("MIX");
  const [useArabicNumerals, setUseArabicNumerals] = useState(isArabic);
  const [toast, setToast] = useState(false);
  const [resultLoading, setResultLoading] = useState(false);
  const [manualError, setManualError] = useState("");
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [format, setFormat] = useState<ContentFormat>("standard");
  const [isMonetized, setIsMonetized] = useState(true);

  useEffect(() => setUseArabicNumerals(isArabic), [isArabic]);

  useEffect(() => {
    setHasAcceptedTerms(window.localStorage.getItem(termsStorageKey) === "true");
  }, []);

  useEffect(() => {
    if (!hasCalculated || lookupLoading) return;
    setResultLoading(true);
    const timer = window.setTimeout(() => setResultLoading(false), 180);
    return () => window.clearTimeout(timer);
  }, [dailyViews, niche, country, format, viewsMode, hasCalculated, lookupLoading]);

  const rpmCountry = country ? countryToRpmCountry[country] : "other";
  const rpm = useMemo(() => getRpmRange(niche, rpmCountry, undefined, format), [niche, rpmCountry, format]);
  const estimateModes = useMemo(() => buildEstimateModes(dailyViews, niche, rpmCountry, format), [dailyViews, niche, rpmCountry, format]);
  const nicheAdjusted = estimateModes.find((mode) => mode.mode === "nicheAdjusted") ?? estimateModes[2];

  const result = useMemo(() => {
    const dailyLow = (dailyViews / 1000) * rpm.low;
    const dailyHigh = (dailyViews / 1000) * rpm.high;
    return {
      dailyLow,
      dailyHigh,
      monthlyLow: dailyLow * 30,
      monthlyHigh: dailyHigh * 30,
      yearlyLow: dailyLow * 365,
      yearlyHigh: dailyHigh * 365,
      progress: Math.min(100, Math.round((dailyViews / 4000) * 100))
    };
  }, [dailyViews, rpm.high, rpm.low]);

  function updateViews(value: number, mode = viewsMode) {
    if (!Number.isFinite(value) || value <= 0) {
      setManualError(t.error);
      return;
    }
    setManualError("");
    const safeValue = Math.min(5000000, Math.max(100, mode === "monthly" ? Math.round(value / 30) : value));
    setDailyViews(safeValue);
    setSlider(viewsToSlider(safeValue));
  }

  function updateSlider(value: number) {
    setManualError("");
    setSlider(value);
    setDailyViews(sliderToViews(value));
  }

  function selectQuickPick(value: number) {
    updateViews(value, "daily");
    setViewsMode("daily");
  }

  function updateTermsAcceptance(accepted: boolean) {
    setHasAcceptedTerms(accepted);
    if (accepted) {
      window.localStorage.setItem(termsStorageKey, "true");
      setManualError("");
      return;
    }
    window.localStorage.removeItem(termsStorageKey);
    setHasCalculated(false);
    setChannelEstimate(null);
  }

  function requireTermsAccepted() {
    if (hasAcceptedTerms) return true;
    setManualError(
      isArabic
        ? "يجب الموافقة على الشروط والتنبيه قبل استخدام الحاسبة."
        : "You must accept the terms and disclaimer before using the calculator."
    );
    return false;
  }

  function calculateManual() {
    if (!requireTermsAccepted()) return;
    if (!Number.isFinite(dailyViews) || dailyViews <= 0) {
      setManualError(t.error);
      return;
    }
    setLookupError("");
    setManualError("");
    setHasCalculated(true);
    setResultLoading(true);
    window.setTimeout(() => setResultLoading(false), 180);
  }

  async function lookupOrCalculate() {
    if (!requireTermsAccepted()) return;
    if (typeof window !== "undefined" && typeof (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag === "function") {
      (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag("event", "calculate_click", {
        event_category: "engagement",
        event_label: "calculator"
      });
    }
    const query = channelQuery.trim();
    if (!query) {
      calculateManual();
      return;
    }

    setLookupLoading(true);
    setResultLoading(true);
    setLookupError("");
    setManualError("");
    setHasCalculated(true);

    try {
      const response = await fetch("/api/youtube/channel-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      });
      const data = (await response.json()) as ChannelEstimateResponse | ChannelEstimateError;

      if (!response.ok || "error" in data) {
        const code = "error" in data ? data.error.code : "unknown";
        setLookupError(localizeError(code, isArabic));
        return;
      }

      setChannelEstimate(data);
      setChannelName(data.channelTitle);
      updateViews(data.estimatedDailyViews, "daily");
      setViewsMode("daily");
      setNiche(data.detectedNiche);
    } catch {
      setLookupError(localizeError("network_error", isArabic));
    } finally {
      setLookupLoading(false);
      setResultLoading(false);
    }
  }

  async function shareResult() {
    const url = `${window.location.origin}/نتيجة?v=${dailyViews}&n=${niche}&r=${rpm.final.toFixed(2)}`;
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
    }
    setToast(true);
    window.setTimeout(() => setToast(false), 1800);
  }

  const inputViews = viewsMode === "daily" ? dailyViews : dailyViews * 30;
  const displayedViewsUnit = viewsMode === "daily" ? t.dailyViewsUnit : t.monthlyViewsUnit;
  const currentTip = isArabic ? tipsByNiche[niche] : englishTips[niche];
  const sliderBackground = `linear-gradient(to right, #DC2626 ${slider}%, #1E293B ${slider}%)`;
  const hasVisibleResult = hasCalculated && !lookupError && !manualError && isMonetized;
  const displayedDaily = hasVisibleResult ? nicheAdjusted.dailyEarningsRange : { low: 0, high: 0 };
  const displayedMonthly = hasVisibleResult ? nicheAdjusted.monthlyEarningsRange : { low: 0, high: 0 };
  const displayedYearly = hasVisibleResult ? nicheAdjusted.yearlyEarningsRange : { low: 0, high: 0 };
  const searchStateClass = lookupError
    ? "border-[#FF3B3B] bg-[rgba(255,59,59,0.05)]"
    : channelEstimate
      ? "border-[#2ECC71] bg-[#1F2A3A]"
      : "border-white/15 bg-[#1F2A3A]";
  const legalDisclaimer = isArabic
    ? "هذه النتائج تقديرية فقط وتعتمد على بيانات عامة وافتراضات RPM. الأرباح الفعلية قد تختلف. الموقع غير تابع ليوتيوب أو Google."
    : "These results are estimates only based on public data and RPM assumptions. Actual earnings may vary. This site is not affiliated with YouTube or Google.";
  const termsText = isArabic
    ? "أوافق على أن النتائج تقديرية فقط وليست نصيحة مالية، وأوافق على شروط الاستخدام."
    : "I understand the results are estimates only, not financial advice, and I accept the Terms.";
  return (
    <section id="calculator" className="mx-auto w-full max-w-6xl px-4 sm:px-6" aria-label={isArabic ? "حاسبة أرباح يوتيوب" : "YouTube earnings calculator"}>
      <div
        className="rounded-2xl border border-white/[0.08] bg-[#0F172A] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.32)] sm:p-6 lg:p-8"
        dir={t.dir}
      >
        <div className="mb-5">
          <h2 className="text-[26px] font-semibold leading-tight text-slate-100">{isArabic ? "حاسبة أرباح يوتيوب" : "YouTube Earnings Calculator"}</h2>
          <p className="mt-2 text-[15px] leading-7 text-slate-300">{t.intro}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[55fr_45fr] lg:items-center">
          <div className={isArabic ? "text-right" : "text-left"}>
            <div className="rounded-2xl border border-[rgba(255,59,59,0.28)] bg-[linear-gradient(180deg,#1B2638_0%,#131B2A_100%)] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.04),0_0_32px_rgba(255,59,59,0.08)]">
              <StepTitle>{isArabic ? "الخطوة ١ (اختياري) — بحث عن قناة" : "Step 1 (Optional) — Channel lookup"}</StepTitle>
              <label className="mb-2 block text-[15px] font-semibold text-white/[0.88]" htmlFor="channelLookup">
                {isArabic ? "أدخل رابط قناة يوتيوب أو اسم القناة أو @handle" : "Enter YouTube channel URL, @handle, or name"}
              </label>
              <div className="rounded-xl bg-white/[0.04] p-3">
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[20px] text-[#FF6B6B] opacity-100 ${isArabic ? "right-4" : "left-4"}`}
                  >
                    🔎
                  </span>
                  <input
                    className={`min-h-[52px] rounded-xl border border-white/[0.18] bg-white px-4 text-[16px] text-gray-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_18px_rgba(0,0,0,0.25)] placeholder:text-gray-400 focus:border-[#FF3B3B] focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,59,59,0.22),0_10px_24px_rgba(0,0,0,0.35)] ${
                      isArabic ? "pr-11" : "pl-11"
                    } ${searchStateClass}`}
                    id="channelLookup"
                    onChange={(event) => setChannelQuery(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && hasAcceptedTerms) lookupOrCalculate();
                    }}
                    placeholder={isArabic ? "مثال: youtube.com/@MrBeast أو MrBeast" : "e.g. youtube.com/@MrBeast or MrBeast"}
                    type="text"
                    value={channelQuery}
                  />
                </div>
              </div>
              <div className="mt-3 rounded-xl border border-white/[0.12] bg-white/[0.04] p-3">
                <label className="flex items-start gap-3 text-[13px] leading-6 text-slate-300">
                  <input
                    aria-describedby="calculatorLegalLinks"
                    checked={hasAcceptedTerms}
                    className="mt-1 shrink-0"
                    onChange={(event) => updateTermsAcceptance(event.target.checked)}
                    type="checkbox"
                  />
                  <span>{termsText}</span>
                </label>
                <p className="mt-2 text-[12px] leading-6 text-slate-400" id="calculatorLegalLinks">
                  <a className="text-red-400 underline-offset-4 hover:underline" href="/terms">
                    Terms
                  </a>
                  <span className="mx-2">·</span>
                  <a className="text-red-400 underline-offset-4 hover:underline" href="/privacy">
                    Privacy
                  </a>
                  <span className="mx-2">·</span>
                  <a className="text-red-400 underline-offset-4 hover:underline" href="/disclaimer">
                    Disclaimer
                  </a>
                </p>
              </div>
              <button
                className="mt-3 min-h-[56px] w-full rounded-xl bg-[linear-gradient(180deg,#FF4242_0%,#E62525_100%)] p-4 text-lg font-semibold text-white shadow-[0_12px_28px_rgba(255,59,59,0.32),inset_0_1px_0_rgba(255,255,255,0.18)] transition hover:-translate-y-px hover:shadow-[0_16px_36px_rgba(255,59,59,0.42),inset_0_1px_0_rgba(255,255,255,0.18)] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={lookupLoading || !hasAcceptedTerms}
                onClick={lookupOrCalculate}
                type="button"
              >
                {lookupLoading ? (isArabic ? "جاري الحساب..." : "Calculating...") : isArabic ? "احسب الأرباح" : "Calculate earnings"}
              </button>
              <p className="mt-2 text-[13px] leading-6 text-slate-400">
                {isArabic ? "اترك الحقل فارغا لاستخدام الحاسبة اليدوية مباشرة." : "Leave this blank to use the manual calculator directly."}
              </p>
            </div>

            <div className="mt-5 grid gap-5">
              <div>
                <StepTitle>{t.step2Label}</StepTitle>
                <label className="mb-2 block text-[15px] font-semibold text-white/[0.88]" htmlFor="viewsInput">
                  {t.viewsQuestion}
                </label>
                <div className="mb-3 grid grid-cols-2 gap-2 rounded-xl border border-slate-800 bg-slate-950 p-1">
                  {(["daily", "monthly"] as const).map((mode) => (
                    <button
                      className={`rounded-lg px-3 py-2 text-sm font-medium ${viewsMode === mode ? "bg-red-600 text-white" : "text-slate-400 hover:text-slate-100"}`}
                      key={mode}
                      onClick={() => setViewsMode(mode)}
                      type="button"
                    >
                      {mode === "daily" ? t.viewsModeDaily : t.viewsModeMonthly}
                    </button>
                  ))}
                </div>
                <div className="mb-3 rounded-[10px] bg-red-600/10 p-3 text-center">
                  <strong className="block text-[28px] font-semibold leading-tight text-slate-100">
                    {formatNumber(inputViews, useArabicNumerals)} {displayedViewsUnit}
                  </strong>
                </div>
                <input id="viewsInput" inputMode="numeric" min={viewsMode === "daily" ? 100 : 3000} onChange={(event) => updateViews(Number(event.target.value))} type="number" value={inputViews} />
                <input aria-label={t.viewsQuestion} className="mt-4" max={100} min={0} onChange={(event) => updateSlider(Number(event.target.value))} style={{ background: sliderBackground }} type="range" value={slider} />
                <div className="mt-3 flex flex-wrap gap-2">
                  {quickPickValues.map((value, index) => {
                    const active = dailyViews === value;
                    return (
                      <button
                        className={`inline-flex rounded-full border px-[14px] py-[6px] text-[13px] transition ${
                          active ? "border-red-600 bg-red-600/10 text-red-600" : "border-slate-700 bg-transparent text-slate-400 hover:border-red-600 hover:text-red-600"
                        }`}
                        key={value}
                        onClick={() => selectQuickPick(value)}
                        type="button"
                      >
                        {t.quickPicks[index]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <InfoBox title={t.rpmUsed}>
                  {currencyRange(rpm.low, rpm.high, useArabicNumerals)} / {isArabic ? "ألف مشاهدة" : "1K views"}
                </InfoBox>
                <InfoBox title={t.confidence}>
                  {channelEstimate ? `${channelEstimate.confidence} · ${isArabic ? "حسب بيانات عامة" : "based on public data"}` : t.confidenceText}
                </InfoBox>
              </div>

              <div>
                <StepTitle>{isArabic ? "الخطوة ٢.٥ — نوع المحتوى" : "Step 2.5 — Content format"}</StepTitle>
                <label className="mb-2 block text-[15px] font-semibold text-white/[0.88]">
                  {isArabic ? "ما نوع الفيديوهات التي تنشرها؟" : "What type of videos do you post?"}
                </label>
                <div className="grid grid-cols-3 gap-2 rounded-xl border border-slate-800 bg-slate-950 p-1">
                  {(
                    [
                      { value: "shorts", ar: "شورتس", en: "Shorts", icon: "⚡", hint: isArabic ? "دخل منخفض جداً" : "Very low RPM" },
                      { value: "standard", ar: "عادي", en: "Standard", icon: "▶️", hint: isArabic ? "أقل من ٨ دقائق" : "Under 8 min" },
                      { value: "longform", ar: "طويل", en: "Long-form", icon: "🎬", hint: isArabic ? "٨ دقائق أو أكثر" : "8 min or more" }
                    ] as const
                  ).map((opt) => (
                    <button
                      className={`flex flex-col items-center rounded-lg px-2 py-3 text-center transition ${format === opt.value ? "bg-red-600 text-white" : "text-slate-400 hover:text-slate-100"}`}
                      key={opt.value}
                      onClick={() => setFormat(opt.value)}
                      type="button"
                    >
                      <span className="text-lg" aria-hidden="true">{opt.icon}</span>
                      <span className="mt-1 block text-[13px] font-semibold">{isArabic ? opt.ar : opt.en}</span>
                      <span className={`mt-0.5 block text-[10px] ${format === opt.value ? "text-red-200" : "text-slate-500"}`}>{opt.hint}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <StepTitle>{isArabic ? "الخطوة ٢.٧ — حالة التحقيق من الدخل" : "Step 2.7 — Monetization status"}</StepTitle>
                <button
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    isMonetized
                      ? "border-green-600/50 bg-green-600/10 text-green-400"
                      : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600"
                  }`}
                  onClick={() => setIsMonetized((v) => !v)}
                  type="button"
                >
                  <span>{isArabic ? "القناة مُفعَّل عليها تحقيق الدخل (YPP)" : "Channel is monetized (YPP)"}</span>
                  <span className={`flex h-6 w-11 items-center rounded-full transition-colors ${isMonetized ? "bg-green-600" : "bg-slate-700"}`}>
                    <span className={`h-4 w-4 rounded-full bg-white shadow transition-transform ${isMonetized ? "translate-x-6" : "translate-x-1"}`} />
                  </span>
                </button>
                {!isMonetized && (
                  <p className="mt-2 text-[12px] leading-5 text-slate-400">
                    {isArabic
                      ? "للانضمام إلى برنامج شركاء يوتيوب تحتاج ١٠٠٠ مشترك + ٤٠٠٠ ساعة مشاهدة (أو ١٠ مليون مشاهدة على شورتس) خلال ١٢ شهراً."
                      : "To join YPP you need 1,000 subscribers + 4,000 watch hours (or 10M Shorts views) in the past 12 months."}
                  </p>
                )}
              </div>

              <div>
                <StepTitle>{t.step3Label}</StepTitle>
                <label className="mb-2 block text-[15px] font-semibold text-white/[0.88]">{t.nicheQuestion}</label>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(96px,1fr))] gap-2">
                  {nicheOptions.map((option) => {
                    const selected = niche === option.slug;
                    return (
                      <button
                        className={`h-20 rounded-[10px] border px-2 py-3 text-center transition ${
                          selected ? "border-red-600 bg-red-600/10" : "border-slate-800 bg-[#0F172A] hover:border-slate-600"
                        }`}
                        key={option.slug}
                        onClick={() => setNiche(option.slug)}
                        type="button"
                      >
                        <span className="block text-xl" aria-hidden="true">
                          {option.icon}
                        </span>
                        <span className={`mt-1 block whitespace-nowrap text-center text-[11px] font-medium ${selected ? "text-slate-100" : "text-slate-400"}`}>
                          {isArabic ? option.ar : option.en}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <StepTitle>{t.step4Label}</StepTitle>
                <label className="mb-2 block text-[15px] font-semibold text-white/[0.88]" htmlFor="country">
                  {t.countryQuestion}
                </label>
                <select id="country" onChange={(event) => setCountry(event.target.value as CountryCode)} value={country}>
                  <option value="" disabled hidden>
                    {t.countryPlaceholder}
                  </option>
                  <optgroup label={isArabic ? "الخليج" : "Gulf"}>
                    <option value="SA">🇸🇦 السعودية — Saudi Arabia</option>
                    <option value="AE">🇦🇪 الإمارات — UAE</option>
                    <option value="KW">🇰🇼 الكويت — Kuwait</option>
                    <option value="QA">🇶🇦 قطر — Qatar</option>
                    <option value="BH">🇧🇭 البحرين — Bahrain</option>
                    <option value="OM">🇴🇲 عُمان — Oman</option>
                  </optgroup>
                  <optgroup label={isArabic ? "شمال أفريقيا" : "North Africa"}>
                    <option value="EG">🇪🇬 مصر — Egypt</option>
                    <option value="MA">🇲🇦 المغرب — Morocco</option>
                    <option value="DZ">🇩🇿 الجزائر — Algeria</option>
                    <option value="TN">🇹🇳 تونس — Tunisia</option>
                    <option value="LY">🇱🇾 ليبيا — Libya</option>
                  </optgroup>
                  <optgroup label={isArabic ? "المشرق" : "Levant"}>
                    <option value="IQ">🇮🇶 العراق — Iraq</option>
                    <option value="JO">🇯🇴 الأردن — Jordan</option>
                    <option value="SY">🇸🇾 سوريا — Syria</option>
                    <option value="LB">🇱🇧 لبنان — Lebanon</option>
                  </optgroup>
                  <optgroup label={isArabic ? "أخرى" : "Other"}>
                    <option value="MIX">🌍 جمهور مختلط — Mixed Arabic audience</option>
                  </optgroup>
                </select>
              </div>

              <label className="flex items-center gap-2 text-[13px] text-slate-400">
                <input checked={useArabicNumerals} onChange={(event) => setUseArabicNumerals(event.target.checked)} type="checkbox" />
                {t.arabicNumerals}
              </label>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/[0.08] bg-[linear-gradient(180deg,#0E1728_0%,#080D18_100%)] p-4 shadow-[0_22px_55px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)] lg:sticky lg:top-24">
            <div className="mb-4 rounded-xl border border-amber-600/30 bg-amber-500/10 px-4 py-3 text-[13px] leading-6 text-amber-200">
              {isArabic
                ? "هذه أرقام تقديرية فقط وليست نصيحة مالية أو ضماناً للدخل."
                : "These are estimates only and not financial advice or guaranteed income."}
            </div>
            {lookupLoading || resultLoading ? (
              <ResultsSkeleton />
            ) : lookupError || manualError ? (
              <ErrorState message={lookupError || manualError} />
            ) : !isMonetized ? (
              <NotMonetizedState isArabic={isArabic} />
            ) : (
              <>
                {channelEstimate ? <ChannelCard estimate={channelEstimate} isArabic={isArabic} useArabicNumerals={useArabicNumerals} /> : null}

                {!hasCalculated ? (
                  <p className="mb-4 rounded-xl border border-slate-800 bg-[#0F172A] p-4 text-center text-sm leading-7 text-slate-300">
                    {isArabic ? "أدخل قناة أو عدّل المشاهدات ثم اضغط احسب الأرباح لعرض التقدير." : "Enter a channel or edit views, then calculate earnings to see estimates."}
                  </p>
                ) : null}

                <div className="grid gap-3">
                  <SocialBladeResultCard label={isArabic ? "الأرباح اليومية المقدرة" : "Estimated Daily Earnings"} range={currencyRange(displayedDaily.low, displayedDaily.high, useArabicNumerals)} />
                  <SocialBladeResultCard
                    label={isArabic ? "الأرباح الشهرية المقدرة" : "Estimated Monthly Earnings"}
                    range={currencyRange(displayedMonthly.low, displayedMonthly.high, useArabicNumerals)}
                    strong
                  />
                  <SocialBladeResultCard label={isArabic ? "الأرباح السنوية المقدرة" : "Estimated Yearly Earnings"} range={currencyRange(displayedYearly.low, displayedYearly.high, useArabicNumerals)} />
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {estimateModes.map((mode) => (
                    <EstimateModeChip key={mode.mode} mode={mode} isArabic={isArabic} useArabicNumerals={useArabicNumerals} />
                  ))}
                </div>

                <p className="mt-4 rounded-xl border border-slate-800 bg-[#0F172A] p-3 text-sm leading-7 text-slate-300">
                  {isArabic
                    ? "التقدير الواسع يستخدم نطاق RPM بين 0.25 و4.00 دولار بشكل مشابه لأدوات التقدير العامة. تقديرات السوق العربي والمجال تستخدم افتراضات RPM أقل أو أعلى حسب الجمهور ونوع المحتوى."
                    : "Broad estimate uses a wide $0.25–$4.00 RPM range similar to public estimator tools. Arabic/niche estimates use lower or higher RPM assumptions based on audience and content category."}
                </p>

                <div className={`mt-4 bg-amber-500/10 px-4 py-[14px] ${isArabic ? "rounded-[0_8px_8px_0] border-r-[3px] border-amber-500" : "rounded-[8px_0_0_8px] border-l-[3px] border-amber-500"}`}>
                  <h4 className="text-[13px] font-semibold text-amber-500">{t.tipTitle}</h4>
                  <p className="mt-1 text-[13px] leading-[1.7] text-slate-300">{currentTip}</p>
                </div>

                <button className="mt-4 w-full rounded-lg border border-red-600 bg-transparent p-3 text-sm font-medium text-red-600 transition hover:bg-red-600/10" onClick={shareResult} type="button">
                  {t.shareBtn}
                </button>

                <p className="mt-4 text-center text-[12px] leading-[1.7] text-slate-400">{legalDisclaimer}</p>
              </>
            )}
          </aside>
        </div>
      </div>

      <ToastNotification message={t.copied} show={toast} />
    </section>
  );
}

function StepTitle({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.04em] text-red-500">{children}</p>;
}

function InfoBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-200">{children}</p>
    </div>
  );
}

function SocialBladeResultCard({ label, range, strong = false }: { label: string; range: string; strong?: boolean }) {
  return (
    <div
      className={`rounded-2xl border p-5 text-center shadow-[0_12px_28px_rgba(0,0,0,0.28)] ${
        strong
          ? "border-[rgba(255,59,59,0.35)] bg-[linear-gradient(180deg,rgba(255,59,59,0.15),rgba(255,59,59,0.06))]"
          : "border-white/[0.08] bg-[#162033]"
      }`}
    >
      <strong className={`block font-semibold leading-tight text-red-500 ${strong ? "text-3xl" : "text-2xl"}`}>{range}</strong>
      <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-400">{label}</p>
    </div>
  );
}

function EstimateModeChip({ mode, isArabic, useArabicNumerals }: { mode: EstimateMode; isArabic: boolean; useArabicNumerals: boolean }) {
  const labels: Record<EstimateMode["mode"], string> = {
    broad: isArabic ? "واسع" : "Broad",
    arabicMarket: isArabic ? "السوق العربي" : "Arabic",
    nicheAdjusted: isArabic ? "حسب المجال" : "Niche"
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#0F172A] p-3 text-center">
      <p className="text-xs font-semibold text-slate-300">{labels[mode.mode]}</p>
      <p className="mt-1 text-[11px] text-slate-500">RPM {currencyRange(mode.rpmRange.low, mode.rpmRange.high, useArabicNumerals)}</p>
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="grid animate-pulse gap-3">
      <div className="h-20 rounded-2xl bg-slate-800" />
      <div className="h-28 rounded-2xl bg-slate-800" />
      <div className="h-20 rounded-2xl bg-slate-800" />
      <div className="h-24 rounded-xl bg-slate-800" />
    </div>
  );
}

function NotMonetizedState({ isArabic }: { isArabic: boolean }) {
  const requirements = isArabic
    ? [
        { icon: "👥", label: "١٠٠٠ مشترك" },
        { icon: "⏱️", label: "٤٠٠٠ ساعة مشاهدة خلال ١٢ شهراً" },
        { icon: "⚡", label: "أو ١٠ مليون مشاهدة على شورتس" }
      ]
    : [
        { icon: "👥", label: "1,000 subscribers" },
        { icon: "⏱️", label: "4,000 watch hours in the past 12 months" },
        { icon: "⚡", label: "Or 10M Shorts views in 12 months" }
      ];

  return (
    <div className="rounded-2xl border border-amber-600/30 bg-amber-500/10 p-5">
      <p className="text-sm font-semibold text-amber-400">
        {isArabic ? "قناتك لم تنضم بعد إلى برنامج شركاء يوتيوب" : "Your channel isn't in the YouTube Partner Program yet"}
      </p>
      <p className="mt-2 text-[13px] leading-6 text-slate-300">
        {isArabic ? "لبدء تحقيق الدخل تحتاج إلى:" : "To start earning from ads you need:"}
      </p>
      <ul className="mt-3 grid gap-2">
        {requirements.map((req) => (
          <li className="flex items-center gap-2 text-[13px] text-slate-200" key={req.label}>
            <span aria-hidden="true">{req.icon}</span>
            {req.label}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[12px] leading-5 text-slate-400">
        {isArabic
          ? "بعد التأهل يمكنك تفعيل خيار 'القناة مُفعَّل عليها تحقيق الدخل' لرؤية تقديرات الأرباح."
          : "Once eligible, toggle 'Channel is monetized' above to see earnings estimates."}
      </p>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-red-600/40 bg-red-600/10 p-5 text-center">
      <p className="text-sm leading-7 text-red-100">{message}</p>
    </div>
  );
}

function ChannelCard({ estimate, isArabic, useArabicNumerals }: { estimate: ChannelEstimateResponse; isArabic: boolean; useArabicNumerals: boolean }) {
  return (
    <div className="mb-4 rounded-2xl border border-slate-800 bg-[#0F172A] p-4">
      <div className="flex items-center gap-4">
        {estimate.channelAvatar ? <img alt={estimate.channelTitle} className="h-14 w-14 rounded-full object-cover" loading="lazy" src={estimate.channelAvatar} /> : null}
        <div>
          <h3 className="text-base font-semibold text-slate-100">{estimate.channelTitle}</h3>
          <p className="text-xs text-slate-400">
            {isArabic ? "آخر تحديث" : "Last updated"}: {new Date(estimate.lastUpdated).toLocaleDateString(isArabic ? "ar-EG" : "en-US")}
          </p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <MiniMetric label={isArabic ? "المشتركون" : "Subscribers"} value={estimate.subscriberCount === null ? (isArabic ? "مخفي" : "Hidden") : formatNumber(estimate.subscriberCount, useArabicNumerals)} />
        <MiniMetric label={isArabic ? "إجمالي المشاهدات" : "Total views"} value={estimate.totalViews === null ? "—" : formatNumber(estimate.totalViews, useArabicNumerals)} />
        <MiniMetric label={isArabic ? "فيديوهات مستخدمة" : "Videos used"} value={formatNumber(estimate.recentVideoCountUsed, useArabicNumerals)} />
        <MiniMetric label={isArabic ? "عامل النشاط" : "Activity factor"} value={formatNumber(estimate.activityFactor, useArabicNumerals, { decimals: 1 })} />
      </div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
      <p className="text-[11px] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-100">{value}</p>
    </div>
  );
}
