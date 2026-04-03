import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to Spokena and build speaking confidence with daily practice and AI feedback.",
}

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children
}
