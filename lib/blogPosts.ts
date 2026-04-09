export type BlogSection = {
  heading: string
  paragraphs: string[]
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  publishedAt: string
  sections: BlogSection[]
}

/** Intent-led articles for organic search; keep titles aligned with real queries. */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "practice-spoken-english-online",
    title: "Practice spoken English online: what works (and what wastes time)",
    description:
      "How to practice spoken English online effectively—short sessions, real speaking, and feedback that helps you improve week over week.",
    publishedAt: "2026-01-15",
    sections: [
      {
        heading: "Why online speaking practice beats only reading or apps",
        paragraphs: [
          "Fluency is a speaking skill. Reading and vocabulary apps help, but they don’t train your mouth, breath, and rhythm under light pressure. Practicing spoken English online works when you actually speak out loud—not when you passively consume content.",
          "The best online routines are short, repeatable, and honest about what you need to fix: clarity, pace, and filler habits that creep in when you’re thinking on your feet.",
        ],
      },
      {
        heading: "What “good” online practice looks like",
        paragraphs: [
          "Aim for focused bursts: a clear prompt, a time limit (even 60 seconds), and one round of feedback you can act on next time. Consistency beats marathon sessions you never repeat.",
          "Record yourself when possible. Playback reveals what you don’t hear live: rushed endings, unclear transitions, and hedge words that dilute your point.",
        ],
      },
      {
        heading: "Common mistakes that stall progress",
        paragraphs: [
          "Only rehearsing scripted speeches. Real life is conversational—mix structured answers with improvised explanations.",
          "Chasing perfection before volume. Volume with light feedback compounds faster than rare “perfect” takes.",
        ],
      },
      {
        heading: "How Spokena fits this approach",
        paragraphs: [
          "Spokena is built around short speaking turns and clear feedback so you can practice spoken English online without building a complicated routine. Pick a topic, speak for up to a minute, and review what to improve next.",
        ],
      },
    ],
  },
  {
    slug: "ai-english-speaking-practice",
    title: "AI English speaking practice: how AI feedback helps (without replacing real conversation)",
    description:
      "Use AI for English speaking practice to get consistent, specific feedback on clarity, pace, and fillers—then apply it in real conversations.",
    publishedAt: "2026-01-18",
    sections: [
      {
        heading: "What AI can do well for speaking practice",
        paragraphs: [
          "AI English speaking practice shines when you want fast, repeatable feedback on how you sound on paper: sentence clarity, pacing, and patterns like filler words. It doesn’t get tired, so you can iterate daily.",
          "That makes it a strong complement to tutors or conversation partners—especially for busy schedules when booking humans isn’t realistic every day.",
        ],
      },
      {
        heading: "What to still do with people",
        paragraphs: [
          "Humans add rapport, culture, and unpredictable follow-up questions. Use AI to tighten your baseline clarity and confidence, then stress-test the same ideas in meetings, classes, or language exchanges.",
        ],
      },
      {
        heading: "A simple loop that works",
        paragraphs: [
          "Speak on a prompt, review feedback, re-record one improvement, then move on. Small loops beat long sessions you don’t repeat.",
        ],
      },
      {
        heading: "Try it with Spokena",
        paragraphs: [
          "Spokena focuses on short recordings and actionable feedback so your AI English speaking practice stays practical—not a gimmick.",
        ],
      },
    ],
  },
  {
    slug: "improve-english-for-interviews",
    title: "Improve English for interviews: answer clearly in 60 seconds",
    description:
      "Structure interview answers in English, reduce fillers, and practice out loud—so hiring managers hear confidence, not hesitation.",
    publishedAt: "2026-01-22",
    sections: [
      {
        heading: "Why interviews punish vague English",
        paragraphs: [
          "Interviewers listen for signal fast. Long setups, hedging, and unclear outcomes make you sound uncertain—even when you know your stuff. Improving English for interviews is partly vocabulary and partly structure.",
        ],
      },
      {
        heading: "Use a structure you can trust",
        paragraphs: [
          "STAR (Situation, Task, Action, Result) works for behavioral questions. For opinion prompts, PREP (Point, Reason, Example, Point) keeps you tight. Pick one framework and rehearse until it feels natural, not robotic.",
        ],
      },
      {
        heading: "Practice out loud, not only in your head",
        paragraphs: [
          "Silent rehearsal hides pacing problems. Speak answers aloud with a timer. If you can’t land a clean answer in 60–90 seconds, simplify the story until you can.",
        ],
      },
      {
        heading: "Measure improvement",
        paragraphs: [
          "Track clarity and filler trends over multiple sessions—not one perfect take. That’s how you know your English for interviews is actually improving under pressure.",
        ],
      },
      {
        heading: "Practice with Spokena",
        paragraphs: [
          "Use category prompts and short recordings to rehearse interview-style answers, then review feedback and iterate.",
        ],
      },
    ],
  },
  {
    slug: "daily-spoken-english-exercises",
    title: "Daily spoken English exercises: small habits that compound",
    description:
      "Build a sustainable daily English speaking habit—short exercises, clear prompts, and feedback so fluency improves without burnout.",
    publishedAt: "2026-01-25",
    sections: [
      {
        heading: "Why daily beats occasional marathons",
        paragraphs: [
          "Your mouth and brain need repetition. Short daily spoken English exercises beat one long session a week because they keep your activation high and your fear of speaking lower.",
        ],
      },
      {
        heading: "What to optimize for",
        paragraphs: [
          "Clarity first: can someone understand you without strain? Then pace: not too rushed, not too slow. Then fillers: fewer “um”s and hedges over time—not zero overnight.",
        ],
      },
      {
        heading: "A minimal routine",
        paragraphs: [
          "One prompt, one minute, one playback or feedback pass. Same time each day if possible—after coffee, before bed, between meetings. Consistency is the exercise.",
        ],
      },
      {
        heading: "Spokena as your daily drill",
        paragraphs: [
          "Spokena is designed for daily practice: topics, short recordings, and streak-friendly progress you can see over time.",
        ],
      },
    ],
  },
  {
    slug: "english-fluency-practice-for-students",
    title: "English fluency practice for students: exams, presentations, and real conversations",
    description:
      "Balance exam English with real fluency—practice speaking for presentations, group discussions, and daily campus life.",
    publishedAt: "2026-01-28",
    sections: [
      {
        heading: "Two different skills: exam English and spoken fluency",
        paragraphs: [
          "Students often ace written tests but freeze in presentations. Fluency practice for students should include timed speaking, not only grammar drills—because professors and peers judge you in real time.",
        ],
      },
      {
        heading: "Low-stakes reps",
        paragraphs: [
          "Practice in small safe doses: explain a concept from class, summarize a reading, or argue one side of a debate in 60 seconds. Low stakes reduce perfectionism and build speed.",
        ],
      },
      {
        heading: "Presentations and group discussions",
        paragraphs: [
          "For slides, practice transitions: “Here’s the key point—here’s why it matters—here’s what we should do.” For discussions, practice agreeing, disagreeing politely, and asking clarifying questions without rambling.",
        ],
      },
      {
        heading: "Use Spokena alongside coursework",
        paragraphs: [
          "Spokena gives you prompts and feedback between classes so English fluency practice for students fits a packed schedule.",
        ],
      },
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug)
}
