import type { Metadata } from "next";
import Link from "next/link";
import ShareCard from "@/components/ShareCard";
import { getNiche } from "@/lib/nicheData";

export const metadata: Metadata = {
  title: "نتيجة أرباح يوتيوب",
  description: "صفحة نتيجة قابلة للمشاركة من حاسبة أرباح يوتيوب.",
  alternates: { canonical: "/نتيجة", languages: { ar: "/نتيجة", en: "/en" } },
  openGraph: {
    title: "نتيجة أرباح يوتيوب",
    description: "شاهد نطاق أرباح يوتيوب التقديري واحسب أرباحك أنت.",
    images: ["/og.webp"]
  }
};

type PageProps = {
  searchParams: { v?: string; n?: string; r?: string };
};

export default function ResultPage({ searchParams }: PageProps) {
  const views = Number(searchParams.v || 10000);
  const niche = getNiche(searchParams.n || "tech");
  const rpm = Number(searchParams.r || niche?.avgRpm || 2);

  return (
    <main className="section">
      <div className="container-page max-w-4xl">
        <ShareCard views={Number.isFinite(views) ? views : 10000} nicheName={niche?.name || "عام"} rpm={Number.isFinite(rpm) ? rpm : 2} />
        <div className="mt-8 text-center">
          <Link className="focus-ring inline-flex rounded-xl bg-red-600 px-6 py-4 font-black text-white hover:bg-red-700" href="/حاسبة">
            احسب أرباحك أنت
          </Link>
        </div>
      </div>
    </main>
  );
}
