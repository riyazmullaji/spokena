"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { createClientComponentClient } from "@/lib/supabaseClient"
import { cn } from "@/lib/utils"
import { MessageCircleHeart } from "lucide-react"
import { useState } from "react"

const FEEDBACK_TYPES = [
  "Report a bug",
  "Feature Request",
  "User Experience Feedback",
  "Others",
] as const

const SUPPORT_EMAIL = "spokena.app@gmail.com"

interface FeedbackFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId: string
}

export function FeedbackFormDialog({
  open,
  onOpenChange,
  userId,
}: FeedbackFormDialogProps) {
  const [feedbackType, setFeedbackType] = useState<string>("Report a bug")
  const [details, setDetails] = useState("")
  const [requestFollowUp, setRequestFollowUp] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  )
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!details.trim()) {
      setErrorMessage("Please provide more details.")
      return
    }
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage(null)

    try {
      const content = JSON.stringify({
        type: feedbackType,
        details: details.trim(),
        request_follow_up: requestFollowUp,
      })

      const { error } = await supabase.from("feedback").insert({
        user_id: userId,
        content,
      })

      if (error) throw error
      setSubmitStatus("success")
      setDetails("")
      setFeedbackType("Report a bug")
      setRequestFollowUp(true)
      setTimeout(() => onOpenChange(false), 1500)
    } catch (err: unknown) {
      setSubmitStatus("error")
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to submit feedback."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenChange = (next: boolean) => {
    if (!next && submitStatus === "success") {
      setSubmitStatus("idle")
    }
    onOpenChange(next)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader className="text-left">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MessageCircleHeart className="h-5 w-5" />
            </div>
            <DialogTitle className="text-xl">Feedback and Support</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              What would you like to tell us?
            </h4>
            <div className="space-y-2">
              {FEEDBACK_TYPES.map((type) => (
                <label
                  key={type}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border border-border px-3 py-2.5 cursor-pointer transition-colors hover:bg-muted/50",
                    feedbackType === type && "border-primary bg-primary/5"
                  )}
                >
                  <input
                    type="radio"
                    name="feedbackType"
                    value={type}
                    checked={feedbackType === type}
                    onChange={() => setFeedbackType(type)}
                    className="h-4 w-4 border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-foreground">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">
              Please give us more details
            </h4>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Please describe your experience or share your ideas. The more specific they are the better we can address your feedback."
              rows={4}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 resize-y min-h-[100px]"
              disabled={isSubmitting}
            />
          </div>

          <p className="text-center text-sm text-muted-foreground">or</p>
          <p className="text-center text-sm text-muted-foreground">
            mail us at{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-primary underline underline-offset-2 hover:no-underline"
            >
              {SUPPORT_EMAIL}
            </a>
          </p>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={requestFollowUp}
              onChange={(e) => setRequestFollowUp(e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              disabled={isSubmitting}
            />
            <span className="text-sm text-foreground">
              I would like to receive follow-up support via email
            </span>
          </label>

          {submitStatus === "success" && (
            <p className="text-sm text-primary font-medium">
              Thank you! Your feedback has been submitted.
            </p>
          )}
          {submitStatus === "error" && errorMessage && (
            <p className="text-sm text-destructive">{errorMessage}</p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
