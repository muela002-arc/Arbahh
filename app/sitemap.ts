import type { MetadataRoute } from "next";
import { niches } from "@/lib/nicheData";

const encodedRoutes = [
  "/",
  "/%D8%AD%D8%A7%D8%B3%D8%A8%D8%A9",
  "/%D9%85%D8%AC%D8%A7%D9%84%D8%A7%D8%AA",
  "/%D8%AF%D9%84%D9%8A%D9%84",
  "/%D9%85%D9%82%D8%A7%D8%B1%D9%86%D8%A9",
  "/%D9%86%D8%AA%D9%8A%D8%AC%D8%A9",
  "/en",
  "/en/youtube-income-calculator",
  "/ar/%D8%AD%D8%A7%D8%B3%D8%A8%D8%A9-%D8%A7%D8%B1%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8",
  "/ar/%D9%83%D9%85-%D8%A7%D8%B1%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8",
  "/ar/%D9%83%D9%85-%D9%8A%D8%AF%D9%81%D8%B9-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8-%D9%84%D9%83%D9%84-1000-%D9%85%D8%B4%D8%A7%D9%87%D8%AF%D8%A9",
  "/ar/rpm-%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8-%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A",
  "/ar/%D8%A7%D8%B1%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8-%D9%81%D9%8A-%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9",
  "/ar/%D8%A7%D8%B1%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8-%D9%81%D9%8A-%D9%85%D8%B5%D8%B1",
  "/ar/%D8%A7%D8%B1%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8-%D9%81%D9%8A-%D8%A7%D9%84%D8%A7%D9%85%D8%A7%D8%B1%D8%A7%D8%AA",
  "/ar/%D8%A7%D8%B1%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8-%D9%81%D9%8A-%D8%A7%D9%84%D9%85%D8%BA%D8%B1%D8%A8",
  "/terms",
  "/privacy",
  "/disclaimer"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://arbahyoutube.com";
  const nicheRoutes = niches.flatMap((niche) => [`/niches/${niche.slug}`, `/%D9%85%D8%AC%D8%A7%D9%84%D8%A7%D8%AA/${niche.slug}`]);

  return [...encodedRoutes, ...nicheRoutes].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.8
  }));
}
