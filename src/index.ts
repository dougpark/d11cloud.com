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

            // Handle /blog and any sub-paths/assets
            if (pathname.startsWith('/blog')) {
                // Try to serve the exact file/folder first
                let response = await env.ASSETS.fetch(request);
                if (response.status === 200) {
                    return response;
                }

                // If it's a 404, try serving index.html for directory-like paths
                if (response.status === 404 && !pathname.includes('.')) {
                    const indexResponse = await env.ASSETS.fetch(
                        new Request(new URL(pathname.endsWith('/') ? pathname + 'index.html' : pathname + '/index.html', request.url).toString())
                    );
                    if (indexResponse.status === 200) {
                        return indexResponse;
                    }
                }
                // If nothing found in /blog, return 404 for blog paths
                if (response.status === 404) {
                    return response;
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
