export type ParsedChannelQuery =
  | { kind: "channelId"; value: string }
  | { kind: "handle"; value: string }
  | { kind: "custom"; value: string }
  | { kind: "search"; value: string }
  | { kind: "invalid"; value: string };

const channelIdPattern = /^UC[a-zA-Z0-9_-]{20,}$/;
const urlLikePattern = /^(https?:\/\/|www\.|youtube\.com|youtu\.be)/i;

export function parseChannelQuery(rawQuery: string): ParsedChannelQuery {
  const query = rawQuery.trim();
  if (!query) return { kind: "search", value: "" };

  if (channelIdPattern.test(query)) {
    return { kind: "channelId", value: query };
  }

  if (query.startsWith("@")) {
    return { kind: "handle", value: query.slice(1) };
  }

  if (!urlLikePattern.test(query)) {
    return { kind: "search", value: query.replace(/^@/, "") };
  }

  try {
    const url = new URL(query.startsWith("http") ? query : `https://${query}`);
    const host = url.hostname.replace(/^www\./, "");
    if (!host.includes("youtube.com") && !host.includes("youtu.be")) {
      return { kind: "invalid", value: query };
    }

    const parts = url.pathname.split("/").filter(Boolean);
    const first = parts[0] ?? "";
    const second = parts[1] ?? "";

    if (first.startsWith("@")) return { kind: "handle", value: first.slice(1) };
    if (first === "channel" && second) return { kind: "channelId", value: second };
    if ((first === "c" || first === "user") && second) return { kind: "custom", value: second };
    if (urlLikePattern.test(query)) return { kind: "invalid", value: query };
  } catch {
    return { kind: "invalid", value: query };
  }

  return { kind: "search", value: query.replace(/^@/, "") };
}
