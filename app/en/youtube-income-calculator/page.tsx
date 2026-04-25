import type { Metadata } from "next";
import Link from "next/link";
import EarningsCalculator from "@/components/EarningsCalculator";

export const metadata: Metadata = {
  title: "YouTube Income Calculator for Arabic Channels",
  description: "Estimate YouTube earnings for Arabic and global audiences using views, niche, country, and RPM assumptions.",
  alternates: { canonical: "/en/youtube-income-calculator", languages: { ar: "/ar/حاسبة-ارباح-اليوتيوب", en: "/en/youtube-income-calculator" } }
};

export default function EnglishCalculatorPage() {
  return (
    <main className="section" dir="ltr">
      <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <article className="leading-8 text-slate-300">
          <h1 className="text-4xl font-semibold text-slate-100">YouTube Income Calculator</h1>
          <p className="mt-5">
            Use this lightweight calculator to estimate possible YouTube revenue for Arabic or mixed audiences. It uses generalized RPM assumptions by niche
            and country, then shows a low-to-high range instead of a guaranteed number.
          </p>
          <p className="mt-4">
            For Arabic SEO context, see the <Link className="text-red-500" href="/ar/حاسبة-ارباح-اليوتيوب">Arabic calculator page</Link> and the{" "}
            <Link className="text-red-500" href="/ar/rpm-يوتيوب-العربي">Arabic RPM guide</Link>.
          </p>
        </article>
        <EarningsCalculator />
      </div>
    </main>
  );
}
