# Arbah YouTube Pre-Launch Checklist

Use this file before going live on Vercel.

## Legal

- Privacy Policy: `/privacy`
- Terms of Service: `/terms`
- Disclaimer: `/disclaimer`
- Earnings disclaimer appears under calculator results.
- Not affiliated with YouTube or Google note is included in legal pages and calculator wording.
- Cookie consent banner is included and gates Google Analytics.
- Privacy contact email: `privacy@arbahyoutube.com`

## Environment Variables

Add these in `.env.local` for local development and in Vercel for production:

```bash
YOUTUBE_API_KEY=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

`YOUTUBE_API_KEY` must stay server-side. Do not prefix it with `NEXT_PUBLIC_`.

## SEO

- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
- Open Graph image: `/og.webp`
- Arabic and English calculator pages exist.
- Arabic SEO pages include FAQ content and internal links.
- Canonical and hreflang metadata are configured in page metadata helpers.

Submit this URL in Google Search Console after deployment:

```text
https://arbahyoutube.com/sitemap.xml
```

## Content Pages

Arabic SEO pages included:

- `/ar/كم-ارباح-اليوتيوب`
- `/ar/كم-يدفع-اليوتيوب-لكل-1000-مشاهدة`
- `/ar/rpm-يوتيوب-العربي`
- `/ar/ارباح-اليوتيوب-في-السعودية`
- `/ar/ارباح-اليوتيوب-في-مصر`
- `/ar/ارباح-اليوتيوب-في-الامارات`
- `/ar/ارباح-اليوتيوب-في-المغرب`

Keep expanding these pages over time with fresh examples, FAQ updates, and internal links from new articles.

## Product Accuracy

- Broad RPM mode uses `$0.25-$4.00`.
- Arabic market and niche-adjusted estimates are shown as ranges.
- Results show RPM assumptions and confidence messaging.
- Channel lookup uses public YouTube data only.
- Estimates are never described as guaranteed or exact.

## Performance

- Initial calculator pages stay static and lightweight.
- YouTube API calls only run after a user searches.
- Channel estimates are cached server-side for repeated lookups.
- Production build must pass before deployment:

```bash
npm run build
npm run lint
```

## External Setup Still Required

- Create/verify Google Search Console property.
- Create Google Analytics stream and add `NEXT_PUBLIC_GA_ID`.
- Apply for/activate Google AdSense before adding ad units.
- Connect the production domain in Vercel.
