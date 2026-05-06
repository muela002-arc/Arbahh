import type { Metadata } from "next";
import TikTokCalculator from "@/components/TikTokCalculator";

export const metadata: Metadata = {
  title: "حاسبة أرباح تيك توك 2026 — تقدير دخل صناع المحتوى العرب",
  description:
    "احسب أرباح تيك توك التقديرية من صندوق المبدعين بناء على المشاهدات الشهرية والجمهور. أداة عربية مجانية.",
  alternates: { canonical: "/tiktok" },
  openGraph: {
    title: "حاسبة أرباح تيك توك 2026 — تقدير دخل صناع المحتوى العرب",
    description: "تقدير أرباح تيك توك للمبدعين العرب.",
    images: ["/og.webp"]
  }
};

export default function TikTokPage() {
  return (
    <main className="section">
      <div className="container-page">
        <div className="mb-8 text-right">
          <p className="font-medium text-slate-400">تيك توك</p>
          <h1 className="mt-2 text-4xl font-semibold text-slate-100">حاسبة أرباح تيك توك</h1>
          <p className="mt-3 max-w-lg text-[15px] leading-7 text-slate-400">
            تقدير دخل صندوق المبدعين بناء على المشاهدات الشهرية والجمهور. معدلات تيك توك أقل بكثير من يوتيوب — اقرأ التنبيه في الأداة قبل التخطيط.
          </p>
        </div>
        <TikTokCalculator />
      </div>
    </main>
  );
}
