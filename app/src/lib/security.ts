import { NextRequest } from 'next/server';

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitBucket>();

export function getClientIp(xForwardedForHeader: string | null): string {
  if (!xForwardedForHeader) return 'unknown';
  const firstIp = xForwardedForHeader.split(',')[0]?.trim();
  return firstIp || 'unknown';
}

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= maxRequests) {
    const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    return { allowed: false, retryAfterSeconds };
  }

  existing.count += 1;
  rateLimitStore.set(key, existing);
  return { allowed: true, retryAfterSeconds: 0 };
}

/**
 * CSRF protection via Origin header validation.
 * Blocks cross-origin POST requests from malicious sites.
 * Returns null if the request is safe, or an error message if blocked.
 */
export function checkCsrf(request: NextRequest): string | null {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');

  if (!origin) {
    // Requests without Origin (e.g. server-to-server) are allowed
    // since they can't carry browser cookies/credentials
    return null;
  }

  if (!host) {
    return 'Missing host header';
  }

  try {
    const originHost = new URL(origin).host;
    if (originHost !== host) {
      console.warn('CSRF blocked: origin mismatch', { origin, host });
      return 'Cross-origin request blocked';
    }
  } catch {
    return 'Invalid origin header';
  }

  return null;
}


