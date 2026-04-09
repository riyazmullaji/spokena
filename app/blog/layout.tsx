import { Navigation } from "@/components/navigation"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical guides on spoken English practice, AI feedback, interviews, daily exercises, and fluency for students.",
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
}
