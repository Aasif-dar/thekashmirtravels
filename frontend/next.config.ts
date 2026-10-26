import type { NextConfig } from "next";

// Demo mode (local dev only, mirrors isDemoMode() in src/lib/demo.ts): admins
// can paste any https image URL, so allow remote images while it is on.
const demoMode =
  process.env.DEMO_MODE === "true" &&
  process.env.NODE_ENV !== "production" &&
  !process.env.VERCEL &&
  !process.env.MONGODB_URI;

const nextConfig: NextConfig = {
  // The Srinagar destination was first published as "srinagarr"; keep that
  // already-indexed URL working.
  async redirects() {
    return [
      {
        source: "/destinations/srinagarr",
        destination: "/destinations/srinagar",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      ...(demoMode ? [{ protocol: "https" as const, hostname: "**" }] : []),
    ],
  },
};

export default nextConfig;
