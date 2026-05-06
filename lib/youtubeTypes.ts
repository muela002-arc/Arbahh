import type { NicheSlug, RpmRange } from "./rpmData";

export type ChannelEstimateErrorCode =
  | "missing_query"
  | "missing_api_key"
  | "invalid_url"
  | "not_found"
  | "quota_exceeded"
  | "no_recent_videos"
  | "youtube_error"
  | "network_error";

export type RecentVideoEstimate = {
  videoId: string;
  title: string;
  publishedAt: string;
  viewCount: number;
  viewsPerDay: number;
};

export type EstimateModeSlug = "broad" | "arabicMarket" | "nicheAdjusted";

export type EarningsRange = { low: number; high: number };

export type EstimateMode = {
  mode: EstimateModeSlug;
  label: string;
  rpmRange: { low: number; high: number };
  dailyEarningsRange: EarningsRange;
  monthlyEarningsRange: EarningsRange;
  yearlyEarningsRange: EarningsRange;
};

export type ChannelEstimateResponse = {
  channelId: string;
  channelTitle: string;
  channelAvatar: string;
  subscriberCount: number | null;
  totalViews: number | null;
  videoCount: number | null;
  recentVideos: RecentVideoEstimate[];
  recentVideoCountUsed: number;
  medianRecentViewsPerDay: number;
  historicalDailyViews: number;
  activityFactor: number;
  uploadsLast90Days: number;
  estimatedDailyViews: number;
  estimatedMonthlyViews: number;
  estimatedYearlyViews: number;
  detectedNiche: NicheSlug;
  confidence: "low" | "medium" | "high";
  isArabicChannel: boolean;
  rpmRange: RpmRange;
  dailyEarningsRange: { low: number; high: number };
  monthlyEarningsRange: { low: number; high: number };
  yearlyEarningsRange: { low: number; high: number };
  estimateModes: EstimateMode[];
  lastUpdated: string;
  sourceLabel: string;
};

export type ChannelEstimateError = {
  error: {
    code: ChannelEstimateErrorCode;
    message: string;
  };
};
