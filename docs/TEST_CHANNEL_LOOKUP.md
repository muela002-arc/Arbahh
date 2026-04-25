# Test Channel Lookup

## 1. Add Your API Key

Open:

```text
.env.local
```

Add:

```bash
YOUTUBE_API_KEY=your_real_google_api_key_here
```

## 2. Restart The App

For development:

```bash
npm run dev
```

For production-like testing:

```bash
npm run build
npm run start -- -p 3013
```

## 3. Open The Calculator

Use:

```text
http://localhost:3013/حاسبة
```

or, during dev:

```text
http://localhost:3000/حاسبة
```

## 4. Try Search Inputs

Paste one of these into the automatic lookup field:

```text
@MrBeast
```

```text
https://www.youtube.com/@mkbhd
```

```text
https://www.youtube.com/channel/UCX6OQ3DkcsbYNE6H8uQQuVA
```

```text
Marques Brownlee
```

## Expected Result

You should see:

- channel avatar
- channel title
- subscribers
- total views
- number of recent videos used
- estimated daily views
- estimated monthly views
- detected niche
- confidence level
- estimated earnings range

## Test The API Directly

PowerShell:

```powershell
Invoke-WebRequest `
  -Uri "http://localhost:3013/api/youtube/channel-estimate" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"query":"@MrBeast"}'
```

## Common Errors

`missing_api_key`

The `.env.local` file is missing the key, or the server was not restarted after adding it.

`quota_exceeded`

The Google project has reached its YouTube API quota.

`not_found`

The query did not resolve to a public YouTube channel.

`no_recent_videos`

The channel does not have enough recent public videos with visible view counts.
