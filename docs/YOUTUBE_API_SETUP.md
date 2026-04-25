# YouTube API Setup

The automatic channel estimate feature uses **YouTube Data API v3**.

The API key must stay server-side. Do not put it in frontend code and do not prefix it with `NEXT_PUBLIC_`.

## Where To Put The API Key

Put your API key here:

```text
.env.local
```

Inside that file, replace the blank value:

```bash
YOUTUBE_API_KEY=
```

with your real key:

```bash
YOUTUBE_API_KEY=your_real_google_api_key_here
```

Then restart the server. Next.js reads environment variables on server startup.

## How To Create The API Key

1. Go to Google Cloud Console.
2. Create a new project or select an existing project.
3. Open **APIs & Services**.
4. Click **Enable APIs and Services**.
5. Search for **YouTube Data API v3**.
6. Enable it.
7. Go to **Credentials**.
8. Click **Create credentials**.
9. Choose **API key**.
10. Copy the key into `.env.local`.

## Recommended Restrictions

For production, restrict the key in Google Cloud:

- Restrict API usage to **YouTube Data API v3**.
- If deploying on Vercel, use server-side environment variables, not browser-exposed variables.

## Quota Notes

The lookup is intentionally conservative:

- channel resolve/search
- channel statistics
- latest 10 uploads
- video statistics for those 10 videos

Successful estimates are cached in server memory for 6 hours.
