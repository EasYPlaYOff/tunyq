"use client"

import {
  LayoutDashboard,
  Map,
  Brain,
  Cpu,
  FileText,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { TunyqLogo } from "./tunyq-logo"

export type TabId = "overview" | "map" | "ai-analytics" | "devices" | "reports"

const navItems: { icon: typeof LayoutDashboard; label: string; id: TabId }[] = [
  { icon: LayoutDashboard, label: "Overview", id: "overview" },
  { icon: Map, label: "Map", id: "map" },
  { icon: Brain, label: "AI Analytics", id: "ai-analytics" },
  { icon: Cpu, label: "Devices", id: "devices" },
  { icon: FileText, label: "Reports", id: "reports" },
]

interface DashboardSidebarProps {
  collapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
  mobileOpen: boolean
  onMobileOpenChange: (open: boolean) => void
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

export function DashboardSidebar({
  collapsed,
  onCollapsedChange,
  mobileOpen,
  onMobileOpenChange,
  activeTab,
  onTabChange,
}: DashboardSidebarProps) {
  const handleTabClick = (id: TabId) => {
    onTabChange(id)
    onMobileOpenChange(false)
  }

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => onMobileOpenChange(false)}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={() => onMobileOpenChange(true)}
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-foreground"
      >
        <Menu className="w-5 h-5" />
      </button>

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Mobile close button */}
        <button
          onClick={() => onMobileOpenChange(false)}
          className="absolute top-4 right-4 lg:hidden w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-foreground"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Logo */}
        <div className={cn(
          "flex items-center border-b border-sidebar-border transition-all duration-300",
          collapsed ? "justify-center px-2 py-4" : "justify-start px-4 py-4"
        )}>
          <TunyqLogo collapsed={collapsed} />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-primary/15 text-primary glow-neon-yellow"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0 transition-colors",
                    isActive && "text-primary"
                  )}
                />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                {isActive && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-3 py-4 border-t border-sidebar-border space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-all duration-200">
            <Settings className="w-5 h-5" />
            {!collapsed && (
              <span className="text-sm font-medium">Settings</span>
            )}
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-all duration-200 relative">
            <Bell className="w-5 h-5" />
            {!collapsed && (
              <span className="text-sm font-medium">Notifications</span>
            )}
            <span className="absolute top-2 left-6 w-2 h-2 rounded-full bg-destructive animate-pulse" />
          </button>
        </div>

        {/* Collapse toggle - desktop only */}
        <button
          onClick={() => onCollapsedChange(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>
      </aside>
    </>
  )
}
