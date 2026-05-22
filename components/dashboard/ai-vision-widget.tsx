"use client"

import { useEffect, useState, useRef, useCallback } from "react"
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
  speed: number
  opacity: number
}

const particleTypes = ["PET", "PP", "PE", "PS"]

interface AIVisionWidgetProps {
  fullscreen?: boolean
}

export function AIVisionWidget({ fullscreen = false }: AIVisionWidgetProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [detectionCount, setDetectionCount] = useState(0)
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const particleIdRef = useRef(0)

  // Create a new particle at the top
  const createParticle = useCallback((): Particle => {
    const hasDetection = Math.random() < 0.25 // 25% chance of detection
    return {
      id: particleIdRef.current++,
      x: 5 + Math.random() * 90,
      y: -5,
      size: 3 + Math.random() * 5,
      type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
      confidence: 92 + Math.floor(Math.random() * 8),
      hasDetection,
      speed: 0.3 + Math.random() * 0.4,
      opacity: 0.6 + Math.random() * 0.4,
    }
  }, [])

  // Initialize particles
  useEffect(() => {
    const initialParticles: Particle[] = []
    for (let i = 0; i < 15; i++) {
      const p = createParticle()
      p.y = Math.random() * 100 // Spread across the container
      initialParticles.push(p)
    }
    setParticles(initialParticles)
  }, [createParticle])

  // Animation loop
  useEffect(() => {
    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime
      const deltaTime = currentTime - lastTimeRef.current
      lastTimeRef.current = currentTime

      setParticles((prevParticles) => {
        let newDetections = 0
        const updated = prevParticles
          .map((particle) => {
            const newY = particle.y + particle.speed * (deltaTime / 16)
            
            // Count new detections when particle crosses middle
            if (particle.hasDetection && particle.y < 50 && newY >= 50) {
              newDetections++
            }

            return {
              ...particle,
              y: newY,
            }
          })
          .filter((p) => p.y < 110) // Remove particles that left the container

        // Add new particles periodically
        if (updated.length < 18 && Math.random() < 0.1) {
          updated.push(createParticle())
        }

        if (newDetections > 0) {
          setDetectionCount((prev) => prev + newDetections)
        }

        return updated
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [createParticle])

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
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-primary font-medium">Live Processing</span>
          </div>
        </div>
      </div>

      {/* Vision container */}
      <div
        className={`relative bg-gradient-to-b from-secondary/30 to-card/50 ${
          fullscreen ? "flex-1 min-h-[400px]" : "flex-1 min-h-[220px]"
        }`}
      >
        {/* Pipe simulation background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Pipe walls */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-border/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-border/50 to-transparent" />

          {/* Water flow effect */}
          <div className="absolute inset-0 opacity-20 water-flow" />

          {/* Animated particles */}
          <div className="absolute inset-0">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute transition-none"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  transform: "translate(-50%, -50%)",
                  opacity: particle.opacity,
                }}
              >
                {/* Particle dot */}
                <div
                  className={`rounded-full transition-all duration-300 ${
                    particle.hasDetection
                      ? "bg-primary shadow-[0_0_12px_3px_oklch(0.80_0.25_145/0.6)]"
                      : "bg-muted-foreground/40"
                  }`}
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                  }}
                />

                {/* Detection bounding box - appears with animation */}
                {particle.hasDetection && (
                  <div
                    className="absolute border-2 border-primary rounded-sm animate-detection-box"
                    style={{
                      left: `${-particle.size - 6}px`,
                      top: `${-particle.size - 6}px`,
                      width: `${particle.size * 2 + 12}px`,
                      height: `${particle.size * 2 + 12}px`,
                    }}
                  >
                    {/* Corner markers */}
                    <div className="absolute -top-px -left-px w-2.5 h-2.5 border-t-2 border-l-2 border-primary" />
                    <div className="absolute -top-px -right-px w-2.5 h-2.5 border-t-2 border-r-2 border-primary" />
                    <div className="absolute -bottom-px -left-px w-2.5 h-2.5 border-b-2 border-l-2 border-primary" />
                    <div className="absolute -bottom-px -right-px w-2.5 h-2.5 border-b-2 border-r-2 border-primary" />

                    {/* Label */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-primary/95 text-primary-foreground text-[9px] font-mono shadow-lg">
                      [Microplastic: {particle.type} | Size:{" "}
                      {Math.round(particle.size)}µm | Conf: {particle.confidence}%]
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Scan line effect */}
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60 scan-line" />
        </div>

        {/* Overlay stats */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="px-2 py-1 rounded bg-card/80 backdrop-blur-sm border border-border">
            <span className="text-[10px] font-mono text-muted-foreground">
              DETECTED:{" "}
              <span className="text-primary font-semibold tabular-nums">
                {detectionCount}
              </span>{" "}
              particles
            </span>
          </div>
          <div className="px-2 py-1 rounded bg-card/80 backdrop-blur-sm border border-border">
            <span className="text-[10px] font-mono text-muted-foreground">
              MODEL:{" "}
              <span className="text-accent font-semibold">YOLOv8-nano</span>
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
        .water-flow {
          background: repeating-linear-gradient(
            180deg,
            transparent 0%,
            oklch(0.75 0.15 195 / 0.08) 25%,
            transparent 50%
          );
          background-size: 100% 40px;
          animation: water-flow 1.5s linear infinite;
        }

        @keyframes water-flow {
          0% {
            background-position: 0 -40px;
          }
          100% {
            background-position: 0 0;
          }
        }

        .scan-line {
          animation: scan 2.5s ease-in-out infinite;
        }

        @keyframes scan {
          0%,
          100% {
            top: 5%;
            opacity: 0.3;
          }
          50% {
            top: 95%;
            opacity: 0.8;
          }
        }

        .animate-detection-box {
          animation: detection-pulse 1.5s ease-in-out infinite;
        }

        @keyframes detection-pulse {
          0%,
          100% {
            box-shadow: 0 0 4px 1px oklch(0.80 0.25 145 / 0.4);
          }
          50% {
            box-shadow: 0 0 12px 3px oklch(0.80 0.25 145 / 0.7);
          }
        }
      `}</style>
    </div>
  )
}
