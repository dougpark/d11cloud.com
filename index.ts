export default {
    async fetch(request: Request): Promise<Response> {
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

        // Serve static files
        if (pathname === '/' || pathname === '/index.html') {
            return new Response(`
<!DOCTYPE html>
<html>
<head>
  <title>My Site</title>
  <link rel="stylesheet" href="/style.css">
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

        // Serve style.css
        if (pathname === '/style.css') {
            return new Response(`
body {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
}
button {
  padding: 10px 20px;
  background: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background: #0056b3;
}
      `, {
                headers: { 'Content-Type': 'text/css' }
            });
        }

        // 404 Not Found
        return new Response('Not Found', { status: 404 });
    }
};
