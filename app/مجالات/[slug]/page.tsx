import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RPMTable from "@/components/RPMTable";
import { getNiche, niches } from "@/lib/nicheData";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return niches.map((niche) => ({ slug: niche.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const niche = getNiche(params.slug);
  if (!niche) return {};
  return {
    title: niche.title,
    description: `${niche.description} تعرف على RPM يوتيوب عربي في مجال ${niche.name} وتقديرات الأرباح عند 1k و10k و100k و1M مشاهدة يومية.`,
    alternates: { canonical: `/مجالات/${niche.slug}`, languages: { ar: `/مجالات/${niche.slug}`, en: "/en" } },
    openGraph: {
      title: niche.title,
      description: niche.description,
      images: ["/og.webp"]
    }
  };
}

export default function NicheDetailPage({ params }: PageProps) {
  const niche = getNiche(params.slug);
  if (!niche) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: niche.title,
    description: niche.description,
    inLanguage: "ar",
    author: { "@type": "Organization", name: "أرباح يوتيوب" }
  };

  return (
    <main className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container-page">
        <Link className="font-bold text-red-600" href="/مجالات">← كل المجالات</Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <section>
            <h1 className="text-4xl font-black">{niche.title}</h1>
            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">{niche.description}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="card p-5">
                <p className="text-sm font-bold text-slate-500">النطاق العربي</p>
                <strong className="mt-2 block text-2xl">${niche.arabicRange[0]} – ${niche.arabicRange[1]}</strong>
              </div>
              <div className="card p-5">
                <p className="text-sm font-bold text-slate-500">النطاق العالمي</p>
                <strong className="mt-2 block text-2xl">${niche.globalRange[0]} – ${niche.globalRange[1]}</strong>
              </div>
            </div>
            <Link className="focus-ring mt-6 inline-flex rounded-xl bg-red-600 px-5 py-3 font-black text-white hover:bg-red-700" href={`/حاسبة?niche=${niche.slug}`}>
              احسب أرباحك في هذا المجال
            </Link>
          </section>
          <RPMTable lowRpm={niche.arabicRange[0]} highRpm={niche.arabicRange[1]} />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <section className="card p-6">
            <h2 className="text-2xl font-black">قنوات عربية بارزة في هذا المجال</h2>
            <ul className="mt-4 space-y-3 font-bold text-slate-700 dark:text-slate-200">
              {niche.topChannels.map((channel) => (
                <li key={channel}>{channel}</li>
              ))}
            </ul>
          </section>
          <section className="card p-6">
            <h2 className="text-2xl font-black">نصائح للنمو</h2>
            <ul className="mt-4 space-y-3 leading-8 text-slate-600 dark:text-slate-300">
              {niche.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
