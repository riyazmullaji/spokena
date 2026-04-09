import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import type React from "react"
import { Suspense } from "react"

import { getSiteUrl } from "@/lib/site"

import "./globals.css"

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const siteUrl = getSiteUrl()
const defaultTitle = "Spokena — Speaking skills that grow with practice"
const defaultDescription =
  "Build real speaking confidence with daily 60-second recordings and clear, focused AI feedback. No gimmicks, just consistent practice."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Spokena",
  },
  description: defaultDescription,
  applicationName: "Spokena",
  icons: {
    icon: [{ url: "/favicon.ico" }],
    shortcut: [{ url: "/favicon.ico" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Spokena",
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="fb30fd17-59da-40bc-bd6e-25bd7e95ffc6"
        />
      </head>
      <body className="font-body antialiased">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
