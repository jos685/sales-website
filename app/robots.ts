import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://sales-tracker-lovat.vercel.app/sitemap.xml",
    host: "https://sales-tracker-lovat.vercel.app",
  };
}
