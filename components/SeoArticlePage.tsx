import Link from "next/link";

type SeoArticlePageProps = {
  title: string;
  intro: string;
  sections: { title: string; body: string }[];
  faqs?: { question: string; answer: string }[];
};

export default function SeoArticlePage({ title, intro, sections, faqs = [] }: SeoArticlePageProps) {
  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer }
          }))
        }
      : null;

  return (
    <main className="section">
      {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> : null}
      <article className="container-page max-w-4xl leading-8 text-slate-300">
        <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
          <Link className="hover:text-red-500" href="/">
            الرئيسية
          </Link>{" "}
          / <span>{title}</span>
        </nav>
        <h1 className="text-4xl font-semibold leading-tight text-slate-100">{title}</h1>
        <p className="mt-6 text-lg leading-9 text-slate-300">{intro}</p>
        <div className="mt-8 rounded-2xl border border-slate-800 bg-[#0F172A] p-5">
          <p className="text-sm leading-7 text-slate-300">
            استخدم <Link className="text-red-500 hover:text-red-400" href="/حاسبة">حاسبة أرباح يوتيوب</Link> لتطبيق هذه الافتراضات على
            مشاهداتك، أو راجع <Link className="text-red-500 hover:text-red-400" href="/مجالات">دليل المجالات و RPM</Link> للمقارنة بين
            أنواع المحتوى.
          </p>
        </div>
        {sections.map((section) => (
          <section className="mt-10" key={section.title}>
            <h2 className="text-2xl font-semibold text-slate-100">{section.title}</h2>
            <p className="mt-4 whitespace-pre-line">{section.body}</p>
          </section>
        ))}
        {faqs.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-100">أسئلة شائعة</h2>
            <div className="mt-4 grid gap-4">
              {faqs.map((faq) => (
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4" key={faq.question}>
                  <h3 className="font-semibold text-slate-100">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
