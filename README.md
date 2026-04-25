# Arbah YouTube

Arabic-first YouTube earnings calculator and creator resource site.

## Important Files

- `.env.local` - put your real YouTube API key here.
- `.env.example` - safe example showing the required variable name.
- `docs/YOUTUBE_API_SETUP.md` - how to create and configure the API key.
- `docs/TEST_CHANNEL_LOOKUP.md` - how to test automatic channel estimates.
- `docs/VERCEL_DEPLOYMENT.md` - how to deploy with environment variables.
- `docs/LAUNCH_CHECKLIST.md` - final pre-launch verification list.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## YouTube Data API setup

Automatic channel estimation uses the YouTube Data API v3 from a server-side API route. The API key is never exposed to the browser.

The placeholder is in:

```text
.env.local
```

Look for:

```bash
YOUTUBE_API_KEY=
```

Paste your real key after the equals sign.

1. Open Google Cloud Console.
2. Create or select a project.
3. Enable **YouTube Data API v3**.
4. Create an API key.
5. Add it to `.env.local`:

```bash
YOUTUBE_API_KEY=your_key_here
```

Restart the dev server after editing `.env.local`.

## Analytics and Search Console

Tracking is consent-gated. Google Analytics will not load until the visitor accepts cookies.

Add these placeholders in `.env.local` or in Vercel project environment variables:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_google_search_console_token
```

The same placeholders are documented in `.env.example`.

After deployment:

1. Add the live domain to Google Search Console.
2. Use the HTML tag verification method and paste only the verification token into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
3. Add the live sitemap URL in Search Console:

```text
https://arbahyoutube.com/sitemap.xml
```

For AdSense, the privacy policy already mentions cookies, analytics, and ads. Add the AdSense script only after your AdSense account/site is ready, then keep it behind the cookie consent flow for EU visitors.

## Quota warning

The channel lookup is designed to be conservative:

- resolves the channel
- fetches channel statistics
- fetches the latest 10 public uploads
- fetches video statistics for those 10 videos

This keeps the result fast and limits quota usage. The code is structured so the default can later be increased to 30 videos if needed.

## Caching behavior

`/api/youtube/channel-estimate` caches successful channel estimates in server memory for 6 hours. This reduces repeated quota usage for the same channel during a server process lifetime. Production deployments with multiple server instances may each maintain their own cache unless a shared cache is added later.

## Legal note

All earnings are estimates based on public YouTube data and generalized RPM assumptions. The site is not affiliated with YouTube or Google and does not provide financial advice.
