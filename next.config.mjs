/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === "development";

// Content Security Policy — Razorpay Checkout needs its script,
// API/iframe and image hosts; everything else is limited to this site.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://checkout.razorpay.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.razorpay.com",
  "font-src 'self' data:",
  "connect-src 'self' https://api.razorpay.com https://lumberjack.razorpay.com https://*.razorpay.com",
  // Google Maps embed (Location section above the footer)
  "frame-src https://api.razorpay.com https://checkout.razorpay.com https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.razorpay.com",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: 'camera=(), microphone=(), geolocation=(), payment=(self "https://checkout.razorpay.com" "https://api.razorpay.com")',
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];

const nextConfig = {
  devIndicators: false,
  reactCompiler: true,

  // Security: don't advertise Next.js, don't ship source maps to browsers.
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  // pdfkit (invoice PDF attached to confirmation emails) must not be
  // bundled by Next.js — fixes "applyDecoratedDescriptor doesn't exist".
  serverExternalPackages: ["pdfkit", "fontkit"],

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
    ];
  },
};

export default nextConfig;
