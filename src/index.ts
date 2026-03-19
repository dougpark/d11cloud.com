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
            // For root path /, try to serve index.html
            if (pathname === '/') {
                const indexResponse = await env.ASSETS.fetch(new Request(new URL('/index.html', request.url).toString()));
                if (indexResponse.status === 200) {
                    return indexResponse;
                }
            }

            // Try to serve the requested file
            const response = await env.ASSETS.fetch(request);
            if (response.status !== 404) {
                return response;
            }
        }

        // 404 Not Found
        return new Response('Not Found', { status: 404 });
    }
};
