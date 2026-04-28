import type { Metadata } from "next";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";

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
        <p className="mt-3 text-sm text-slate-500">تاريخ السريان: 28 أبريل 2026 · آخر تحديث: 28 أبريل 2026</p>

        <p className="mt-6">باستخدام موقع أرباح يوتيوب (arbahh.com)، فإنك توافق على أن النتائج المعروضة تقديرية وتعتمد على افتراضات عامة وليست بيانات مالية مؤكدة.</p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">طبيعة الخدمة</h2>
        <p className="mt-3">توفر الحاسبة تقديرات مبنية على المشاهدات، المجال، الدولة، ونطاقات RPM تقريبية. لا نقدم نصائح مالية أو قانونية أو ضريبية. الأرقام المعروضة هي تقديرات للتخطيط فقط، ولا يجوز الاستناد إليها كأساس لقرارات مالية.</p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">الاستخدام المقبول</h2>
        <p className="mt-3">يجب استخدام الموقع لأغراض تعليمية وتخطيطية فقط. لا يجوز محاولة تعطيل الموقع أو إساءة استخدام نتائجه للإيحاء بدخل مضمون أو الإضرار بالآخرين.</p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">الاستقلالية</h2>
        <p className="mt-3">أرباح يوتيوب موقع مستقل وغير تابع لـ YouTube أو Google أو Alphabet أو TikTok أو Instagram أو Meta.</p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">إخلاء المسؤولية وتحديد الالتزام</h2>
        <p className="mt-3">
          الموقع غير مسؤول عن أي قرارات مالية أو تجارية تُتخذ بناءً على النتائج المعروضة. الأرباح الفعلية قد تختلف اختلافًا جوهريًا عن التقديرات بسبب عوامل خارجة عن سيطرتنا تشمل سياسات المنصة، الموسمية، وجمهور القناة. الخدمة مقدمة "كما هي" دون أي ضمان صريح أو ضمني بالدقة أو الاستمرارية.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">إخلاء الضمانات</h2>
        <p className="mt-3">
          نقدم الخدمة "كما هي" و"كما هي متاحة" دون أي ضمانات من أي نوع، صريحة أو ضمنية. لا نضمن دقة النتائج أو توافر الموقع أو خلوه من الأخطاء. استخدامك للموقع يتم على مسؤوليتك الخاصة.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">القانون الحاكم وحل النزاعات</h2>
        <p className="mt-3">
          تخضع هذه الشروط للقوانين المعمول بها في مكان تسجيل الموقع. في حال نشوء أي نزاع، يُرجى التواصل معنا أولاً عبر البريد الإلكتروني لحل المسألة وديًا. إذا تعذّر الحل الودي، تُحال النزاعات إلى الجهة القضائية المختصة.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">التعديلات</h2>
        <p className="mt-3">نحتفظ بالحق في تعديل هذه الشروط في أي وقت. الاستمرار في استخدام الموقع بعد نشر التعديلات يعني موافقتك عليها. اللغة العربية هي اللغة المعتمدة في حال التعارض مع أي ترجمة.</p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">التواصل</h2>
        <p className="mt-3">
          لأي طلب متعلق بالخدمة أو الخصوصية، راسلنا عبر:{" "}
          <ObfuscatedEmail user="privacy" domain="arbahh.com" className="text-red-400 hover:underline" />.
        </p>
      </article>
    </main>
  );
}
