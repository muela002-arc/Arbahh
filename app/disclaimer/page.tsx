import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "إخلاء المسؤولية",
  description: "إخلاء مسؤولية حاسبة أرباح يوتيوب: النتائج تقديرية وليست نصيحة مالية.",
  alternates: { canonical: "/disclaimer" }
};

export default function DisclaimerPage() {
  return (
    <main className="section">
      <article className="container-page max-w-3xl leading-8 text-slate-300">
        <h1 className="text-4xl font-semibold text-slate-100">إخلاء المسؤولية</h1>
        <p className="mt-6">
          جميع الأرقام في أرباح يوتيوب تقديرية فقط. الأرباح الفعلية قد تختلف بشكل كبير بسبب الجمهور، مدة المشاهدة، نوع الإعلانات، الموسم، بلد المشاهدين، وسياسات يوتيوب.
        </p>
        <h2 className="mt-8 text-2xl font-semibold text-slate-100">ليست نصيحة مالية</h2>
        <p className="mt-3">لا تعتبر نتائج الحاسبة نصيحة مالية أو ضمانا للدخل أو وعدا بتحقيق أرباح.</p>
        <h2 className="mt-8 text-2xl font-semibold text-slate-100">عدم الانتماء</h2>
        <p className="mt-3">هذا الموقع غير تابع لـ YouTube أو Google أو Alphabet. الأسماء والعلامات تخص أصحابها.</p>
        <h2 className="mt-8 text-2xl font-semibold text-slate-100">دقة البيانات</h2>
        <p className="mt-3">نحاول جعل الافتراضات واضحة ومفيدة، لكننا لا نضمن اكتمال أو دقة النتائج لأي قناة محددة.</p>
      </article>
    </main>
  );
}
