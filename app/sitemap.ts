import type { MetadataRoute } from "next"

import { BLOG_POSTS } from "@/lib/blogPosts"
import { getSiteUrl } from "@/lib/site"

/** Public URLs to help Google discover your marketing and auth pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const now = new Date()

  const blogEntries: MetadataRoute.Sitemap = [
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...BLOG_POSTS.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ]

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
    ...blogEntries,
  ]
}
