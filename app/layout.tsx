import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import type React from "react"
import { Suspense } from "react"
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

export const metadata: Metadata = {
  title: "Spokena - Speaking skills that grow with practice",
  description:
    "Build real speaking confidence with daily 60-second recordings and clear, focused AI feedback. No gimmicks, just consistent practice.",
  generator: "v0.app",
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
