import type { Metadata } from "next";
import PlatformComparison from "@/components/PlatformComparison";

export const metadata: Metadata = {
  title: "أرباح يوتيوب مقارنة بالمنصات الأخرى",
  description:
    "قارن أرباح يوتيوب مع تيك توك وانستغرام وفيسبوك حسب عدد المشاهدات اليومية، واعرف المنصة الأنسب حسب مجال القناة.",
  alternates: { canonical: "/مقارنة", languages: { ar: "/مقارنة", en: "/en" } },
  openGraph: {
    title: "أرباح يوتيوب مقارنة بالمنصات الأخرى",
    description: "مقارنة تفاعلية بين أرباح المنصات لصناع المحتوى العرب.",
    images: ["/og.webp"]
  }
};

export default function ComparisonPage() {
  return (
    <main className="section">
      <div className="container-page">
        <p className="font-bold text-red-600">مقارنة المنصات</p>
        <h1 className="mt-2 text-4xl font-black">أرباح يوتيوب مقارنة بالمنصات الأخرى</h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-600 dark:text-slate-300">
          أدخل المشاهدات اليومية وشاهد نطاقا تقديريا لأرباح يوتيوب، تيك توك، انستغرام، وفيسبوك جنبا إلى جنب.
        </p>
        <div className="mt-8">
          <PlatformComparison />
        </div>
        <section className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="card p-5">
            <h2 className="text-xl font-black">أفضل خيار للتعليم والتقنية</h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">يوتيوب غالبا أفضل بسبب البحث، الفيديو الطويل، وارتفاع RPM في المجالات عالية النية.</p>
          </div>
          <div className="card p-5">
            <h2 className="text-xl font-black">أفضل خيار للانتشار السريع</h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">تيك توك وانستغرام مناسبان للوصول السريع، لكن الدخل الإعلاني وحده لا يكون دائما الأعلى.</p>
          </div>
          <div className="card p-5">
            <h2 className="text-xl font-black">أفضل استراتيجية</h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">استخدم المقاطع القصيرة لجذب الجمهور، ثم حوله إلى يوتيوب وقائمة بريدية أو منتج واضح.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
