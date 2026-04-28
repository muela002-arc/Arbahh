"use client";

import { useMemo, useState } from "react";
import { formatNumber } from "@/lib/formatters";
import { useLanguage } from "./LanguageContext";

type Country = "gulf" | "egypt" | "mixed";
type Category = "entertainment" | "comedy" | "dance" | "education" | "food" | "tech" | "lifestyle";

const RPM: Record<Country, { low: number; high: number }> = {
  gulf:    { low: 0.02, high: 0.05 },
  egypt:   { low: 0.005, high: 0.015 },
  mixed:   { low: 0.01,  high: 0.03 }
};

const categories: { slug: Category; ar: string; en: string; icon: string }[] = [
  { slug: "entertainment", ar: "ترفيه",   en: "Entertainment", icon: "🎉" },
  { slug: "comedy",        ar: "فيديوهات كوميدية", en: "Comedy", icon: "😂" },
  { slug: "dance",         ar: "رقص",     en: "Dance",          icon: "💃" },
  { slug: "education",     ar: "تعليم",   en: "Education",      icon: "📚" },
  { slug: "food",          ar: "طبخ",     en: "Food",           icon: "🍳" },
  { slug: "tech",          ar: "تقنية",   en: "Tech",           icon: "🖥️" },
  { slug: "lifestyle",     ar: "لايف ستايل", en: "Lifestyle",   icon: "✨" }
];

const countries: { slug: Country; ar: string; en: string }[] = [
  { slug: "gulf",  ar: "الخليج (السعودية، الإمارات، الكويت)", en: "Gulf (KSA, UAE, Kuwait)" },
  { slug: "egypt", ar: "مصر، المغرب، الجزائر",                 en: "Egypt, Morocco, Algeria" },
  { slug: "mixed", ar: "جمهور عربي مختلط",                    en: "Mixed Arabic audience" }
];

function fmt(n: number) {
  return n < 0.01 ? n.toFixed(3) : n < 1 ? n.toFixed(2) : n.toFixed(0);
}

export default function TikTokCalculator() {
  const { lang } = useLanguage();
  const isArabic = lang === "ar";

  const [views, setViews] = useState(100000);
  const [country, setCountry] = useState<Country>("mixed");
  const [category, setCategory] = useState<Category>("entertainment");

  const rpm = RPM[country];

  const result = useMemo(() => {
    const low  = (views / 1000) * rpm.low;
    const high = (views / 1000) * rpm.high;
    return {
      monthly: { low: low * 30, high: high * 30 },
      yearly:  { low: low * 365, high: high * 365 },
      daily:   { low, high }
    };
  }, [views, rpm]);

  const label = (ar: string, en: string) => (isArabic ? ar : en);

  return (
    <section className="mx-auto w-full max-w-3xl px-4 sm:px-6" dir={isArabic ? "rtl" : "ltr"}>
      <div className="rounded-2xl border border-white/[0.08] bg-[#0F172A] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.32)]">
        <h2 className="text-2xl font-semibold text-slate-100">
          {label("حاسبة أرباح تيك توك", "TikTok Earnings Calculator")}
        </h2>
        <p className="mt-2 text-[14px] leading-7 text-slate-400">
          {label(
            "تقدير أرباح صندوق المبدعين بناء على المشاهدات الشهرية والجمهور.",
            "Estimate Creator Fund earnings based on monthly views and audience."
          )}
        </p>

        {/* Disclaimer banner */}
        <div className="mt-4 rounded-xl border border-amber-600/30 bg-amber-500/10 px-4 py-3 text-[13px] leading-6 text-amber-200">
          {label(
            "معدلات تيك توك أقل بكثير من يوتيوب AdSense. صندوق المبدعين يدفع بين $0.02–$0.05 لكل ألف مشاهدة في أفضل الأسواق، مقارنة بـ $1–$10+ على يوتيوب.",
            "TikTok Creator Fund rates are significantly lower than YouTube AdSense — $0.02–$0.05 per 1K views in top markets vs $1–$10+ on YouTube."
          )}
        </div>

        <div className="mt-6 grid gap-5">
          {/* Monthly views */}
          <div>
            <label className="mb-2 block text-[14px] font-semibold text-white/90">
              {label("المشاهدات الشهرية", "Monthly Views")}
            </label>
            <div className="mb-2 rounded-xl bg-red-600/10 p-3 text-center">
              <strong className="text-2xl font-semibold text-slate-100">
                {formatNumber(views, isArabic)}
              </strong>
            </div>
            <input
              type="range"
              min={0} max={100}
              value={Math.round((Math.log10(Math.max(1000, views)) - 3) / (8 - 3) * 100)}
              onChange={(e) => {
                const v = Number(e.target.value);
                setViews(Math.round(10 ** (3 + (v / 100) * (8 - 3))));
              }}
              className="w-full"
            />
            <div className="mt-1 flex justify-between text-[11px] text-slate-500">
              <span>1K</span><span>100M</span>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-[14px] font-semibold text-white/90">
              {label("نوع المحتوى", "Content Category")}
            </label>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(90px,1fr))] gap-2">
              {categories.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setCategory(c.slug)}
                  className={`rounded-xl border px-2 py-3 text-center text-[12px] transition ${
                    category === c.slug
                      ? "border-slate-400 bg-slate-700 text-white"
                      : "border-slate-800 bg-[#0F172A] text-slate-400 hover:border-slate-600"
                  }`}
                >
                  <span className="block text-lg">{c.icon}</span>
                  <span className="mt-1 block">{isArabic ? c.ar : c.en}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="mb-2 block text-[14px] font-semibold text-white/90">
              {label("الجمهور الأساسي", "Primary Audience")}
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value as Country)}
              className="w-full"
            >
              {countries.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {isArabic ? c.ar : c.en}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { label: label("يوميًا", "Daily"),   range: result.daily },
            { label: label("شهريًا", "Monthly"), range: result.monthly },
            { label: label("سنويًا", "Yearly"),  range: result.yearly }
          ].map(({ label: lbl, range }) => (
            <div key={lbl} className="rounded-2xl border border-white/[0.08] bg-[#162033] p-4 text-center">
              <strong className="block text-xl font-semibold text-slate-300">
                ${fmt(range.low)} – ${fmt(range.high)}
              </strong>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">{lbl}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-[12px] leading-6 text-slate-500">
          {label(
            "هذه أرقام تقديرية فقط. الأرباح الفعلية تتفاوت حسب سياسات تيك توك والجمهور والموسم.",
            "These are estimates only. Actual earnings vary with TikTok policies, audience, and season."
          )}
        </p>
      </div>
    </section>
  );
}
