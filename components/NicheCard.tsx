import Link from "next/link";
import type { Niche } from "@/lib/nicheData";

export default function NicheCard({ niche }: { niche: Niche }) {
  return (
    <Link className="card focus-ring group block p-5 transition hover:-translate-y-1 hover:border-red-600" href={`/مجالات/${niche.slug}`}>
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-xl font-black">{niche.name}</h2>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">{niche.trend}</span>
      </div>
      <p className="mt-3 min-h-14 text-sm leading-7 text-slate-600 dark:text-slate-300">{niche.description}</p>
      <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
        <p className="text-xs font-bold text-slate-500">متوسط RPM</p>
        <strong className="mt-1 block text-2xl text-red-600">${niche.avgRpm.toFixed(1)}</strong>
      </div>
      <p className="mt-4 text-sm font-bold text-slate-600 dark:text-slate-300">أفضل الدول: {niche.bestCountries.join("، ")}</p>
    </Link>
  );
}
