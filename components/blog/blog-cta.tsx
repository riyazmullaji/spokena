import { Button } from "@/components/ui/button"
import Link from "next/link"

export function BlogCta() {
  return (
    <div className="mt-12 rounded-xl border border-border bg-muted/30 p-6 text-center sm:p-8">
      <p className="font-heading text-lg font-semibold text-foreground">Ready to speak with feedback?</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Short recordings, clear AI feedback, and a daily habit you can keep.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/login">Start free</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/practice">Open Practice</Link>
        </Button>
      </div>
    </div>
  )
}
