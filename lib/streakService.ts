import type { SupabaseClient } from "@supabase/supabase-js"

/** UTC calendar date YYYY-MM-DD */
export function toUtcDateString(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function addUtcDays(dateStr: string, delta: number): string {
  const d = new Date(`${dateStr}T12:00:00.000Z`)
  d.setUTCDate(d.getUTCDate() + delta)
  return toUtcDateString(d)
}

function prevUtcDay(dateStr: string): string {
  return addUtcDays(dateStr, -1)
}

/**
 * Consecutive calendar days (UTC) with at least one session, anchored at the most recent
 * activity day (today or yesterday if today is still empty).
 */
export function computeStreakFromUtcDates(sessionDates: Set<string>): number {
  const today = toUtcDateString(new Date())
  const yesterday = addUtcDays(today, -1)

  let start = today
  if (!sessionDates.has(today)) {
    if (sessionDates.has(yesterday)) {
      start = yesterday
    } else {
      return 0
    }
  }

  let count = 0
  let d = start
  while (sessionDates.has(d)) {
    count++
    d = prevUtcDay(d)
  }
  return count
}

/**
 * Recomputes streak from `sessions`, writes `users.current_streak`, returns the new value.
 */
export async function refreshUserStreak(
  supabase: SupabaseClient,
  userId: string
): Promise<number> {
  const since = new Date()
  since.setUTCDate(since.getUTCDate() - 400)

  const { data, error } = await supabase
    .from("sessions")
    .select("created_at")
    .eq("user_id", userId)
    .gte("created_at", since.toISOString())

  if (error) {
    console.error("refreshUserStreak: sessions query failed", error)
    return 0
  }

  const dates = new Set<string>()
  for (const row of data ?? []) {
    if (row.created_at) {
      dates.add(toUtcDateString(new Date(row.created_at)))
    }
  }

  const streak = computeStreakFromUtcDates(dates)

  const { error: upErr } = await supabase.from("users").update({ current_streak: streak }).eq("id", userId)

  if (upErr) {
    console.error("refreshUserStreak: users update failed", upErr)
    return streak
  }

  return streak
}
