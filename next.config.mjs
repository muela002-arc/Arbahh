/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/webp", "image/avif"]
  },
  experimental: {
    optimizePackageImports: ["@/components", "@/lib"]
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/حاسبة", destination: "/calculator" },
        { source: "/%D8%AD%D8%A7%D8%B3%D8%A8%D8%A9", destination: "/calculator" },
        { source: "/مجالات", destination: "/niches" },
        { source: "/%D9%85%D8%AC%D8%A7%D9%84%D8%A7%D8%AA", destination: "/niches" },
        { source: "/مجالات/:slug", destination: "/niches/:slug" },
        { source: "/%D9%85%D8%AC%D8%A7%D9%84%D8%A7%D8%AA/:slug", destination: "/niches/:slug" },
        { source: "/دليل", destination: "/guide" },
        { source: "/%D8%AF%D9%84%D9%8A%D9%84", destination: "/guide" },
        { source: "/مقارنة", destination: "/compare" },
        { source: "/%D9%85%D9%82%D8%A7%D8%B1%D9%86%D8%A9", destination: "/compare" },
        { source: "/نتيجة", destination: "/result" },
        { source: "/%D9%86%D8%AA%D9%8A%D8%AC%D8%A9", destination: "/result" },

        { source: "/ar/حاسبة-ارباح-اليوتيوب", destination: "/ar/youtube-income-calculator" },
        {
          source: "/ar/%D8%AD%D8%A7%D8%B3%D8%A8%D8%A9-%D8%A7%D8%B1%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8",
          destination: "/ar/youtube-income-calculator"
        },
        { source: "/ar/كم-ارباح-اليوتيوب", destination: "/ar/youtube-earnings-guide" },
        {
          source: "/ar/%D9%83%D9%85-%D8%A7%D8%B1%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8",
          destination: "/ar/youtube-earnings-guide"
        },
        { source: "/ar/كم-يدفع-اليوتيوب-لكل-1000-مشاهدة", destination: "/ar/youtube-pay-per-1000-views" },
        {
          source:
            "/ar/%D9%83%D9%85-%D9%8A%D8%AF%D9%81%D8%B9-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8-%D9%84%D9%83%D9%84-1000-%D9%85%D8%B4%D8%A7%D9%87%D8%AF%D8%A9",
          destination: "/ar/youtube-pay-per-1000-views"
        },
        { source: "/ar/rpm-يوتيوب-العربي", destination: "/ar/rpm-youtube-arabic" },
        { source: "/ar/rpm-%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8-%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A", destination: "/ar/rpm-youtube-arabic" },
        { source: "/ar/ارباح-اليوتيوب-في-السعودية", destination: "/ar/youtube-earnings-saudi" },
        {
          source:
            "/ar/%D8%A7%D8%B1%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8-%D9%81%D9%8A-%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9",
          destination: "/ar/youtube-earnings-saudi"
        },
        { source: "/ar/ارباح-اليوتيوب-في-مصر", destination: "/ar/youtube-earnings-egypt" },
        {
          source: "/ar/%D8%A7%D8%B1%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8-%D9%81%D9%8A-%D9%85%D8%B5%D8%B1",
          destination: "/ar/youtube-earnings-egypt"
        },
        { source: "/ar/ارباح-اليوتيوب-في-الامارات", destination: "/ar/youtube-earnings-uae" },
        {
          source:
            "/ar/%D8%A7%D8%B1%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8-%D9%81%D9%8A-%D8%A7%D9%84%D8%A7%D9%85%D8%A7%D8%B1%D8%A7%D8%AA",
          destination: "/ar/youtube-earnings-uae"
        },
        { source: "/ar/ارباح-اليوتيوب-في-المغرب", destination: "/ar/youtube-earnings-morocco" },
        {
          source:
            "/ar/%D8%A7%D8%B1%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8-%D9%81%D9%8A-%D8%A7%D9%84%D9%85%D8%BA%D8%B1%D8%A8",
          destination: "/ar/youtube-earnings-morocco"
        },
        { source: "/ar/ارباح-اليوتيوب-في-العراق", destination: "/ar/youtube-earnings-iraq" },
        { source: "/ar/%D8%A7%D8%B1%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8-%D9%81%D9%8A-%D8%A7%D9%84%D8%B9%D8%B1%D8%A7%D9%82", destination: "/ar/youtube-earnings-iraq" },
        { source: "/ar/ارباح-اليوتيوب-في-الجزائر", destination: "/ar/youtube-earnings-algeria" },
        { source: "/ar/%D8%A7%D8%B1%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8-%D9%81%D9%8A-%D8%A7%D9%84%D8%AC%D8%B2%D8%A7%D8%A6%D8%B1", destination: "/ar/youtube-earnings-algeria" },
        { source: "/ar/ارباح-اليوتيوب-في-الكويت", destination: "/ar/youtube-earnings-kuwait" },
        { source: "/ar/%D8%A7%D8%B1%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8-%D9%81%D9%8A-%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA", destination: "/ar/youtube-earnings-kuwait" },
        { source: "/ar/كيف-تبدأ-الربح-من-يوتيوب", destination: "/ar/youtube-monetization-guide" },
        { source: "/ar/%D9%83%D9%8A%D9%81-%D8%AA%D8%A8%D8%AF%D8%A3-%D8%A7%D9%84%D8%B1%D8%A8%D8%AD-%D9%85%D9%86-%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8", destination: "/ar/youtube-monetization-guide" },
        { source: "/ar/ارباح-اليوتيوب-في-تونس", destination: "/ar/youtube-earnings-tunisia" },
        { source: "/ar/%D8%A7%D8%B1%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8-%D9%81%D9%8A-%D8%AA%D9%88%D9%86%D8%B3", destination: "/ar/youtube-earnings-tunisia" },
        { source: "/ar/ارباح-اليوتيوب-في-الاردن", destination: "/ar/youtube-earnings-jordan" },
        { source: "/ar/%D8%A7%D8%B1%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8-%D9%81%D9%8A-%D8%A7%D9%84%D8%A7%D8%B1%D8%AF%D9%86", destination: "/ar/youtube-earnings-jordan" },
        { source: "/ar/ارباح-اليوتيوب-في-ليبيا", destination: "/ar/youtube-earnings-libya" },
        { source: "/ar/%D8%A7%D8%B1%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8-%D9%81%D9%8A-%D9%84%D9%8A%D8%A8%D9%8A%D8%A7", destination: "/ar/youtube-earnings-libya" },
        { source: "/ar/ارباح-اليوتيوب-في-قطر", destination: "/ar/youtube-earnings-qatar" },
        { source: "/ar/%D8%A7%D8%B1%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D9%8A%D9%88%D8%AA%D9%8A%D9%88%D8%A8-%D9%81%D9%8A-%D9%82%D8%B7%D8%B1", destination: "/ar/youtube-earnings-qatar" }
      ]
    };
  }
};

export default nextConfig;
