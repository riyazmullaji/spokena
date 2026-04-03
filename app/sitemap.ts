import type { MetadataRoute } from "next"

import { getSiteUrl } from "@/lib/site"

/** Public URLs to help Google discover your marketing and auth pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const now = new Date()

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/login`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]
}
