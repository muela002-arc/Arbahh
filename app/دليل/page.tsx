import type { Metadata } from "next";
import FAQAccordion, { type FAQItem } from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "كيف تربح من يوتيوب — الدليل الشامل 2025",
  description:
    "دليل شامل يشرح كيف تربح من يوتيوب في 2025: شروط التحقيق، طرق الربح، نصائح الخوارزمية، الأخطاء الشائعة، وأسئلة شائعة.",
  alternates: { canonical: "/دليل", languages: { ar: "/دليل", en: "/en" } },
  openGraph: {
    title: "كيف تربح من يوتيوب — الدليل الشامل 2025",
    description: "تعلم ربح يوتيوب بخطوات عملية بعيدا عن الوعود المبالغ فيها.",
    images: ["/og.webp"]
  }
};

const sections = [
  ["شروط التحقيق", "حتى تبدأ الربح من يوتيوب تحتاج إلى بناء قناة ملتزمة بسياسات المنصة، وتحقيق شروط برنامج شركاء يوتيوب مثل عدد المشتركين وساعات المشاهدة أو مسارات الفيديوهات القصيرة. الأهم ليس الوصول للشرط فقط، بل بناء محتوى يمكنه الاستمرار بعد التفعيل."],
  ["طرق الربح", "ربح يوتيوب لا يأتي من الإعلانات فقط. هناك الرعايات، التسويق بالعمولة، المنتجات الرقمية، العضويات، والاستشارات. أفضل القنوات لا تعتمد على مصدر واحد، بل تبني ثقة تسمح بتنويع الدخل."],
  ["نصائح الخوارزمية", "الخوارزمية تكافئ رضا المشاهد. ركز على عنوان واضح، صورة مصغرة صادقة، افتتاحية مباشرة، ومحتوى يحقق الوعد. راقب الاحتفاظ بالمشاهدين ونسبة النقر أكثر من عدد الفيديوهات فقط."],
  ["الأخطاء الشائعة", "أكبر الأخطاء هي تقليد قنوات ضخمة دون فهم الجمهور، تغيير المجال كل أسبوع، استخدام عناوين مضللة، وإهمال جودة الصوت. النجاح يبدأ من وضوح الفكرة والجمهور."],
  ["أسئلة شائعة", "السؤال الأهم ليس كم أرباح يوتيوب فقط، بل كيف تبني قناة تستحق المشاهدة والمتابعة. استخدم الحاسبة كأداة تخطيط، لا كوعد مالي مضمون."]
];

const faqs: FAQItem[] = [
  { question: "هل يمكن الربح من يوتيوب بدون مليون مشاهدة؟", answer: "نعم، القنوات المتخصصة قد تحقق دخلا جيدا بمشاهدات أقل إذا كان المجال عالي القيمة والجمهور واضحا." },
  { question: "كم يستغرق تفعيل الربح؟", answer: "يعتمد على جودة المحتوى، تكرار النشر، وقدرة القناة على جذب مشاهدين حقيقيين باستمرار." },
  { question: "هل RPM العربي أقل من العالمي؟", answer: "غالبا نعم، لكنه يتحسن في دول مثل الإمارات والسعودية والكويت ومع المجالات التجارية والتعليمية." }
];

export default function GuidePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "كيف تربح من يوتيوب — الدليل الشامل 2025",
    inLanguage: "ar",
    author: { "@type": "Organization", name: "أرباح يوتيوب" }
  };
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "كيف تربح من يوتيوب",
    step: sections.map(([name, text]) => ({ "@type": "HowToStep", name, text }))
  };

  return (
    <main className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <div className="container-page grid gap-10 lg:grid-cols-[270px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 card p-5">
            <p className="text-sm font-black text-red-600">وقت القراءة: ٧ دقائق</p>
            <nav className="mt-4 grid gap-2 text-sm font-bold">
              {sections.map(([title]) => (
                <a href={`#${title}`} key={title}>{title}</a>
              ))}
            </nav>
          </div>
        </aside>
        <article>
          <h1 className="text-4xl font-black">كيف تربح من يوتيوب — الدليل الشامل 2025</h1>
          <p className="mt-5 text-lg leading-9 text-slate-600 dark:text-slate-300">
            إذا كنت تسأل كيف تربح من يوتيوب، فالإجابة العملية تبدأ من فهم الجمهور، اختيار المجال، وتحويل المشاهدات إلى قيمة حقيقية.
          </p>
          <div className="mt-10 space-y-10">
            {sections.map(([title, body]) => (
              <section id={title} key={title}>
                <h2 className="text-2xl font-black">{title}</h2>
                <p className="mt-3 leading-9 text-slate-600 dark:text-slate-300">{body}</p>
              </section>
            ))}
          </div>
          <section className="mt-12">
            <h2 className="mb-5 text-2xl font-black">أسئلة شائعة</h2>
            <FAQAccordion items={faqs} />
          </section>
        </article>
      </div>
    </main>
  );
}
