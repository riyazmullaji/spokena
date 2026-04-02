"use client"

import Lottie from "lottie-react"
import { useEffect, useState } from "react"

/** Calm, minimal loading animation (LottieFiles-style wave / sound). Loaded from CDN to avoid bloating the repo. */
const DEFAULT_ANIMATION_URL =
  "https://assets2.lottiefiles.com/packages/lf20_u2yrwq.json"

type Props = {
  className?: string
}

export function AnalyzeLoadingAnimation({ className }: Props) {
  const [data, setData] = useState<object | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(DEFAULT_ANIMATION_URL)
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled) setData(json)
      })
      .catch(() => {
        if (!cancelled) setData(null)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (!data) {
    return (
      <div
        className={`flex h-40 w-full items-center justify-center ${className ?? ""}`}
        aria-hidden
      >
        <div className="h-12 w-12 animate-pulse rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className={`mx-auto max-w-[220px] ${className ?? ""}`}>
      <Lottie animationData={data} loop className="w-full" />
    </div>
  )
}
