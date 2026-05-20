"use client"

import { Shield, User } from "lucide-react"

export function DashboardHeader() {
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
