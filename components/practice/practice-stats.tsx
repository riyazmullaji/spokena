"use client"

import { refreshUserStreak } from "@/lib/streakService"
import { createClientComponentClient } from "@/lib/supabaseClient"
import { Flame, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

type Props = {
  userId: string
  /** Increment after a successful analyze so streak / session counts refetch */
  statsRefreshKey?: number
}

export function PracticeStats({ userId, statsRefreshKey = 0 }: Props) {
  const [streak, setStreak] = useState<number | null>(null)
  const [sessionsThisWeek, setSessionsThisWeek] = useState<number | null>(null)
  const [lastClarity, setLastClarity] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    const supabase = createClientComponentClient()

    async function load() {
      const streak = await refreshUserStreak(supabase, userId)
      if (cancelled) return
      setStreak(streak)

      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)

      const [{ count: weekCount }, sessionsRes] = await Promise.all([
        supabase
          .from("sessions")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId)
          .gte("created_at", weekAgo.toISOString()),
        supabase
          .from("sessions")
          .select("id")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(30),
      ])

      if (cancelled) return

      setSessionsThisWeek(weekCount ?? 0)

      const ids = sessionsRes.data?.map((s) => s.id) ?? []
      if (ids.length === 0) {
        setLastClarity(null)
        return
      }

      const { data: latest } = await supabase
        .from("analyses")
        .select("analysis_json")
        .in("session_id", ids)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()

      if (cancelled) return

      const aj = latest?.analysis_json as
        | { calculated_metrics?: { clarity_score?: number }; clarity_score?: number }
        | undefined
      const clarity =
        aj?.calculated_metrics?.clarity_score ??
        (typeof aj?.clarity_score === "number" ? aj.clarity_score : null)
      setLastClarity(typeof clarity === "number" ? clarity : null)
    }

    load().catch(() => {
      if (!cancelled) {
        setStreak(0)
        setSessionsThisWeek(0)
        setLastClarity(null)
      }
    })

    return () => {
      cancelled = true
    }
  }, [userId, statsRefreshKey])

  return (
    <div className="flex flex-wrap gap-2 text-sm sm:gap-3 lg:justify-end">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-foreground">
        <Flame className="h-4 w-4 text-orange-500" aria-hidden />
        <span className="font-medium tabular-nums">{streak ?? "—"}</span>
        <span className="text-muted-foreground">day streak</span>
      </div>
      <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-foreground">
        <span className="font-medium tabular-nums">{sessionsThisWeek ?? "—"}</span>
        <span className="text-muted-foreground">sessions (7d)</span>
      </div>
      {lastClarity != null && (
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-foreground">
          <TrendingUp className="h-4 w-4 text-primary" aria-hidden />
          <span className="text-muted-foreground">Last clarity</span>
          <span className="font-medium tabular-nums">{lastClarity}%</span>
        </div>
      )}
    </div>
  )
}
