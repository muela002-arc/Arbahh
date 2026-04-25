import { NextResponse } from "next/server";
import { getCached, setCached } from "@/lib/cache";
import { fetchChannelEstimate } from "@/lib/youtubeApi";
import type { ChannelEstimateResponse, ChannelEstimateError } from "@/lib/youtubeTypes";

const cacheTtlMs = 1000 * 60 * 60 * 6;

function errorResponse(code: ChannelEstimateError["error"]["code"], message: string, status = 400) {
  return NextResponse.json<ChannelEstimateError>({ error: { code, message } }, { status });
}

export async function POST(request: Request) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return errorResponse("missing_api_key", "YouTube API key is not configured on the server.", 500);
  }

  let query = "";
  try {
    const body = (await request.json()) as { query?: string };
    query = body.query?.trim() ?? "";
  } catch {
    return errorResponse("missing_query", "Please enter a YouTube channel URL, handle, or name.");
  }

  if (!query) {
    return errorResponse("missing_query", "Please enter a YouTube channel URL, handle, or name.");
  }

  const cacheKey = `youtube:channel-estimate:${query.toLowerCase()}`;
  const cached = getCached<ChannelEstimateResponse>(cacheKey);
  if (cached) {
    return NextResponse.json(cached, {
      headers: { "Cache-Control": "private, max-age=0" }
    });
  }

  try {
    const estimate = await fetchChannelEstimate(query, apiKey);
    setCached(cacheKey, estimate, cacheTtlMs);
    return NextResponse.json(estimate, {
      headers: { "Cache-Control": "private, max-age=0" }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "youtube_error";
    if (message === "quota_exceeded") {
      return errorResponse("quota_exceeded", "YouTube API quota has been reached. Please try again later.", 429);
    }
    if (message === "not_found") {
      return errorResponse("not_found", "We could not find a matching public YouTube channel.", 404);
    }
    if (message === "no_recent_videos") {
      return errorResponse("no_recent_videos", "This channel has no recent public videos with view data.", 422);
    }
    if (message === "missing_query") {
      return errorResponse("missing_query", "Please enter a YouTube channel URL, handle, or name.", 400);
    }
    return errorResponse("youtube_error", "YouTube data could not be loaded right now. Please try manual input.", 502);
  }
}
