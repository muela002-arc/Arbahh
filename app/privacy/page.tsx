import type { Metadata } from "next";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية لموقع أرباح يوتيوب، وتشمل ملفات الارتباط، Google Analytics، Google AdSense، وحقوق GDPR و CCPA.",
  alternates: { canonical: "/privacy" }
};

export default function PrivacyPage() {
  return (
    <main className="section">
      <article className="container-page max-w-3xl leading-8 text-slate-300">
        <h1 className="text-4xl font-semibold text-slate-100">سياسة الخصوصية</h1>
        <p className="mt-3 text-sm text-slate-500">تاريخ السريان: 28 أبريل 2026 · آخر تحديث: 28 أبريل 2026</p>

        <p className="mt-6">
          يهدف موقع أرباح يوتيوب (arbahh.com) إلى تقديم حاسبات ومحتوى تعليمي لصناع المحتوى بأقل قدر ممكن من البيانات الشخصية. لا تحتاج إلى إنشاء حساب لاستخدام الحاسبة، ولا نحفظ اسم القناة الذي تدخله. عند استخدام البحث التلقائي عن قناة يوتيوب، يتم إرسال الاستعلام إلى خادمنا فقط حتى نطلب بيانات عامة من YouTube Data API مثل اسم القناة، الصورة، وإحصاءات الفيديوهات العامة.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">البيانات التي نعالجها</h2>
        <p className="mt-3">
          نعالج البيانات التقنية التالية حصرًا: عنوان IP التقريبي، نوع المتصفح، نوع الجهاز، الصفحات التي تمت زيارتها، وقت الزيارة، وأحداث استخدام عامة مثل الضغط على زر الحساب. <strong className="text-slate-200">لا</strong> نطلب بيانات مالية، <strong className="text-slate-200">لا</strong> نطلب تسجيل دخول، <strong className="text-slate-200">لا</strong> نخزن اسم القناة على خوادمنا، <strong className="text-slate-200">لا</strong> نطلب كلمة مرور أو معلومات دفع.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">Google Analytics</h2>
        <p className="mt-3">
          نستخدم Google Analytics <strong className="text-slate-200">فقط بعد موافقتك الصريحة</strong> على ملفات الارتباط من خلال لافتة الموافقة. لا يتم تحميل نص Google Analytics ولا إرسال أي طلبات إليه قبل منح الموافقة. نفعّل إخفاء عنوان IP ونستخدم البيانات بصورة مجمعة لتحسين تجربة المستخدم. يمكنك منع التحليلات برفض ملفات الارتباط الاختيارية.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">Google AdSense والإعلانات</h2>
        <p className="mt-3">
          قد نستخدم Google AdSense لعرض إعلانات على الموقع. <strong className="text-slate-200">لا يتم تحميل أي نصوص إعلانية اختيارية قبل موافقتك</strong> على ملفات الارتباط حيثما يكون ذلك مطلوبًا قانونيًا. قد تستخدم Google وشركاؤها ملفات ارتباط لعرض إعلانات مخصصة وقياس أدائها.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">ملفات الارتباط</h2>
        <p className="mt-3">
          نستخدم ملفًا محليًا (localStorage) لتذكر موافقتك على ملفات الارتباط تحت المفتاح <code className="rounded bg-slate-800 px-1 text-sm">arbah_cookie_consent</code>. لا تُرسل هذه القيمة إلى أي خادم. بعد الموافقة فقط، قد تستخدم خدمات Google ملفات ارتباط للتحليلات والإعلانات. تستطيع حذف هذه البيانات من إعدادات المتصفح في أي وقت.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">مشاركة البيانات</h2>
        <p className="mt-3">
          <strong className="text-slate-200">لا نبيع بياناتك الشخصية</strong> ولن نبيعها في المستقبل. قد تتم معالجة بعض البيانات بواسطة مزودي خدمات مثل Google Analytics و Google AdSense وVercel (مزود الاستضافة) لتشغيل الموقع وقياس الأداء وحمايته. تخضع هذه المعالجة لسياسات كل مزود.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">حقوق GDPR</h2>
        <p className="mt-3">
          إذا كنت مقيمًا في الاتحاد الأوروبي أو المملكة المتحدة، يحق لك: الوصول إلى بياناتك، تصحيحها، حذفها، الاعتراض على معالجتها، وطلب تقييد استخدامها. تواصل معنا عبر البريد الإلكتروني أدناه لتقديم أي طلب.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">حقوق CCPA — عدم بيع بياناتي الشخصية</h2>
        <p className="mt-3">
          لسكان ولاية كاليفورنيا: لا نبيع بياناتك الشخصية بأي معنى من معاني قانون CCPA. لا نتاجر في المعلومات الشخصية مقابل مكافأة مالية. يحق لك طلب معرفة البيانات التي نجمعها أو طلب حذفها. أرسل طلبك عبر البريد الإلكتروني أدناه مع ذكر "CCPA Request" في عنوان الرسالة.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">التعديلات على هذه السياسة</h2>
        <p className="mt-3">قد نحدّث هذه السياسة من وقت لآخر. سيُحدَّث تاريخ "آخر تحديث" في أعلى الصفحة عند أي تغيير جوهري.</p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">طلبات الخصوصية</h2>
        <p className="mt-3">
          لأي طلب خصوصية أو سؤال متعلق بالبيانات، راسلنا عبر:{" "}
          <ObfuscatedEmail user="privacy" domain="arbahh.com" className="text-red-400 hover:underline" />
          . سنحاول الرد خلال فترة معقولة، وقد نطلب معلومات محدودة للتحقق من الطلب.
        </p>
      </article>
    </main>
  );
}
