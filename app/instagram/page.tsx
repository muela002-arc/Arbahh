import type { Metadata } from "next";
import InstagramCalculator from "@/components/InstagramCalculator";

export const metadata: Metadata = {
  title: "حاسبة أرباح إنستغرام | arbahh.com",
  description:
    "احسب أرباح إنستغرام التقديرية من الصفقات المدفوعة بناء على عدد المتابعين ومعدل التفاعل. أداة عربية مجانية.",
  alternates: { canonical: "/instagram" },
  openGraph: {
    title: "حاسبة أرباح إنستغرام | arbahh.com",
    description: "تقدير أرباح إنستغرام للمبدعين العرب من الصفقات المدفوعة.",
    images: ["/og.webp"]
  }
};

export default function InstagramPage() {
  return (
    <main className="section">
      <div className="container-page">
        <div className="mb-8 text-right">
          <p className="font-medium text-slate-400">إنستغرام</p>
          <h1 className="mt-2 text-4xl font-semibold text-slate-100">حاسبة أرباح إنستغرام</h1>
          <p className="mt-3 max-w-lg text-[15px] leading-7 text-slate-400">
            تقدير أرباح الصفقات المدفوعة بناء على عدد المتابعين ومعدل التفاعل ونوع المحتوى. إنستغرام لا يدفع مباشرة لكل مشاهدة — الأرباح الرئيسية من العلامات التجارية.
          </p>
        </div>
        <InstagramCalculator />
      </div>
    </main>
  );
}
