import { Card, CardContent } from "@/components/ui/card"
import { Check, X, HelpCircle } from "lucide-react"

const comparisonRows = [
  {
    feature: "Daily micro-practice (60 seconds)",
    spokena: true,
    others: false,
    othersLabel: null,
    tooltip: true,
  },
  {
    feature: "AI feedback on every recording",
    spokena: true,
    others: "limited",
    othersLabel: "Limited",
    tooltip: true,
  },
  {
    feature: "Filler word detection",
    spokena: true,
    others: "limited",
    othersLabel: "Limited",
    tooltip: false,
  },
  {
    feature: "Progress tracking over time",
    spokena: true,
    others: true,
    othersLabel: null,
    tooltip: false,
  },
  {
    feature: "Speaking prompts library",
    spokena: true,
    others: true,
    othersLabel: null,
    tooltip: false,
  },
]

export function WhyChooseSection() {
  return (
    <section id="why-choose" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
          Why learners choose Spokena
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12">
          We built Spokena to be different from typical language apps. Here&apos;s how we compare.
        </p>

        <Card className="rounded-[var(--radius)] border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Feature
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-primary">
                    Spokena
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                    Others
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={
                      i % 2 === 1
                        ? "bg-secondary/30 border-b border-border"
                        : "border-b border-border"
                    }
                  >
                    <td className="py-4 px-6 text-sm text-foreground">
                      <span className="inline-flex items-center gap-2">
                        {row.feature}
                        {row.tooltip && (
                          <button
                            type="button"
                            className="text-muted-foreground hover:text-foreground"
                            aria-label="More info"
                          >
                            <HelpCircle className="h-4 w-4" />
                          </button>
                        )}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {row.spokena === true ? (
                        <Check className="h-5 w-5 text-primary" />
                      ) : null}
                    </td>
                    <td className="py-4 px-6">
                      {row.others === true ? (
                        <Check className="h-5 w-5 text-primary" />
                      ) : row.othersLabel ? (
                        <span className="text-sm text-muted-foreground">{row.othersLabel}</span>
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  )
}
