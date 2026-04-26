import { parseChannelQuery } from "./channelResolver";
import { detectNiche } from "./nicheDetector";
import { buildEstimateModes, estimatePeriodEarnings } from "./earningsCalculator";
import type { ChannelEstimateResponse, RecentVideoEstimate } from "./youtubeTypes";

type YouTubeListResponse<T> = {
  items?: T[];
  error?: {
    code?: number;
    message?: string;
    errors?: { reason?: string; message?: string }[];
  };
};

type ChannelItem = {
  id: string;
  snippet?: {
    title?: string;
    description?: string;
    publishedAt?: string;
    thumbnails?: { default?: { url?: string }; medium?: { url?: string }; high?: { url?: string } };
  };
  statistics?: {
    subscriberCount?: string;
    viewCount?: string;
    videoCount?: string;
    hiddenSubscriberCount?: boolean;
  };
  contentDetails?: {
    relatedPlaylists?: {
      uploads?: string;
    };
  };
};

type SearchItem = {
  id?: { channelId?: string };
};

type PlaylistItem = {
  contentDetails?: { videoId?: string };
};

type VideoItem = {
  id: string;
  snippet?: {
    title?: string;
    description?: string;
    publishedAt?: string;
    categoryId?: string;
  };
  statistics?: {
    viewCount?: string;
  };
};

const youtubeBaseUrl = "https://www.googleapis.com/youtube/v3";

function toNumber(value: string | undefined): number | null {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function median(values: number[]) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle];
}

function daysSince(date: string) {
  const published = new Date(date).getTime();
  if (!Number.isFinite(published)) return 1;
  return Math.max(1, (Date.now() - published) / 86400000);
}

function activityFactorForUploads(recentVideos: RecentVideoEstimate[]) {
  const uploadsLast90Days = recentVideos.filter((video) => daysSince(video.publishedAt) <= 90).length;
  if (uploadsLast90Days >= 8) return { activityFactor: 1, uploadsLast90Days };
  if (uploadsLast90Days >= 3) return { activityFactor: 0.6, uploadsLast90Days };
  return { activityFactor: 0.3, uploadsLast90Days };
}

