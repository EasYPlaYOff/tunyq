"use client"

import { useState } from "react"
import { MapPin, X, AlertTriangle } from "lucide-react"

interface SensorPin {
  id: string
  name: string
  lat: number
  lng: number
  status: "normal" | "warning" | "alert"
  message?: string
}

const sensorPins: SensorPin[] = [
  {
    id: "1",
    name: "Sensor #07",
    lat: 35,
    lng: 25,
    status: "normal",
    message: "Water quality: Excellent",
  },
  {
    id: "2",
    name: "Sensor #12",
    lat: 55,
    lng: 65,
    status: "alert",
    message: "Alert: High Polymer Concentration",
  },
  {
    id: "3",
    name: "Sensor #23",
    lat: 70,
    lng: 40,
    status: "normal",
    message: "Water quality: Good",
  },
  {
    id: "4",
    name: "Sensor #31",
    lat: 25,
    lng: 75,
    status: "warning",
    message: "Alert: High Microplastic Concentration detected by AI",
  },
  {
    id: "5",
    name: "Sensor #45",
    lat: 80,
    lng: 20,
    status: "normal",
    message: "Water quality: Excellent",
  },
]

interface AstanaMapProps {
  fullscreen?: boolean
}

export function AstanaMap({ fullscreen = false }: AstanaMapProps) {
  const [selectedPin, setSelectedPin] = useState<SensorPin | null>(null)

  return (
    <div className="relative h-full bg-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-card/90 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Astana City — Live Sensor Map
            </h3>
            <p className="text-xs text-muted-foreground">
              Real-time monitoring across 150 locations
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-muted-foreground">Normal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="text-muted-foreground">Warning</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              <span className="text-muted-foreground">Alert</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map visualization */}
      <div className="relative w-full h-full min-h-[400px] bg-gradient-to-br from-secondary/50 via-card to-secondary/30">
        {/* Stylized city map background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={i}>
              <line
                x1={i * 10}
                y1="0"
                x2={i * 10}
                y2="100"
                stroke="currentColor"
                strokeWidth="0.1"
                className="text-border"
              />
              <line
                x1="0"
                y1={i * 10}
                x2="100"
                y2={i * 10}
                stroke="currentColor"
                strokeWidth="0.1"
                className="text-border"
              />
            </g>
          ))}

          {/* River representation */}
          <path
            d="M 0 45 Q 25 50 50 40 T 100 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-accent/30"
          />
          <path
            d="M 0 48 Q 25 53 50 43 T 100 53"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-accent/20"
          />

          {/* Main roads */}
          <path
            d="M 10 0 L 10 100"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-muted-foreground/20"
          />
          <path
            d="M 50 0 L 50 100"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-muted-foreground/20"
          />
          <path
            d="M 0 30 L 100 30"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-muted-foreground/20"
          />
          <path
            d="M 0 70 L 100 70"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-muted-foreground/20"
          />

          {/* City blocks */}
          <rect
            x="15"
            y="10"
            width="20"
            height="15"
            fill="currentColor"
            className="text-muted/30"
            rx="1"
          />
          <rect
            x="60"
            y="15"
            width="25"
            height="12"
            fill="currentColor"
            className="text-muted/30"
            rx="1"
          />
          <rect
            x="20"
            y="60"
            width="15"
            height="20"
            fill="currentColor"
            className="text-muted/30"
            rx="1"
          />
          <rect
            x="55"
            y="55"
            width="30"
            height="18"
            fill="currentColor"
            className="text-muted/30"
            rx="1"
          />
          <rect
            x="40"
            y="75"
            width="12"
            height="15"
            fill="currentColor"
            className="text-muted/30"
            rx="1"
          />
        </svg>

        {/* City label */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground/50">
            Astana
          </p>
        </div>

        {/* Sensor pins */}
        {sensorPins.map((pin) => (
          <button
            key={pin.id}
            onClick={() => setSelectedPin(pin)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer`}
            style={{ left: `${pin.lng}%`, top: `${pin.lat}%` }}
          >
            <div
              className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-200 group-hover:scale-110 ${
                pin.status === "alert"
                  ? "bg-destructive/20 animate-alert-pulse"
                  : pin.status === "warning"
                  ? "bg-yellow-500/20"
                  : "bg-primary/20 glow-neon-green"
              }`}
            >
              <MapPin
                className={`w-5 h-5 ${
                  pin.status === "alert"
                    ? "text-destructive"
                    : pin.status === "warning"
                    ? "text-yellow-500"
                    : "text-primary"
                }`}
              />
              {pin.status === "alert" && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-destructive animate-ping" />
              )}
            </div>
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {pin.name}
            </span>
          </button>
        ))}

        {/* Selected pin popup */}
        {selectedPin && (
          <div
            className="absolute z-30 w-64 bg-card/95 backdrop-blur-md rounded-lg border border-border shadow-xl"
            style={{
              left: `${Math.min(Math.max(selectedPin.lng, 20), 80)}%`,
              top: `${Math.min(Math.max(selectedPin.lat + 8, 20), 70)}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div
              className={`px-4 py-3 border-b border-border rounded-t-lg ${
                selectedPin.status === "alert"
                  ? "bg-destructive/10"
                  : "bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {selectedPin.status === "alert" && (
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                  )}
                  <span className="font-semibold text-sm text-foreground">
                    {selectedPin.name}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedPin(null)
                  }}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="px-4 py-3">
              <p
                className={`text-sm ${
                  selectedPin.status === "alert"
                    ? "text-destructive font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {selectedPin.message}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    selectedPin.status === "alert"
                      ? "bg-destructive/20 text-destructive"
                      : selectedPin.status === "warning"
                      ? "bg-yellow-500/20 text-yellow-500"
                      : "bg-primary/20 text-primary"
                  }`}
                >
                  {selectedPin.status === "alert"
                    ? "Critical"
                    : selectedPin.status === "warning"
                    ? "Warning"
                    : "Normal"}
                </span>
                <span className="text-xs text-muted-foreground">
                  Last update: 2 min ago
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
