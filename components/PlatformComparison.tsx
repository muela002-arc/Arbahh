"use client";

import { useMemo, useState } from "react";
import { formatRange } from "@/lib/formatters";
import { platformRpmMultipliers, type PlatformSlug } from "@/lib/rpmData";
import { useLanguage } from "./LanguageContext";

const platformCopy: Record<"ar" | "en", { slug: PlatformSlug; name: string; note: string }[]> = {
  ar: [
    { slug: "youtube", name: "يوتيوب", note: "الأفضل للمحتوى الطويل والبحث" },
    { slug: "tiktok", name: "تيك توك", note: "انتشار سريع لكن RPM أقل غالبا" },
    { slug: "instagram", name: "انستغرام", note: "قوي للرعايات والمنتجات" },
    { slug: "facebook", name: "فيسبوك", note: "مناسب للفيديوهات العامة والمجتمعات" }
  ],
  en: [
    { slug: "youtube", name: "YouTube", note: "Best for long-form and search-driven content" },
    { slug: "tiktok", name: "TikTok", note: "Fast reach, but usually lower RPM" },
    { slug: "instagram", name: "Instagram", note: "Strong for sponsorships and products" },
    { slug: "facebook", name: "Facebook", note: "Useful for broad videos and communities" }
  ]
};

const labels = {
  ar: {
    views: "المشاهدات اليومية للمقارنة",
    platform: "المنصة",
    daily: "تقدير يومي",
    monthly: "تقدير شهري",
    note: "ملاحظة"
  },
  en: {
    views: "Daily views for comparison",
    platform: "Platform",
    daily: "Daily estimate",
    monthly: "Monthly estimate",
    note: "Note"
  }
};

export default function PlatformComparison() {
  const { lang } = useLanguage();
  const [views, setViews] = useState(100000);
  const baseRpm = 2.4;
  const copy = labels[lang];

  const rows = useMemo(
    () =>
      platformCopy[lang].map((platform) => {
        const rpm = baseRpm * platformRpmMultipliers[platform.slug];
        const low = (views / 1000) * rpm * 0.5;
        const high = (views / 1000) * rpm;
        return { ...platform, low, high, monthlyLow: low * 30, monthlyHigh: high * 30 };
      }),
    [lang, views]
  );

  return (
    <section className="card p-5" dir={lang === "ar" ? "rtl" : "ltr"}>
      <label className="block text-sm font-semibold text-slate-100">
        {copy.views}
        <input className="mt-2" inputMode="numeric" min={100} onChange={(event) => setViews(Number(event.target.value))} type="number" value={views} />
      </label>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] table-fixed border-collapse" dir="ltr">
          <thead className="bg-slate-950 text-sm text-slate-300">
            <tr>
              <th className={`p-4 ${lang === "ar" ? "text-right" : "text-left"}`}>{copy.platform}</th>
              <th className={`p-4 ${lang === "ar" ? "text-right" : "text-left"}`}>{copy.daily}</th>
              <th className={`p-4 ${lang === "ar" ? "text-right" : "text-left"}`}>{copy.monthly}</th>
              <th className={`p-4 ${lang === "ar" ? "text-right" : "text-left"}`}>{copy.note}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className="border-t border-slate-800" key={row.slug}>
                <td className={`p-4 font-semibold text-slate-100 ${lang === "ar" ? "text-right" : "text-left"}`}>{row.name}</td>
                <td className={`p-4 text-slate-300 ${lang === "ar" ? "text-right" : "text-left"}`}>{formatRange(row.low, row.high, "USD", lang === "ar")}</td>
                <td className={`p-4 text-slate-300 ${lang === "ar" ? "text-right" : "text-left"}`}>{formatRange(row.monthlyLow, row.monthlyHigh, "USD", lang === "ar")}</td>
                <td className={`p-4 text-slate-300 ${lang === "ar" ? "text-right" : "text-left"}`}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