async function youtubeGet<T>(path: string, params: Record<string, string | number | undefined>, apiKey: string): Promise<YouTubeListResponse<T>> {
  const url = new URL(`${youtubeBaseUrl}${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }
  url.searchParams.set("key", apiKey);

  const response = await fetch(url, {
    next: { revalidate: 21600 }
  });
  const json = (await response.json()) as YouTubeListResponse<T>;

  if (!response.ok || json.error) {
    const reason = json.error?.errors?.[0]?.reason ?? json.error?.message ?? "youtube_error";
    if (reason.includes("quota")) throw new Error("quota_exceeded");
    throw new Error("youtube_error");
  }

  return json;
}

async function resolveChannelId(query: string, apiKey: string) {
  const parsed = parseChannelQuery(query);
  if (!parsed.value) throw new Error("missing_query");
  if (parsed.kind === "invalid") throw new Error("invalid_url");

  if (parsed.kind === "channelId") return parsed.value;

  if (parsed.kind === "handle") {
    try {
      const byHandle = await youtubeGet<ChannelItem>("/channels", { part: "id", forHandle: parsed.value }, apiKey);
      const id = byHandle.items?.[0]?.id;
      if (id) return id;
    } catch {
      // Fall through to search because handle resolution is not available for every legacy channel.
    }
  }

  const searchValue = parsed.kind === "handle" ? `@${parsed.value}` : parsed.value;
  const search = await youtubeGet<SearchItem>(
    "/search",
    {
      part: "snippet",
      type: "channel",
      maxResults: 1,
      q: searchValue
    },
    apiKey
  );

  const channelId = search.items?.[0]?.id?.channelId;
  if (!channelId) throw new Error("not_found");
  return channelId;
}

export async function fetchChannelEstimate(query: string, apiKey: string): Promise<ChannelEstimateResponse> {
  const channelId = await resolveChannelId(query, apiKey);

  const channelResponse = await youtubeGet<ChannelItem>(
    "/channels",
    {
      part: "snippet,statistics,contentDetails",
      id: channelId,
      maxResults: 1
    },
    apiKey
  );

  const channel = channelResponse.items?.[0];
  if (!channel) throw new Error("not_found");

  const uploadsPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsPlaylistId) throw new Error("no_recent_videos");

  const playlistResponse = await youtubeGet<PlaylistItem>(
    "/playlistItems",
    {
      part: "contentDetails",
      playlistId: uploadsPlaylistId,
      maxResults: 15
    },
    apiKey
  );

  const videoIds = (playlistResponse.items ?? []).map((item) => item.contentDetails?.videoId).filter(Boolean).join(",");
  if (!videoIds) throw new Error("no_recent_videos");

  const videosResponse = await youtubeGet<VideoItem>(
    "/videos",
    {
      part: "snippet,statistics",
      id: videoIds,
      maxResults: 15
    },
    apiKey
  );

  const videos = videosResponse.items ?? [];
  if (videos.length === 0) throw new Error("no_recent_videos");

  const recentVideos: RecentVideoEstimate[] = videos
    .map((video) => {
      const publishedAt = video.snippet?.publishedAt ?? new Date().toISOString();
      const viewCount = toNumber(video.statistics?.viewCount) ?? 0;
      return {
        videoId: video.id,
        title: video.snippet?.title ?? "Untitled video",
        publishedAt,
        viewCount,
        viewsPerDay: viewCount / daysSince(publishedAt)
      };
    })
    .filter((video) => video.viewCount > 0);

  if (recentVideos.length === 0) throw new Error("no_recent_videos");

  const medianRecentViewsPerDay = Math.round(median(recentVideos.map((video) => video.viewsPerDay)));
  const { detectedNiche, confidence } = detectNiche({
    channelTitle: channel.snippet?.title ?? "",
    channelDescription: channel.snippet?.description ?? "",
    videoCategoryIds: videos.map((video) => video.snippet?.categoryId ?? "").filter(Boolean),
    videoTitles: videos.map((video) => video.snippet?.title ?? ""),
    videoDescriptions: videos.map((video) => video.snippet?.description ?? "")
  });

  const totalViews = toNumber(channel.statistics?.viewCount);
  const channelAgeDays = channel.snippet?.publishedAt ? daysSince(channel.snippet.publishedAt) : 1;
  const historicalDailyViews = totalViews ? Math.round(totalViews / channelAgeDays) : 0;
  const { activityFactor, uploadsLast90Days } = activityFactorForUploads(recentVideos);
  const estimatedDailyViews = Math.round(Math.max(medianRecentViewsPerDay, historicalDailyViews * activityFactor));
  const earnings = estimatePeriodEarnings(estimatedDailyViews, detectedNiche, "other");
  const estimateModes = buildEstimateModes(estimatedDailyViews, detectedNiche, "other");

  return {
    channelId,
    channelTitle: channel.snippet?.title ?? "YouTube channel",
    channelAvatar: channel.snippet?.thumbnails?.high?.url ?? channel.snippet?.thumbnails?.medium?.url ?? channel.snippet?.thumbnails?.default?.url ?? "",
    subscriberCount: channel.statistics?.hiddenSubscriberCount ? null : toNumber(channel.statistics?.subscriberCount),
    totalViews,
    videoCount: toNumber(channel.statistics?.videoCount),
    recentVideos,
    recentVideoCountUsed: recentVideos.length,
    medianRecentViewsPerDay,
    historicalDailyViews,
    activityFactor,
    uploadsLast90Days,
    estimatedDailyViews,
    estimatedMonthlyViews: estimatedDailyViews * 30,
    estimatedYearlyViews: estimatedDailyViews * 365,
    detectedNiche,
    confidence,
    ...earnings,
    estimateModes,
    lastUpdated: new Date().toISOString(),
    sourceLabel:
      "Estimated daily views based on median recent public video performance, historical channel views, and upload activity."
  };
}
