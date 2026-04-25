import type { Metadata } from "next";
import NicheCard from "@/components/NicheCard";
import { niches } from "@/lib/nicheData";

export const metadata: Metadata = {
  title: "معدل RPM لكل مجال يوتيوب عربي",
  description:
    "دليل RPM يوتيوب عربي حسب المجال: تقنية، مال وأعمال، تعليم، طبخ، ألعاب، ترفيه، رياضة، صحة وجمال، سفر، أطفال، دين، وكوميديا.",
  alternates: { canonical: "/مجالات", languages: { ar: "/مجالات", en: "/en" } },
  openGraph: {
    title: "معدل RPM لكل مجال يوتيوب عربي",
    description: "اعرف أفضل مجالات أرباح يوتيوب في المحتوى العربي.",
    images: ["/og.webp"]
  }
};

export default function NichesPage() {
  return (
    <main className="section">
      <div className="container-page">
        <p className="font-bold text-red-600">دليل المجالات</p>
        <h1 className="mt-2 text-4xl font-black">معدل RPM لكل مجال يوتيوب عربي</h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-600 dark:text-slate-300">
          اختر المجال الأقرب للقناة لتعرف نطاق RPM، أفضل الدول، تقديرات الأرباح، ونصائح نمو عملية.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {niches.map((niche) => (
            <NicheCard key={niche.slug} niche={niche} />
          ))}
        </div>
      </div>
    </main>
  );
}
