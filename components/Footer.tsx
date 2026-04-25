import Link from "next/link";

const links = [
  ["حاسبة أرباح يوتيوب", "/حاسبة"],
  ["RPM يوتيوب عربي", "/مجالات"],
  ["كيف تربح من يوتيوب", "/دليل"],
  ["مقارنة المنصات", "/مقارنة"],
  ["شروط الخدمة", "/terms"],
  ["سياسة الخصوصية", "/privacy"],
  ["إخلاء المسؤولية", "/disclaimer"]
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#060D1A] py-10">
      <div className="container-page grid gap-8 md:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="mb-3 text-sm font-semibold text-slate-100">أرباح يوتيوب</h2>
          <p className="max-w-md text-[13px] leading-7 text-slate-500">
            أداة عربية مجانية لحساب الأرباح التقديرية لأي قناة يوتيوب. لا نطلب تسجيل دخول ولا نحفظ بيانات القنوات التي تدخلها.
          </p>
          <p className="mt-3 text-[13px] leading-7 text-slate-600">للاستفسارات وطلبات الخصوصية: privacy@arbahyoutube.com</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {links.map(([label, href]) => (
            <Link className="block text-[13px] leading-[2.2] text-slate-500 no-underline hover:text-slate-300" href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="container-page mt-6 border-t border-slate-800 pt-4 text-xs leading-6 text-slate-600">
        هذه أرقام تقديرية وليست ضمانا للدخل. أرباح يوتيوب الفعلية تتأثر بالجمهور، مدة المشاهدة، نوع الإعلانات، الموسم، وسياسات المنصة.
        أرباح يوتيوب ليس تابعا لـ YouTube أو Google.
      </div>
    </footer>
  );
}
