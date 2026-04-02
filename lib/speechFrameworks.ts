import { cn } from "@/lib/utils"

export type SpeechFrameworkId = "prep" | "star" | "what_so_now" | "problem_proof_action"

export type SpeechFrameworkStep = {
  key: string
  detail: string
}

export type SpeechFramework = {
  id: SpeechFrameworkId
  /** Short label for pills */
  shortLabel: string
  title: string
  tagline: string
  steps: SpeechFrameworkStep[]
}

export const SPEECH_FRAMEWORKS: SpeechFramework[] = [
  {
    id: "prep",
    shortLabel: "PREP",
    title: "PREP",
    tagline: "One clear point, fast — great for opinions and updates.",
    steps: [
      { key: "Point", detail: "Your one main idea in a single sentence." },
      { key: "Reason", detail: "Why it matters to you or your audience." },
      { key: "Example", detail: "A short story or fact that backs it up." },
      { key: "Point", detail: "Restate your idea so it lands." },
    ],
  },
  {
    id: "star",
    shortLabel: "STAR",
    tagline: "Behavioral stories — interviews, reviews, and examples.",
    steps: [
      { key: "Situation", detail: "Set the scene in one or two sentences." },
      { key: "Task", detail: "What was expected of you or the team?" },
      { key: "Action", detail: "What you actually did (be specific)." },
      { key: "Result", detail: "Outcome and what you learned." },
    ],
  },
  {
    id: "what_so_now",
    shortLabel: "What–So–Now",
    tagline: "Executive rhythm — context, stakes, and next step.",
    steps: [
      { key: "What", detail: "State the fact or situation plainly." },
      { key: "So what", detail: "Why should anyone care? Impact or risk." },
      { key: "Now what", detail: "Decision, ask, or clear next move." },
    ],
  },
  {
    id: "problem_proof_action",
    shortLabel: "Problem–Proof–Ask",
    tagline: "Short pitches — align the room and close with an ask.",
    steps: [
      { key: "Problem", detail: "Name the tension or gap in one line." },
      { key: "Proof", detail: "One proof point — metric, story, or precedent." },
      { key: "Ask", detail: "What you want from the listener right now." },
    ],
  },
]

export function frameworkPillClass(active: boolean) {
  return cn(
    "rounded-full border px-3 py-1.5 text-left text-xs font-medium transition-colors",
    active
      ? "border-primary bg-primary/10 text-primary shadow-xs"
      : "border-border bg-muted/30 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
  )
}
