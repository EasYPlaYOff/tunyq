"use client"

import { Activity, Radio, PiggyBank } from "lucide-react"

const metrics = [
  {
    icon: Activity,
    label: "Active Monitoring Points",
    value: "150",
    subtext: "sensors online",
    color: "primary",
    glowClass: "glow-neon-green",
  },
  {
    icon: Radio,
    label: "System Status",
    value: "24/7 Active Scan",
    subtext: "all systems operational",
    color: "primary",
    glowClass: "glow-neon-green",
    showPulse: true,
  },
  {
    icon: PiggyBank,
    label: "Estimated Budget Saved",
    value: "90%",
    subtext: "compared to standard lab tests",
    color: "accent",
    glowClass: "glow-neon-cyan",
  },
]

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="relative bg-card rounded-xl border border-border p-5 overflow-hidden group hover:border-primary/50 transition-all duration-300"
        >
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">
                {metric.label}
              </p>
              <div className="flex items-center gap-2">
                {metric.showPulse && (
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse-glow" />
                )}
                <p
                  className={`text-2xl font-bold text-glow-green ${
                    metric.color === "primary"
                      ? "text-primary"
                      : "text-accent"
                  }`}
                >
                  {metric.value}
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {metric.subtext}
              </p>
            </div>
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${metric.glowClass} ${
                metric.color === "primary"
                  ? "bg-primary/15 text-primary"
                  : "bg-accent/15 text-accent"
              }`}
            >
              <metric.icon className="w-6 h-6" />
            </div>
          </div>

          {/* Bottom accent line */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-0.5 ${
              metric.color === "primary" ? "bg-primary/50" : "bg-accent/50"
            }`}
          />
        </div>
      ))}
    </div>
  )
}
