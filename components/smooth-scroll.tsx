"use client"

import { useEffect, type ReactNode } from "react"

interface SmoothScrollProps {
  children: ReactNode
  options?: {
    lerp?: number
    duration?: number
    smoothWheel?: boolean
  }
}

export function SmoothScroll({ children, options = {} }: SmoothScrollProps) {
  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null

    const init = async () => {
      const Lenis = (await import("lenis")).default
      lenis = new Lenis({
        lerp: options.lerp ?? 0.1,
        duration: options.duration ?? 1.2,
        smoothWheel: options.smoothWheel ?? true,
      })

      function raf(time: number) {
        lenis?.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    }

    init()

    return () => {
      lenis?.destroy()
    }
  }, [options.lerp, options.duration, options.smoothWheel])

  return <>{children}</>
}
