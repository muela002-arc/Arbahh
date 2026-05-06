import { getRpmRange, type ContentFormat, type CountrySlug, type NicheSlug } from "./rpmData";
import type { EstimateMode } from "./youtubeTypes";

export function estimateEarnings(views: number, niche: NicheSlug, country: CountrySlug = "other", format: ContentFormat = "standard") {
  const rpmRange = getRpmRange(niche, country, undefined, format);
  const low = (views / 1000) * rpmRange.low;
  const high = (views / 1000) * rpmRange.high;

  return {
    rpmRange,
    range: { low, high }
  };
}

export function estimatePeriodEarnings(dailyViews: number, niche: NicheSlug, country: CountrySlug = "other", format: ContentFormat = "standard") {
  const daily = estimateEarnings(dailyViews, niche, country, format);
  const monthly = estimateEarnings(dailyViews * 30, niche, country, format);
  const yearly = estimateEarnings(dailyViews * 365, niche, country, format);

  return {
    rpmRange: daily.rpmRange,
    dailyEarningsRange: daily.range,
    monthlyEarningsRange: monthly.range,
    yearlyEarningsRange: yearly.range
  };
}

function rangeForViews(views: number, rpmLow: number, rpmHigh: number) {
  return {
    low: (views / 1000) * rpmLow,
    high: (views / 1000) * rpmHigh
  };
}

export function buildEstimateModes(dailyViews: number, niche: NicheSlug, country: CountrySlug = "other", format: ContentFormat = "standard"): EstimateMode[] {
  const arabicRpm = getRpmRange("general", country, undefined, format);
  const nicheRpm = getRpmRange(niche, country, undefined, format);
  const modes = [
    {
      mode: "broad" as const,
      label: "Broad estimate",
      rpmRange: { low: 0.25, high: 4 }
    },
    {
      mode: "arabicMarket" as const,
      label: "Arabic market estimate",
      rpmRange: { low: arabicRpm.low, high: arabicRpm.high }
    },
    {
      mode: "nicheAdjusted" as const,
      label: "Niche-adjusted estimate",
      rpmRange: { low: nicheRpm.low, high: nicheRpm.high }
    }
  ];

  return modes.map((mode) => ({
    ...mode,
    dailyEarningsRange: rangeForViews(dailyViews, mode.rpmRange.low, mode.rpmRange.high),
    monthlyEarningsRange: rangeForViews(dailyViews * 30, mode.rpmRange.low, mode.rpmRange.high),
    yearlyEarningsRange: rangeForViews(dailyViews * 365, mode.rpmRange.low, mode.rpmRange.high)
  }));
}
