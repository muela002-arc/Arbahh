import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Arabic YouTube Earnings Calculator",
  description:
    "Arabic-first YouTube earnings calculator for creators targeting MENA audiences. Estimate YouTube revenue with Arabic RPM assumptions.",
  alternates: { canonical: "/en", languages: { ar: "/", en: "/en" } },
  openGraph: {
    title: "Arabic YouTube Earnings Calculator",
    description: "Estimate Arabic YouTube revenue and RPM assumptions.",
    images: ["/og.webp"]
  }
};

export default function EnglishPage() {
  return (
    <main className="section font-inter" dir="ltr">
      <div className="container-page max-w-4xl text-left">
        <p className="font-bold text-red-600">Arabic creator tool</p>
        <h1 className="mt-2 text-4xl font-black">Arabic YouTube Earnings Calculator</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
          arbahyoutube.com is an Arabic-first YouTube money calculator for creators who want RPM assumptions tailored to
          Arabic niches and MENA audience locations.
        </p>
        <Link className="focus-ring mt-8 inline-flex rounded-xl bg-red-600 px-6 py-4 font-black text-white hover:bg-red-700" href="/حاسبة">
          Open the Arabic calculator
        </Link>
      </div>
    </main>
  );
}
