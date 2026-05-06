"use client";

import dynamic from "next/dynamic";
import { translations } from "@/lib/i18n";
import { useLanguage } from "./LanguageContext";

const EarningsCalculator = dynamic(() => import("@/components/EarningsCalculator"), {
  ssr: false,
  loading: () => <div className="h-[480px] animate-pulse rounded-2xl bg-slate-800" />
});

const tips = {
  ar: [
    "استهدف كلمات بحثية ذات نية واضحة مثل مراجعة، سعر، أفضل، وطريقة.",
    "ارفع مدة المشاهدة عبر افتتاحية مباشرة ووعد واضح في أول عشر ثوان.",
    "اختر مجالا محددا حتى تفهم الخوارزمية جمهور القناة بسرعة.",
    "أضف مصادر دخل مساندة مثل الرعايات والمنتجات الرقمية عند نمو الثقة."
  ],
  en: [
    "Target search terms with clear intent such as review, price, best, and how to.",
    "Improve watch time with a direct opening and a clear promise in the first ten seconds.",
    "Pick a focused niche so YouTube can understand the channel audience faster.",
    "Add supporting revenue sources like sponsorships and digital products as trust grows."
  ]
};

const comparisonRows = {
  ar: [
    ["السياق العربي", "موجود"],
    ["اختيار الدولة", "موجود"],
    ["نصائح حسب المجال", "موجود"],
    ["رقم مضمون", "غير موجود"]
  ],
  en: [
    ["Arabic context", "Available"],
    ["Country selection", "Available"],
    ["Niche-based tips", "Available"],
    ["Guaranteed number", "Not available"]
  ]
};

export default function CalculatorPageContent() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const isArabic = lang === "ar";

  return (
    <div className="container-page grid gap-8 lg:grid-cols-[1fr_360px]" dir={t.dir}>
      <div>
        <p className="font-medium text-red-600">{t.heroTag}</p>
        <h1 className="mt-2 text-5xl font-semibold leading-[1.1] text-slate-100">{t.heroTitle}</h1>
        <p className="mt-4 max-w-[420px] text-[15px] leading-[1.8] text-slate-300">{t.heroSubtitle}</p>
        <div className="mt-8">
          <EarningsCalculator full />
        </div>
      </div>
      <aside>
        <div className="rounded-xl border border-slate-800 bg-[#0F172A] p-5">
          <h2 className="mb-4 text-base font-semibold text-slate-100">{t.tipsTitle}</h2>
          <ul className="space-y-3">
            {tips[lang].map((tip) => (
              <li
                className={`relative text-sm leading-[1.8] text-slate-400 ${
                  isArabic ? "pr-5 before:right-0" : "pl-5 before:left-0"
                } before:absolute before:top-0 before:text-red-600 before:content-['←']`}
                key={tip}
              >
                {tip}
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-slate-800 pt-6">
            <h3 className="mb-4 text-base font-semibold text-slate-100">{t.comparisonTitle}</h3>
            <table className="w-full border-collapse">
              <tbody>
                {comparisonRows[lang].map(([feature, status]) => {
                  const missing = status.includes("غير") || status.includes("Not");
                  return (
                    <tr className="border-b border-slate-800 last:border-0" key={feature}>
                      <td className={`py-[10px] text-sm text-slate-300 ${isArabic ? "text-right" : "text-left"}`}>{feature}</td>
                      <td className={`py-[10px] ${isArabic ? "text-left" : "text-right"}`}>
                        <span className={`rounded-full px-[10px] py-[3px] text-xs font-semibold ${missing ? "bg-slate-500/10 text-slate-500" : "bg-red-600/10 text-red-400"}`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </aside>
    </div>
  );
}
