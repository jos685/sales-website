import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "elctrlrktzhhnuqufynh.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // Next.js 15: allow cross-origin requests in dev (tunnels, ngrok,
  // cloudflare, LAN devices, etc.). Only takes effect when running
  // `next dev` — production is unaffected.
  // allowedDevOrigins: [
  //   "hughes-detector-accounts-guild.trycloudflare.com",
  // ],
};

export default nextConfig;