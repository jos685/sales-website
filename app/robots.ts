import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.qashup.co.ke/sitemap.xml",
    host: "https://www.qashup.co.ke/",
  };
}
