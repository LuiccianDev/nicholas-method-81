import { defineMiddleware } from 'astro:middleware';

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '0',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

function isApiRoute(url: string): boolean {
  try {
    return new URL(url).pathname.startsWith('/api/');
  } catch {
    return false;
  }
}

export const onRequest = defineMiddleware((context, next) => {
  const { request } = context;

  if (isApiRoute(request.url) && request.method === 'POST') {
    const origin = request.headers.get('origin');
    if (origin) {
      try {
        const allowed = new URL(origin).origin === new URL(request.url).origin;
        if (!allowed) {
          return new Response(JSON.stringify({ error: 'Forbidden' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      } catch {
        return new Response(JSON.stringify({ error: 'Forbidden' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
  }

  context.locals.requestId = crypto.randomUUID();

  const response = next();

  return response.then((res) => {
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      res.headers.set(key, value);
    }
    return res;
  });
});
