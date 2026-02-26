import type { NextConfig } from "next";

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://go.payoneer.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://go.payoneer.com",
      "font-src 'self'",
      "connect-src 'self' https://*.supabase.co https://go.payoneer.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' https://go.payoneer.com",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  headers: async () => [
    { source: '/(.*)', headers: securityHeaders },
  ],
};

export default nextConfig;
