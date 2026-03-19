export default {
    async fetch(request: Request, env: any): Promise<Response> {
        const url = new URL(request.url);
        const pathname = url.pathname;

        // API endpoint: /api/time
        if (pathname === '/api/time') {
            const currentTime = new Date().toISOString();
            return new Response(
                JSON.stringify({
                    timestamp: currentTime,
                    serverTime: currentTime,
                    unixTime: Math.floor(Date.now() / 1000)
                }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Serve static files from public/ directory
        if (env.ASSETS) {
            const response = await env.ASSETS.fetch(request);
            if (response.status !== 404) {
                return response;
            }
        }

        // Serve homepage
        if (pathname === '/' || pathname === '/index.html') {
            return new Response(`
<!DOCTYPE html>
<html>
<head>
  <title>d11cloud.com</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <h1>Hello from Cloudflare Workers!</h1>
  <p>Current time: <span id="time"></span></p>
  <button onclick="fetchTime()">Get Server Time</button>
  <script>
    async function fetchTime() {
      const response = await fetch('/api/time');
      const data = await response.json();
      document.getElementById('time').textContent = data.serverTime;
    }
  </script>
</body>
</html>
      `, {
                headers: { 'Content-Type': 'text/html' }
            });
        }

        // 404 Not Found
        return new Response('Not Found', { status: 404 });
    }
};
