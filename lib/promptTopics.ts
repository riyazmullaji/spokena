export type PromptCategoryId =
  | "random"
  | "general"
  | "tech"
  | "finance"
  | "leadership"
  | "public_speaking"
  | "executive"
  | "interviews"

export const PROMPT_CATEGORIES: {
  id: PromptCategoryId
  label: string
  description: string
}[] = [
  { id: "random", label: "Random", description: "Surprise prompts across all areas" },
  { id: "general", label: "General", description: "Everyday ideas and reflection" },
  { id: "tech", label: "Tech & product", description: "Builders, PMs, and technical leaders" },
  { id: "finance", label: "Finance & business", description: "Markets, strategy, and decisions" },
  { id: "leadership", label: "Leadership", description: "Teams, trust, and direction" },
  { id: "public_speaking", label: "Public speaking", description: "Stage, stories, and presence" },
  { id: "executive", label: "Executive presence", description: "Boards, clarity, and gravitas" },
  { id: "interviews", label: "Interviews & media", description: "Q&A, podcasts, and panels" },
]

const TOPICS: Record<Exclude<PromptCategoryId, "random">, string[]> = {
  general: [
    "What is one habit you are trying to build this quarter, and why?",
    "Describe a decision you are proud of and what you learned from it.",
    "Explain something you changed your mind about in the last year.",
    "What does a good day at work look like for you?",
    "Share a mistake that taught you more than a success did.",
    "How do you recharge when your schedule is packed?",
    "What topic could you talk about for an hour without notes?",
    "Describe a person who changed how you think.",
    "What problem in the world do you wish more people understood?",
    "What is something you are optimistic about right now?",
    "How do you handle disagreement while staying respectful?",
    "What is a small win from this week worth celebrating?",
  ],
  tech: [
    "Explain a technical tradeoff your team made recently.",
    "How do you decide when to ship versus when to polish?",
    "Describe how you would explain APIs to a non-technical executive.",
    "What is one thing users misunderstand about your product?",
    "How do you prioritize bugs versus new features?",
    "What would you improve about your team's development process?",
    "Explain a time data changed your product decision.",
    "How do you think about security versus speed in shipping?",
    "Describe a feature you killed and why it was the right call.",
    "What trend in tech are you skeptical about, and why?",
    "How do you communicate delays to stakeholders?",
    "What is your framework for technical debt?",
  ],
  finance: [
    "Explain a financial metric you watch closely and why it matters.",
    "How do you think about risk versus reward in investing or budgeting?",
    "Describe a market shift you are paying attention to.",
    "What is one lesson from a past financial mistake?",
    "How would you explain inflation to someone new to finance?",
    "What does a healthy balance sheet mean in your context?",
    "Describe a deal or negotiation you learned from.",
    "How do you evaluate a new business opportunity?",
    "What is your take on diversification versus concentration?",
    "Explain how interest rates affect decisions in your world.",
    "What is a common finance myth you like to correct?",
    "How do you communicate financial results to non-finance audiences?",
  ],
  leadership: [
    "How do you build trust on a new team?",
    "Describe a time you had to give hard feedback.",
    "What is your approach to delegation?",
    "How do you keep remote teams aligned?",
    "What do you do when two strong leaders disagree?",
    "How do you measure whether your team is healthy?",
    "Describe a moment you had to lead without authority.",
    "What is one leadership principle you try to model daily?",
    "How do you handle underperformance compassionately?",
    "What do you wish you had known earlier as a leader?",
    "How do you celebrate wins without slowing momentum?",
    "What is your framework for one-on-one conversations?",
  ],
  public_speaking: [
    "Tell a 60-second story with a clear beginning, middle, and end.",
    "Explain your main idea as if the audience has only 30 seconds.",
    "Describe how you calm nerves before speaking in front of others.",
    "What is a talk title you would love to give someday?",
    "How do you open a presentation so people lean in?",
    "What is a common speaking habit you are working to improve?",
    "Describe a time you recovered after losing the room.",
    "How do you use pauses effectively?",
    "What is your approach to Q&A when you do not know the answer?",
    "How do you adapt your message for different audiences?",
    "What makes a memorable closing line?",
    "How do you practice without sounding rehearsed?",
  ],
  executive: [
    "State your top priority this quarter in one sentence and defend it.",
    "How do you communicate strategy so teams can act on it?",
    "Describe a tough prioritization call you made recently.",
    "What does accountability look like on your leadership team?",
    "How do you stay grounded when the news cycle is noisy?",
    "What is one board-level question you wish more leaders asked?",
    "How do you balance short-term pressure with long-term bets?",
    "Describe how you handle public criticism of your organization.",
    "What is your framework for hiring executives?",
    "How do you decide what not to do?",
    "What signal tells you a culture is drifting off course?",
    "How do you communicate bad news without crushing morale?",
  ],
  interviews: [
    "Answer: Tell me about yourself — in 45 seconds.",
    "Describe a conflict you navigated professionally.",
    "What is your greatest strength, with a concrete example?",
    "Describe a time you failed and what you changed afterward.",
    "Why do you want this role, in one honest paragraph?",
    "How do you answer salary or compensation questions?",
    "Describe a time you influenced someone without authority.",
    "What questions do you ask interviewers to assess fit?",
    "How do you explain a gap or transition in your career?",
    "Tell me about a project you led end to end.",
    "How do you close an interview on a strong note?",
    "Describe your leadership style in three words and unpack them.",
  ],
}

export function getTopicsForCategory(category: PromptCategoryId): string[] {
  if (category === "random") {
    const all = (Object.keys(TOPICS) as Exclude<PromptCategoryId, "random">[]).flatMap(
      (k) => TOPICS[k]
    )
    return all
  }
  return TOPICS[category]
}

export function pickRandomTopic(category: PromptCategoryId, exclude?: string): string {
  const pool = getTopicsForCategory(category)
  const candidates = exclude ? pool.filter((t) => t !== exclude) : pool
  if (candidates.length === 0) return pool[0] ?? "Speak freely for one minute about your day."
  return candidates[Math.floor(Math.random() * candidates.length)]
}
