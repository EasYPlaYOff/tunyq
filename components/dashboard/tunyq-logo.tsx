"use client"

interface TunyqLogoProps {
  collapsed?: boolean
  className?: string
}

export function TunyqLogo({ collapsed = false, className = "" }: TunyqLogoProps) {
  if (collapsed) {
    // Compact version - just the icon
    return (
      <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-10 h-10 ${className}`}
      >
        {/* Outer circle arc - black */}
        <path
          d="M30 8C17.85 8 8 17.85 8 30"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="text-foreground"
        />
        <path
          d="M52 30C52 17.85 42.15 8 30 8"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="text-foreground"
        />
        
        {/* Inner circle - yellow */}
        <path
          d="M30 52C42.15 52 52 42.15 52 30"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="text-primary"
        />
        <path
          d="M8 30C8 42.15 17.85 52 30 52"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="text-primary"
        />
        
        {/* Pulse/wave line - yellow */}
        <path
          d="M12 32 L18 32 L22 24 L28 38 L34 26 L38 32 L44 32"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        />
        
        {/* Starting dot */}
        <circle cx="12" cy="32" r="3" fill="currentColor" className="text-primary" />
        
        {/* Pixel particles */}
        <rect x="46" y="26" width="4" height="4" fill="currentColor" className="text-foreground" />
        <rect x="50" y="30" width="3" height="3" fill="currentColor" className="text-primary" />
        <rect x="48" y="34" width="3" height="3" fill="currentColor" className="text-foreground" />
        <rect x="52" y="24" width="2.5" height="2.5" fill="currentColor" className="text-primary" />
        <rect x="54" y="32" width="2" height="2" fill="currentColor" className="text-primary" />
      </svg>
    )
  }

  // Full logo with text
  return (
    <svg
      viewBox="0 0 180 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-12 ${className}`}
    >
      {/* Icon part */}
      <g transform="translate(0, 0)">
        {/* Outer circle arc - white/foreground */}
        <path
          d="M30 8C17.85 8 8 17.85 8 30"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="text-foreground"
        />
        <path
          d="M52 30C52 17.85 42.15 8 30 8"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="text-foreground"
        />
        
        {/* Inner circle - yellow/primary */}
        <path
          d="M30 52C42.15 52 52 42.15 52 30"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-primary"
        />
        <path
          d="M8 30C8 42.15 17.85 52 30 52"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-primary"
        />
        
        {/* Pulse/wave line - yellow/primary */}
        <path
          d="M12 32 L18 32 L22 24 L28 38 L34 26 L38 32 L44 32"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        />
        
        {/* Starting dot */}
        <circle cx="12" cy="32" r="2.5" fill="currentColor" className="text-primary" />
        
        {/* Pixel particles */}
        <rect x="46" y="26" width="3.5" height="3.5" fill="currentColor" className="text-foreground" />
        <rect x="50" y="30" width="2.5" height="2.5" fill="currentColor" className="text-primary" />
        <rect x="48" y="34" width="2.5" height="2.5" fill="currentColor" className="text-foreground" />
        <rect x="52" y="24" width="2" height="2" fill="currentColor" className="text-primary" />
        <rect x="54" y="32" width="1.5" height="1.5" fill="currentColor" className="text-primary" />
      </g>
      
      {/* Text part - TUNYQ */}
      <g transform="translate(62, 22)">
        {/* T */}
        <text
          x="0"
          y="24"
          fill="currentColor"
          className="text-foreground"
          style={{ fontSize: "26px", fontWeight: 700, fontFamily: "system-ui, sans-serif", letterSpacing: "-0.5px" }}
        >
          TUNY
        </text>
        {/* Q in yellow */}
        <text
          x="78"
          y="24"
          fill="currentColor"
          className="text-primary"
          style={{ fontSize: "26px", fontWeight: 700, fontFamily: "system-ui, sans-serif", letterSpacing: "-0.5px" }}
        >
          Q
        </text>
      </g>
    </svg>
  )
}
