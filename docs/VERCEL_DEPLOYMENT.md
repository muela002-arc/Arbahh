# Vercel Deployment

## Environment Variable

In Vercel, add this environment variable:

```bash
YOUTUBE_API_KEY=your_real_google_api_key_here
```

Do this in:

```text
Project Settings → Environment Variables
```

Use it for Production, Preview, and Development if needed.

Do not use:

```bash
NEXT_PUBLIC_YOUTUBE_API_KEY
```

That would expose the key to browsers.

## Deploy Steps

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add `YOUTUBE_API_KEY`.
4. Deploy.

## Verify After Deploy

Open:

```text
https://your-domain.com/حاسبة
```

Search:

```text
@MrBeast
```

The lookup should return a channel card and estimated earnings range.

## Caching

The API route caches successful channel estimates in server memory for 6 hours.

On serverless deployments, cache lifetime can vary by instance. This is good enough for the MVP, and can later be replaced with Redis, Vercel KV, or a database cache.
