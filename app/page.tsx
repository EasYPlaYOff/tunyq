"use client"

import { useState } from "react"
import { DashboardSidebar, type TabId } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { AstanaMap } from "@/components/dashboard/astana-map"
import { AIVisionWidget } from "@/components/dashboard/ai-vision-widget"
import { cn } from "@/lib/utils"
import { Cpu, FileText, Construction } from "lucide-react"

function PlaceholderPage({ title, icon: Icon }: { title: string; icon: typeof Cpu }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 glow-neon-green">
        <Icon className="w-10 h-10 text-primary" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-muted-foreground max-w-md">
        This section is under development. Check back soon for updates.
      </p>
      <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
        <Construction className="w-4 h-4" />
        <span>Coming Soon</span>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>("overview")

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6 animate-fade-in">
            <MetricCards />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="h-[450px] lg:h-[500px]">
                <AstanaMap />
              </div>
              <div className="h-[450px] lg:h-[500px]">
                <AIVisionWidget />
              </div>
            </div>
          </div>
        )
      case "map":
        return (
          <div className="h-[calc(100vh-120px)] lg:h-[calc(100vh-80px)] animate-fade-in">
            <AstanaMap fullscreen />
          </div>
        )
      case "ai-analytics":
        return (
          <div className="h-[calc(100vh-120px)] lg:h-[calc(100vh-80px)] animate-fade-in">
            <AIVisionWidget fullscreen />
          </div>
        )
      case "devices":
        return (
          <div className="h-[calc(100vh-120px)] lg:h-[calc(100vh-80px)] animate-fade-in">
            <div className="h-full rounded-xl bg-card border border-border">
              <PlaceholderPage title="Device Management" icon={Cpu} />
            </div>
          </div>
        )
      case "reports":
        return (
          <div className="h-[calc(100vh-120px)] lg:h-[calc(100vh-80px)] animate-fade-in">
            <div className="h-full rounded-xl bg-card border border-border">
              <PlaceholderPage title="Reports & Analytics" icon={FileText} />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        onMobileOpenChange={setMobileMenuOpen}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div
        className={cn(
          "min-h-screen transition-all duration-300",
          "lg:pl-64",
          sidebarCollapsed && "lg:pl-16"
        )}
      >
        <DashboardHeader />

        <main className="p-4 lg:p-6 pt-20 lg:pt-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
