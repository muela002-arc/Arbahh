import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion, { type FAQItem } from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "حاسبة أرباح يوتيوب عربية مجانية",
  description:
    "احسب أرباح يوتيوب وتيك توك وإنستغرام التقديرية. أداة عربية مجانية لصناع المحتوى تعرض نطاقات RPM حسب المجال والدولة.",
  alternates: {
    canonical: "/",
    languages: { ar: "/", en: "/en" }
  },
  openGraph: {
    title: "أرباح يوتيوب — احسب أرباحك على أي منصة",
    description: "اعرف نطاق أرباح قناتك على يوتيوب أو تيك توك أو إنستغرام مع أداة عربية مجانية.",
    images: ["/og.webp"]
  },
  twitter: {
    card: "summary_large_image",
    title: "أرباح يوتيوب",
    description: "أداة عربية مجانية لحساب أرباح المنصات التقديرية."
  }
};

const faqs: FAQItem[] = [
  {
    question: "هل تعطي الحاسبة رقما دقيقا لأرباح القناة؟",
    answer: "لا. الأداة تعرض نطاقا تقريبيا مبنيا على RPM عام حسب المجال والدولة. الأرباح الفعلية تختلف حسب الجمهور والإعلانات والموسم."
  },
  {
    question: "ما الفرق بين أرباح يوتيوب وتيك توك وإنستغرام؟",
    answer: "يوتيوب يعتمد على AdSense وRPM لكل ألف مشاهدة. تيك توك يدفع من صندوق المبدعين بمعدلات أقل بكثير. إنستغرام يعتمد أساسا على الصفقات المدفوعة مع العلامات التجارية وليس على دفع مباشر لكل مشاهدة."
  },
  {
    question: "هل أحتاج إلى إدخال اسم القناة؟",
    answer: "لا. اسم القناة اختياري للتخصيص فقط. يمكنك إدخال المشاهدات يدويا مباشرة."
  },
  {
    question: "هل أرباح الدول العربية متشابهة؟",
    answer: "لا. يختلف RPM حسب قوة سوق الإعلانات. عادة تكون دول الخليج أعلى من بعض الأسواق الأخرى، لكن النتيجة تبقى تقديرية."
  },
  {
    question: "هل الموقع تابع ليوتيوب أو Google؟",
    answer: "لا. أرباح يوتيوب موقع مستقل وغير تابع ليوتيوب أو Google أو Alphabet أو TikTok أو Meta."
  }
];

const platforms = [
  {
    href: "/youtube",
    name: "يوتيوب",
    nameEn: "YouTube",
    icon: "▶",
    color: "bg-red-600",
    border: "border-red-600/30 hover:border-red-600",
    desc: "احسب أرباحك بناء على المشاهدات والمجال والدولة مع نطاقات RPM عربية.",
    badge: "AdSense · RPM"
  },
  {
    href: "/tiktok",
    name: "تيك توك",
    nameEn: "TikTok",
    icon: "♪",
    color: "bg-slate-700",
    border: "border-slate-700/50 hover:border-slate-400",
    desc: "تقدير أرباح صندوق المبدعين على تيك توك حسب المشاهدات والجمهور.",
    badge: "Creator Fund"
  },
  {
    href: "/instagram",
    name: "إنستغرام",
    nameEn: "Instagram",
    icon: "◈",
    color: "bg-purple-600",
    border: "border-purple-600/30 hover:border-purple-500",
    desc: "تقدير أرباح الصفقات المدفوعة على إنستغرام حسب عدد المتابعين والتفاعل.",
    badge: "Brand Deals · Reels"
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
    url: "https://arbahh.com",
    description: metadata.description
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <div className="container-page py-14 text-center sm:py-20">
          <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-red-100">
            أداة مجانية لصناع المحتوى العربي
          </p>
          <h1 className="mx-auto max-w-2xl text-4xl font-semibold leading-[1.1] text-slate-100 sm:text-5xl">
            احسب أرباحك على أي منصة
          </h1>
          <p className="mx-auto mt-5 max-w-[480px] text-[15px] font-normal leading-[1.8] text-slate-300">
            اختر المنصة التي تنشر عليها واحسب أرباحك التقديرية بناء على المشاهدات، المجال، والدولة.
          </p>

          {/* Platform cards */}
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
            {platforms.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className={`group rounded-2xl border bg-[#0F172A] p-6 text-right transition ${p.border}`}
              >
                <div className={`mb-4 inline-grid h-12 w-12 place-items-center rounded-xl text-xl text-white ${p.color}`}>
                  {p.icon}
                </div>
                <h2 className="text-lg font-semibold text-slate-100">{p.name}</h2>
                <p className="mt-2 text-[13px] leading-6 text-slate-400">{p.desc}</p>
                <span className="mt-4 inline-block rounded-full bg-slate-800 px-3 py-1 text-[11px] font-medium text-slate-400">
                  {p.badge}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-slate-800 bg-slate-950 py-5">
        <div className="container-page grid gap-3 text-center text-sm text-slate-300 md:grid-cols-3">
          <span>لا تسجيل دخول</span>
          <span>نطاقات تقديرية لا وعود دخل</span>
          <span>آخر تحديث: أبريل 2026</span>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container-page grid gap-5 md:grid-cols-3">
          {[
            ["تقدير تقريبي واضح", "نعرض نطاقا منخفضا ومرتفعا بدلا من رقم واحد قد يكون مضللا."],
            ["RPM حسب المجال والدولة", "تختلف قيمة ألف مشاهدة حسب نوع المحتوى والجمهور، لذلك نستخدم معاملات مبسطة وشفافة."],
            ["خصوصية أبسط", "لا نطلب تسجيل دخول ولا نخزن بياناتك."]
          ].map(([title, body]) => (
            <div className="card p-6" key={title}>
              <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
              <p className="mt-3 leading-8 text-slate-300">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-slate-100 dark:bg-slate-950">
        <div className="container-page grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-medium text-red-600">أسئلة شائعة</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-100">كل ما تحتاج معرفته عن أرباح المنصات</h2>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>
    </main>
  );
}
