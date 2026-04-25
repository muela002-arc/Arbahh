import type { Metadata } from "next";
import Link from "next/link";
import EarningsCalculator from "@/components/EarningsCalculator";
import FAQAccordion, { type FAQItem } from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "حاسبة أرباح يوتيوب عربية مجانية",
  description:
    "احسب أرباح يوتيوب التقديرية حسب المشاهدات والمجال والدولة. أداة عربية مجانية تعرض نطاقات RPM، مستوى الثقة، وطريقة الحساب بدون تسجيل.",
  alternates: {
    canonical: "/",
    languages: { ar: "/", en: "/en" }
  },
  openGraph: {
    title: "حاسبة أرباح يوتيوب",
    description: "اعرف نطاق أرباح أي قناة يوتيوب بشكل تقريبي مع توضيح RPM والافتراضات.",
    images: ["/og.webp"]
  },
  twitter: {
    card: "summary_large_image",
    title: "حاسبة أرباح يوتيوب",
    description: "أداة عربية مجانية لحساب أرباح يوتيوب التقديرية."
  }
};

const faqs: FAQItem[] = [
  {
    question: "هل تعطي الحاسبة رقما دقيقا لأرباح القناة؟",
    answer: "لا. الأداة تعرض نطاقا تقريبيا مبنيا على RPM عام حسب المجال والدولة. الأرباح الفعلية تختلف حسب الجمهور والإعلانات والموسم."
  },
  {
    question: "هل أحتاج إلى إدخال اسم القناة؟",
    answer: "لا. اسم القناة اختياري للتخصيص فقط. لا يوجد بحث مباشر عن القناة في هذه النسخة ولا نحفظ الاسم."
  },
  {
    question: "ما معنى RPM؟",
    answer: "RPM هو العائد التقريبي لكل ألف مشاهدة. نستخدمه مع المشاهدات المتوقعة لإظهار نطاق أرباح يومي وشهري وسنوي."
  },
  {
    question: "هل أرباح الدول العربية متشابهة؟",
    answer: "لا. يختلف RPM حسب قوة سوق الإعلانات. عادة تكون دول الخليج أعلى من بعض الأسواق الأخرى، لكن النتيجة تبقى تقديرية."
  },
  {
    question: "هل الموقع تابع ليوتيوب أو Google؟",
    answer: "لا. أرباح يوتيوب موقع مستقل وغير تابع ليوتيوب أو Google أو Alphabet."
  }
];

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "أرباح يوتيوب",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: "https://arbahyoutube.com",
    description: metadata.description
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative overflow-hidden bg-brand-dark text-white">
        <div className="container-page grid gap-8 py-10 text-center sm:py-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-10 lg:text-right">
          <div className="mx-auto max-w-xl animate-fadeIn lg:order-2 lg:mx-0">
            <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-red-100">تقدير أرباح أي قناة يوتيوب</p>
            <h1 className="text-4xl font-semibold leading-[1.1] text-slate-100 sm:text-5xl">حاسبة أرباح يوتيوب</h1>
            <p className="mx-auto mt-5 max-w-[420px] text-[15px] font-normal leading-[1.8] text-slate-300 lg:mx-0">
              احسب نطاق الأرباح التقديرية بناء على المشاهدات، المجال، والدولة. النتائج ليست دخلا مضمونا، لكنها تساعدك على فهم الصورة قبل التخطيط للمحتوى.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a className="focus-ring rounded-xl bg-red-600 px-6 py-4 text-center font-semibold text-white hover:bg-red-700" href="#calculator">
                احسب الأرباح
              </a>
              <Link className="focus-ring rounded-xl border border-white/20 px-6 py-4 text-center font-medium text-slate-100 hover:border-red-500" href="/دليل">
                تعلم كيف تربح
              </Link>
            </div>
          </div>
          <div className="lg:order-1">
            <EarningsCalculator />
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-950 py-5">
        <div className="container-page grid gap-3 text-center text-sm text-slate-300 md:grid-cols-3">
          <span>لا تسجيل دخول</span>
          <span>نطاقات تقديرية لا وعود دخل</span>
          <span>آخر تحديث: أبريل 2026</span>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-5 md:grid-cols-3">
          {[
            ["تقدير تقريبي واضح", "نعرض نطاقا منخفضا ومرتفعا بدلا من رقم واحد قد يكون مضللا."],
            ["RPM حسب المجال والدولة", "تختلف قيمة ألف مشاهدة حسب نوع المحتوى والجمهور، لذلك نستخدم معاملات مبسطة وشفافة."],
            ["خصوصية أبسط", "اسم القناة اختياري، ولا نستخدمه للبحث أو التخزين في هذه النسخة."]
          ].map(([title, body]) => (
            <div className="card p-6" key={title}>
              <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
              <p className="mt-3 leading-8 text-slate-300">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-slate-950">
        <div className="container-page grid gap-5 md:grid-cols-3">
          {[
            ["مصادر البيانات", "تعتمد الأداة على افتراضات عامة لمعدلات RPM المنشورة والمتداولة في صناعة الإعلانات، وليست على بيانات خاصة من يوتيوب."],
            ["منطق RPM", "نبدأ من RPM أساسي لكل مجال، ثم نطبق معامل الدولة أو الجمهور، وبعدها نعرض نطاقا بدلا من رقم ثابت."],
            ["ملاحظة استقلالية", "هذا الموقع غير تابع ليوتيوب أو Google، ولا يستخدم واجهة YouTube API في النسخة الحالية."]
          ].map(([title, body]) => (
            <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-6" key={title}>
              <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
              <p className="mt-3 text-sm leading-8 text-slate-300">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-slate-100 dark:bg-slate-950">
        <div className="container-page grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-medium text-red-600">أسئلة شائعة</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-100">كل ما تحتاج معرفته عن أرباح يوتيوب</h2>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>
    </main>
  );
}
