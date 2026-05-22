"use client"

import { Shield, User, AlertTriangle } from "lucide-react"

interface DashboardHeaderProps {
  onSimulateAlert?: () => void
}

export function DashboardHeader({ onSimulateAlert }: DashboardHeaderProps) {
  return (
    <header className="h-16 bg-card/50 backdrop-blur-sm border-b border-border flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3 pl-12 lg:pl-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Shield className="w-5 h-5 text-accent hidden sm:block" />
          <span className="text-xs sm:text-sm text-muted-foreground">
            Monitoring Control Panel
          </span>
          <span className="text-muted-foreground/50 hidden md:inline">—</span>
          <span className="text-xs sm:text-sm font-medium text-foreground hidden md:inline">
            Astana City Administration
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Simulate Alert Button - hidden but accessible */}
        {onSimulateAlert && (
          <button
            onClick={onSimulateAlert}
            className="group relative flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-all duration-200 border border-transparent hover:border-destructive/30"
            title="Simulate contamination alert for demo"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Demo</span>
          </button>
        )}

        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="hidden lg:inline">Live Data Stream</span>
        </div>
        <div className="hidden sm:block h-8 w-px bg-border" />
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">Admin User</p>
            <p className="text-xs text-muted-foreground">City Operations</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border border-border flex items-center justify-center">
            <User className="w-4 h-4 text-foreground" />
          </div>
        </div>
      </div>
    </header>
  )
}
