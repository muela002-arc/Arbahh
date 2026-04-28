"use client";

import { useMemo, useState } from "react";
import { formatNumber } from "@/lib/formatters";
import { useLanguage } from "./LanguageContext";

type Tier = "nano" | "micro" | "mid" | "macro";
type Category = "lifestyle" | "fashion" | "food" | "tech" | "fitness" | "travel" | "comedy";

const TIERS: Record<Tier, { ar: string; en: string; range: string; perPost: { low: number; high: number }; followers: string }> = {
  nano:  { ar: "نانو (1K–10K)",    en: "Nano (1K–10K)",     range: "1,000–10,000",    perPost: { low: 10,   high: 50   }, followers: "1000" },
  micro: { ar: "ميكرو (10K–100K)", en: "Micro (10K–100K)",  range: "10,000–100,000",  perPost: { low: 50,   high: 300  }, followers: "10000" },
  mid:   { ar: "متوسط (100K–500K)",en: "Mid (100K–500K)",   range: "100,000–500,000", perPost: { low: 300,  high: 1500 }, followers: "100000" },
  macro: { ar: "كبير (500K+)",     en: "Macro (500K+)",     range: "500,000+",        perPost: { low: 1500, high: 10000}, followers: "500000" }
};

const categories: { slug: Category; ar: string; en: string; icon: string }[] = [
  { slug: "lifestyle", ar: "لايف ستايل", en: "Lifestyle",  icon: "✨" },
  { slug: "fashion",   ar: "موضة",        en: "Fashion",    icon: "👗" },
  { slug: "food",      ar: "طبخ",         en: "Food",       icon: "🍳" },
  { slug: "tech",      ar: "تقنية",       en: "Tech",       icon: "🖥️" },
  { slug: "fitness",   ar: "لياقة",       en: "Fitness",    icon: "💪" },
  { slug: "travel",    ar: "سفر",         en: "Travel",     icon: "🌍" },
  { slug: "comedy",    ar: "كوميديا",     en: "Comedy",     icon: "😂" }
];

export default function InstagramCalculator() {
  const { lang } = useLanguage();
  const isArabic = lang === "ar";

  const [tier, setTier]         = useState<Tier>("micro");
  const [engagement, setEngagement] = useState(3);
  const [category, setCategory] = useState<Category>("lifestyle");
  const [postsPerMonth, setPostsPerMonth] = useState(3);

  const result = useMemo(() => {
    const { low, high } = TIERS[tier].perPost;
    const engMultiplier = engagement >= 6 ? 1.3 : engagement >= 3 ? 1.0 : 0.7;
    return {
      perPost:  { low: Math.round(low * engMultiplier),  high: Math.round(high * engMultiplier) },
      monthly:  { low: Math.round(low * engMultiplier * postsPerMonth), high: Math.round(high * engMultiplier * postsPerMonth) },
      yearly:   { low: Math.round(low * engMultiplier * postsPerMonth * 12), high: Math.round(high * engMultiplier * postsPerMonth * 12) }
    };
  }, [tier, engagement, postsPerMonth]);

  const label = (ar: string, en: string) => (isArabic ? ar : en);

  return (
    <section className="mx-auto w-full max-w-3xl px-4 sm:px-6" dir={isArabic ? "rtl" : "ltr"}>
      <div className="rounded-2xl border border-white/[0.08] bg-[#0F172A] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.32)]">
        <h2 className="text-2xl font-semibold text-slate-100">
          {label("حاسبة أرباح إنستغرام", "Instagram Earnings Calculator")}
        </h2>
        <p className="mt-2 text-[14px] leading-7 text-slate-400">
          {label(
            "تقدير أرباح الصفقات المدفوعة بناء على عدد المتابعين ومعدل التفاعل.",
            "Estimate brand deal earnings based on follower count and engagement rate."
          )}
        </p>

        {/* Important note */}
        <div className="mt-4 rounded-xl border border-purple-600/30 bg-purple-600/10 px-4 py-3 text-[13px] leading-6 text-purple-200">
          {label(
            "إنستغرام لا يدفع مباشرة لكل مشاهدة مثل يوتيوب. الأرباح الرئيسية تأتي من الصفقات المدفوعة مع العلامات التجارية (Sponsored Posts). هذه الأداة تقدّر الدخل من هذا المصدر.",
            "Instagram does not pay per view like YouTube. Main earnings come from sponsored brand deals. This tool estimates income from that source."
          )}
        </div>

        <div className="mt-6 grid gap-5">
          {/* Follower tier */}
          <div>
            <label className="mb-2 block text-[14px] font-semibold text-white/90">
              {label("فئة المتابعين", "Follower Tier")}
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(Object.entries(TIERS) as [Tier, typeof TIERS[Tier]][]).map(([slug, t]) => (
                <button
                  key={slug}
                  type="button"
                  onClick={() => setTier(slug)}
                  className={`rounded-xl border px-3 py-3 text-center text-[12px] transition ${
                    tier === slug
                      ? "border-purple-500 bg-purple-600/10 text-purple-300"
                      : "border-slate-800 bg-[#0F172A] text-slate-400 hover:border-slate-600"
                  }`}
                >
                  <span className="block font-semibold">{isArabic ? t.ar : t.en}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Engagement rate */}
          <div>
            <label className="mb-2 block text-[14px] font-semibold text-white/90">
              {label(`معدل التفاعل: ${engagement}%`, `Engagement Rate: ${engagement}%`)}
            </label>
            <input
              type="range"
              min={1} max={15} step={0.5}
              value={engagement}
              onChange={(e) => setEngagement(Number(e.target.value))}
              className="w-full"
            />
            <div className="mt-1 flex justify-between text-[11px] text-slate-500">
              <span>1%</span>
              <span className="text-slate-400">{label("متوسط 3%", "avg 3%")}</span>
              <span>15%</span>
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
                      ? "border-purple-500 bg-purple-600/10 text-purple-300"
                      : "border-slate-800 bg-[#0F172A] text-slate-400 hover:border-slate-600"
                  }`}
                >
                  <span className="block text-lg">{c.icon}</span>
                  <span className="mt-1 block">{isArabic ? c.ar : c.en}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Posts per month */}
          <div>
            <label className="mb-2 block text-[14px] font-semibold text-white/90">
              {label(`منشورات مدفوعة شهريًا: ${postsPerMonth}`, `Sponsored posts/month: ${postsPerMonth}`)}
            </label>
            <input
              type="range"
              min={1} max={8}
              value={postsPerMonth}
              onChange={(e) => setPostsPerMonth(Number(e.target.value))}
              className="w-full"
            />
            <div className="mt-1 flex justify-between text-[11px] text-slate-500">
              <span>1</span><span>8</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { label: label("لكل منشور", "Per Post"),  range: result.perPost },
            { label: label("شهريًا",    "Monthly"),   range: result.monthly },
            { label: label("سنويًا",    "Yearly"),    range: result.yearly }
          ].map(({ label: lbl, range }) => (
            <div key={lbl} className="rounded-2xl border border-purple-600/20 bg-[#1a1030] p-4 text-center">
              <strong className="block text-xl font-semibold text-purple-300">
                ${formatNumber(range.low, false)} – ${formatNumber(range.high, false)}
              </strong>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">{lbl}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-[12px] leading-6 text-slate-500">
          {label(
            "هذه أرقام تقديرية فقط. الأرباح الفعلية تتفاوت حسب المجال والعلامة التجارية وشروط التفاوض.",
            "Estimates only. Actual earnings vary by niche, brand, and negotiation."
          )}
        </p>
      </div>
    </section>
  );
}
