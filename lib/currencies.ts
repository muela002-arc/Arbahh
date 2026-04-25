export type CurrencyCode = "USD" | "SAR" | "AED" | "EGP";

export const fixedRates: Record<CurrencyCode, number> = {
  USD: 1,
  SAR: 3.75,
  AED: 3.67,
  EGP: 48.5
};

export const currencyLabels: Record<CurrencyCode, string> = {
  USD: "دولار",
  SAR: "ريال",
  AED: "درهم",
  EGP: "جنيه"
};
