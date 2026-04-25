import { formatCurrency, formatNumber, formatRange } from "@/lib/formatters";

const dailyViews = [1000, 10000, 100000, 1000000];

export default function RPMTable({ lowRpm, highRpm }: { lowRpm: number; highRpm: number }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <table className="w-full min-w-[640px] text-right">
        <thead className="bg-slate-50 text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-300">
          <tr>
            <th className="p-4">المشاهدات اليومية</th>
            <th className="p-4">تقدير يومي</th>
            <th className="p-4">تقدير شهري</th>
            <th className="p-4">تقدير سنوي</th>
          </tr>
        </thead>
        <tbody>
          {dailyViews.map((views) => {
            const low = (views / 1000) * lowRpm;
            const high = (views / 1000) * highRpm;
            return (
              <tr className="border-t border-slate-200 dark:border-slate-800" key={views}>
                <td className="p-4 font-black">{formatNumber(views, true)}</td>
                <td className="p-4">{formatRange(low, high, "USD", true)}</td>
                <td className="p-4">{formatRange(low * 30, high * 30, "USD", true)}</td>
                <td className="p-4">{formatCurrency(low * 365, "USD", true)} – {formatCurrency(high * 365, "USD", true)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
