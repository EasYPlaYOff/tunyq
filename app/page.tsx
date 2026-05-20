"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { AstanaMap } from "@/components/dashboard/astana-map"
import { AIVisionWidget } from "@/components/dashboard/ai-vision-widget"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        onMobileOpenChange={setMobileMenuOpen}
      />

      {/* Main content area */}
      <div
        className={cn(
          "min-h-screen transition-all duration-300",
          "lg:pl-64",
          sidebarCollapsed && "lg:pl-16"
        )}
      >
        {/* Header */}
        <DashboardHeader />

        {/* Main content */}
        <main className="p-4 lg:p-6 space-y-6 pt-20 lg:pt-6">
          {/* Metric Cards */}
          <MetricCards />

          {/* Two-column layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Left column - Map */}
            <div className="h-[450px] lg:h-[500px]">
              <AstanaMap />
            </div>

            {/* Right column - AI Vision Widget */}
            <div className="h-[450px] lg:h-[500px]">
              <AIVisionWidget />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
