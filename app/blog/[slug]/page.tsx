import { BlogCta } from "@/components/blog/blog-cta"
import { Footer } from "@/components/footer"
import { BLOG_POSTS, getPostBySlug } from "@/lib/blogPosts"
import { getSiteUrl } from "@/lib/site"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) {
    return {}
  }

  const base = getSiteUrl()
  const url = `${base}/blog/${post.slug}`

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: `${post.publishedAt}T12:00:00.000Z`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const base = getSiteUrl()
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: `${post.publishedAt}T12:00:00.000Z`,
    author: { "@type": "Organization", name: "Spokena" },
    publisher: { "@type": "Organization", name: "Spokena" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${base}/blog/${post.slug}` },
  }

  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p className="text-sm text-muted-foreground">
          <Link href="/blog" className="text-primary hover:underline">
            Blog
          </Link>
          <span className="mx-2 text-border">/</span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt + "T12:00:00Z").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </p>
        <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>

        <div className="prose-article mt-10 space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
