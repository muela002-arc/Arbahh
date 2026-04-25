import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "شروط الخدمة",
  description: "شروط استخدام موقع أرباح يوتيوب وحاسبة أرباح يوتيوب التقديرية.",
  alternates: { canonical: "/terms" }
};

export default function TermsPage() {
  return (
    <main className="section">
      <article className="container-page max-w-3xl leading-8 text-slate-300">
        <h1 className="text-4xl font-semibold text-slate-100">شروط الخدمة</h1>
        <p className="mt-6">باستخدام موقع أرباح يوتيوب، فإنك توافق على أن النتائج المعروضة تقديرية وتعتمد على افتراضات عامة وليست بيانات مالية مؤكدة.</p>
        <h2 className="mt-8 text-2xl font-semibold text-slate-100">طبيعة الخدمة</h2>
        <p className="mt-3">توفر الحاسبة تقديرات مبنية على المشاهدات، المجال، الدولة، ونطاقات RPM تقريبية. لا نقدم نصائح مالية أو قانونية أو ضريبية.</p>
        <h2 className="mt-8 text-2xl font-semibold text-slate-100">الاستخدام المقبول</h2>
        <p className="mt-3">يجب استخدام الموقع لأغراض تعليمية وتخطيطية فقط. لا يجوز محاولة تعطيل الموقع أو إساءة استخدام نتائجه للإيحاء بدخل مضمون.</p>
        <h2 className="mt-8 text-2xl font-semibold text-slate-100">الاستقلالية</h2>
        <p className="mt-3">أرباح يوتيوب موقع مستقل وغير تابع لـ YouTube أو Google أو Alphabet.</p>
        <h2 className="mt-8 text-2xl font-semibold text-slate-100">التواصل</h2>
        <p className="mt-3">لأي طلب متعلق بالخدمة أو الخصوصية، راسلنا عبر: privacy@arbahyoutube.com.</p>
      </article>
    </main>
  );
}
