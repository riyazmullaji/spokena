import { Footer } from "@/components/footer"
import { BLOG_POSTS } from "@/lib/blogPosts"
import { getSiteUrl } from "@/lib/site"
import type { Metadata } from "next"
import Link from "next/link"

const base = getSiteUrl()

export const metadata: Metadata = {
  title: "Blog — spoken English tips & practice ideas",
  description:
    "Learn how to practice spoken English online, use AI feedback well, prepare for interviews, build daily habits, and improve fluency as a student.",
  alternates: { canonical: "/blog" },
  openGraph: {
    url: `${base}/blog`,
    title: "Spokena Blog — spoken English tips & practice ideas",
    description:
      "Practical articles on spoken English practice, AI feedback, interviews, daily exercises, and student fluency.",
  },
}

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <p className="text-sm font-medium uppercase tracking-wide text-primary">Blog</p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Speak better English—with habits that stick
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Short guides aligned with how people actually search: online practice, AI feedback, interviews, daily drills,
          and student life.
        </p>

        <ul className="mt-12 space-y-0 divide-y divide-border border-t border-border">
          {BLOG_POSTS.map((post) => (
            <li key={post.slug} className="py-8 first:pt-8">
              <article>
                <time
                  dateTime={post.publishedAt}
                  className="text-xs font-medium text-muted-foreground"
                >
                  {new Date(post.publishedAt + "T12:00:00Z").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="mt-2 font-heading text-xl font-semibold text-foreground sm:text-2xl">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-muted-foreground">{post.description}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
                >
                  Read article →
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </main>
  )
}
