/**
 * Canonical site URL for sitemaps, Open Graph, and metadataBase.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.spokena.site).
 * Vercel sets VERCEL_URL automatically as a fallback.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicit) return explicit.replace(/\/$/, "")

  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "")
    return `https://${host}`
  }

  return "http://localhost:3000"
}
