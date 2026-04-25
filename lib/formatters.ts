import { fixedRates, type CurrencyCode } from "./currencies";

export function formatNumber(n: number, useArabic: boolean, opts?: { currency?: boolean; decimals?: number }): string {
  const decimals = opts?.decimals ?? 0;
  const formatted = n.toLocaleString(useArabic ? "ar-EG" : "en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  if (opts?.currency) {
    return useArabic ? `${formatted} $` : `$${formatted}`;
  }
  return formatted;
}

export function formatCurrency(valueUsd: number, currency: CurrencyCode, arabicDigits: boolean) {
  const value = valueUsd * fixedRates[currency];
  return new Intl.NumberFormat(arabicDigits ? "ar-EG" : "en-US", {
    currency,
    maximumFractionDigits: value < 100 ? 2 : 0,
    style: "currency"
  }).format(value);
}

export function formatRange(lowUsd: number, highUsd: number, currency: CurrencyCode, arabicDigits: boolean) {
  return `${formatCurrency(lowUsd, currency, arabicDigits)} – ${formatCurrency(highUsd, currency, arabicDigits)}`;
}

export function formatPercent(value: number, arabicDigits: boolean) {
  return `${formatNumber(value, arabicDigits)}%`;
}
