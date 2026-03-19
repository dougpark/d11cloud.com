# d11cloud.com

A Cloudflare Worker project serving d11cloud.com.

## Features

- Time API endpoint (`/api/time`)
- Static HTML homepage
- Dynamic CSS styling
- Built with TypeScript
- Deployed to Cloudflare Workers

## Development

### Prerequisites

- Node.js 18+ and npm
- Wrangler CLI (installed automatically via npm)
- Cloudflare account (for deployment)

### Setup

```bash
npm install
```

### Local Development

Run the development server:

```bash
npm run dev
```

The server will be available at `http://localhost:8787`

### Deployment

To deploy to Cloudflare Workers:

```bash
npm run deploy
```

**Note:** You need to configure your Cloudflare account first:
1. Run `wrangler login` to authenticate
2. Update `wrangler.toml` with your `account_id` and `zone_id`

## Project Structure

```
src/
  index.ts          # Main Worker handler
package.json        # Dependencies and scripts
wrangler.toml       # Cloudflare Workers configuration
tsconfig.json       # TypeScript configuration
```

## API Endpoints

### GET /api/time

Returns the current server time in multiple formats:

```json
{
  "timestamp": "2025-03-18T...",
  "serverTime": "2025-03-18T...",
  "unixTime": 1774000000
}
```

### GET / or /index.html

Returns the HTML homepage with interactive time fetching.

## License

MIT
