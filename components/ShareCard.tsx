import { formatCurrency, formatNumber, formatRange } from "@/lib/formatters";

export default function ShareCard({
  views,
  nicheName,
  rpm
}: {
  views: number;
  nicheName: string;
  rpm: number;
}) {
  const dailyLow = (views / 1000) * rpm * 0.5;
  const dailyHigh = (views / 1000) * rpm;

  return (
    <section className="card overflow-hidden">
      <div className="bg-brand-dark p-8 text-white">
        <p className="text-sm font-bold text-brand-accent">نتيجة تقديرية من أرباح يوتيوب</p>
        <h1 className="mt-3 text-3xl font-black sm:text-5xl">تقدير أرباح قناة يوتيوب</h1>
      </div>
      <div className="grid gap-4 p-6 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950">
          <p className="text-sm font-bold text-slate-500">المشاهدات اليومية</p>
          <strong className="mt-1 block text-2xl">{formatNumber(views, true)}</strong>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950">
          <p className="text-sm font-bold text-slate-500">المجال</p>
          <strong className="mt-1 block text-2xl">{nicheName}</strong>
        </div>
        <div className="rounded-2xl bg-red-50 p-5 dark:bg-red-500/10">
          <p className="text-sm font-bold text-slate-500">الأرباح الشهرية التقديرية</p>
          <strong className="mt-1 block text-2xl">{formatRange(dailyLow * 30, dailyHigh * 30, "USD", true)}</strong>
        </div>
        <div className="rounded-2xl bg-amber-50 p-5 dark:bg-amber-500/10">
          <p className="text-sm font-bold text-slate-500">الأرباح السنوية التقديرية</p>
          <strong className="mt-1 block text-2xl">{formatCurrency(dailyLow * 365, "USD", true)} – {formatCurrency(dailyHigh * 365, "USD", true)}</strong>
        </div>
      </div>
      <p className="px-6 pb-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
        هذه أرقام تقديرية — الأرباح الفعلية تتفاوت حسب الجمهور، مدة المشاهدة، ونوع الإعلانات.
      </p>
    </section>
  );
}
