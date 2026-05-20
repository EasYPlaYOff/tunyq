"use client"

import { useEffect, useState, useRef } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Eye, Zap } from "lucide-react"

// Generate chart data showing rising trend
const generateChartData = () => {
  const data = []
  const hours = 24
  for (let i = 0; i < hours; i++) {
    const baseValue = 20 + i * 2.5
    const noise = Math.random() * 10 - 5
    data.push({
      hour: `${i.toString().padStart(2, "0")}:00`,
      particles: Math.round(Math.max(0, baseValue + noise)),
    })
  }
  return data
}

const chartData = generateChartData()

interface Particle {
  id: number
  x: number
  y: number
  size: number
  type: string
  confidence: number
  hasDetection: boolean
  animationDelay: number
}

const particleTypes = ["PET", "PP", "PE", "PS"]

const generateParticles = (): Particle[] => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 15 + Math.random() * 70,
    size: 3 + Math.random() * 4,
    type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
    confidence: 92 + Math.floor(Math.random() * 8),
    hasDetection: i < 3,
    animationDelay: Math.random() * 3,
  }))
}

interface AIVisionWidgetProps {
  fullscreen?: boolean
}

export function AIVisionWidget({ fullscreen = false }: AIVisionWidgetProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setParticles(generateParticles())
  }, [])

  return (
    <div className="h-full flex flex-col bg-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-card/90">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center glow-neon-cyan">
              <Eye className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                AI Computer Vision Flow Analytics
              </h3>
              <p className="text-xs text-muted-foreground">
                Real-time microplastic detection
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-primary font-medium">Processing</span>
          </div>
        </div>
      </div>

      {/* Vision container */}
      <div className={`relative bg-gradient-to-b from-secondary/30 to-card/50 ${fullscreen ? "flex-1 min-h-[400px]" : "flex-1 min-h-[220px]"}`}>
        {/* Pipe simulation background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Pipe walls */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-border/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-border/50 to-transparent" />

          {/* Water flow effect */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "repeating-linear-gradient(90deg, transparent 0%, oklch(0.75 0.15 195 / 0.1) 25%, transparent 50%)",
              backgroundSize: "200% 100%",
              animation: "flow 3s linear infinite",
            }}
          />

          {/* Particles */}
          <div ref={canvasRef} className="absolute inset-0">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute animate-float-particle"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  animationDelay: `${particle.animationDelay}s`,
                  animationDuration: `${6 + particle.animationDelay}s`,
                }}
              >
                {/* Particle dot */}
                <div
                  className={`rounded-full ${
                    particle.hasDetection
                      ? "bg-primary shadow-[0_0_8px_2px_oklch(0.80_0.25_145/0.5)]"
                      : "bg-muted-foreground/50"
                  }`}
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                  }}
                />

                {/* Detection bounding box */}
                {particle.hasDetection && (
                  <div
                    className="absolute border border-primary rounded-sm"
                    style={{
                      left: `-${particle.size + 4}px`,
                      top: `-${particle.size + 4}px`,
                      width: `${particle.size * 2 + 8}px`,
                      height: `${particle.size * 2 + 8}px`,
                    }}
                  >
                    {/* Corner markers */}
                    <div className="absolute -top-px -left-px w-2 h-2 border-t-2 border-l-2 border-primary" />
                    <div className="absolute -top-px -right-px w-2 h-2 border-t-2 border-r-2 border-primary" />
                    <div className="absolute -bottom-px -left-px w-2 h-2 border-b-2 border-l-2 border-primary" />
                    <div className="absolute -bottom-px -right-px w-2 h-2 border-b-2 border-r-2 border-primary" />

                    {/* Label */}
                    <div
                      className="absolute -top-6 left-0 whitespace-nowrap px-1.5 py-0.5 rounded bg-primary/90 text-primary-foreground text-[9px] font-mono"
                      style={{ transform: "translateY(-2px)" }}
                    >
                      [Microplastic: {particle.type} | Size:{" "}
                      {Math.round(particle.size)}µm | Conf: {particle.confidence}
                      %]
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Scan line effect */}
          <div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60"
            style={{
              animation: "scan 2s ease-in-out infinite",
              top: "50%",
            }}
          />
        </div>

        {/* Overlay stats */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="px-2 py-1 rounded bg-card/80 backdrop-blur-sm border border-border">
            <span className="text-[10px] font-mono text-muted-foreground">
              DETECTION RATE:{" "}
              <span className="text-primary font-semibold">12.4/min</span>
            </span>
          </div>
          <div className="px-2 py-1 rounded bg-card/80 backdrop-blur-sm border border-border">
            <span className="text-[10px] font-mono text-muted-foreground">
              MODEL: <span className="text-accent font-semibold">YOLOv8-nano</span>
            </span>
          </div>
        </div>
      </div>

      {/* Chart section */}
      <div className="px-4 py-3 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-foreground">
            Polymer Particles Detected (24h)
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="text-primary font-semibold">+45%</span> from
            yesterday
          </p>
        </div>
        <div className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.25 0.03 250)"
                vertical={false}
              />
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 9, fill: "oklch(0.65 0.02 250)" }}
                axisLine={{ stroke: "oklch(0.25 0.03 250)" }}
                tickLine={false}
                interval={5}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "oklch(0.65 0.02 250)" }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.15 0.025 250)",
                  border: "1px solid oklch(0.25 0.03 250)",
                  borderRadius: "8px",
                  fontSize: "11px",
                }}
                labelStyle={{ color: "oklch(0.95 0.01 250)" }}
                itemStyle={{ color: "oklch(0.80 0.25 145)" }}
              />
              <Line
                type="monotone"
                dataKey="particles"
                stroke="oklch(0.80 0.25 145)"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "oklch(0.80 0.25 145)",
                  stroke: "oklch(0.12 0.02 250)",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <style jsx>{`
        @keyframes flow {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: 0 0;
          }
        }
        @keyframes scan {
          0%,
          100% {
            top: 10%;
            opacity: 0.3;
          }
          50% {
            top: 90%;
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  )
}
