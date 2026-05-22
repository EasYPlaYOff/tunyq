"use client"

import { AlertTriangle, X, Bell } from "lucide-react"
import { useEffect, useState } from "react"

export interface AlertNotification {
  id: string
  title: string
  message: string
  timestamp: Date
  severity: "critical" | "warning" | "info"
}

interface AlertNotificationPanelProps {
  notifications: AlertNotification[]
  onDismiss: (id: string) => void
}

export function AlertNotificationPanel({ notifications, onDismiss }: AlertNotificationPanelProps) {
  const [visibleNotifications, setVisibleNotifications] = useState<AlertNotification[]>([])

  useEffect(() => {
    // Animate new notifications in
    const newNotifications = notifications.filter(
      n => !visibleNotifications.find(v => v.id === n.id)
    )
    if (newNotifications.length > 0) {
      setVisibleNotifications(notifications)
    }
  }, [notifications, visibleNotifications])

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-20 right-4 lg:right-8 z-50 w-80 max-w-[calc(100vw-2rem)] space-y-3">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className="animate-slide-in-right"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div
            className={`relative overflow-hidden rounded-xl border shadow-2xl backdrop-blur-md ${
              notification.severity === "critical"
                ? "bg-destructive/10 border-destructive/50 shadow-destructive/20"
                : notification.severity === "warning"
                ? "bg-yellow-500/10 border-yellow-500/50 shadow-yellow-500/20"
                : "bg-accent/10 border-accent/50"
            }`}
          >
            {/* Animated border glow for critical alerts */}
            {notification.severity === "critical" && (
              <div className="absolute inset-0 rounded-xl animate-pulse-border" />
            )}
            
            <div className="relative p-4">
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    notification.severity === "critical"
                      ? "bg-destructive/20 animate-pulse"
                      : notification.severity === "warning"
                      ? "bg-yellow-500/20"
                      : "bg-accent/20"
                  }`}
                >
                  {notification.severity === "critical" ? (
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  ) : notification.severity === "warning" ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Bell className="w-5 h-5 text-accent" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`font-bold text-sm ${
                        notification.severity === "critical"
                          ? "text-destructive"
                          : notification.severity === "warning"
                          ? "text-yellow-500"
                          : "text-accent"
                      }`}
                    >
                      {notification.title}
                    </h4>
                    <button
                      onClick={() => onDismiss(notification.id)}
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-sm text-foreground mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {notification.timestamp.toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Progress bar for auto-dismiss visual */}
            {notification.severity === "critical" && (
              <div className="h-1 bg-destructive/30">
                <div className="h-full bg-destructive animate-pulse" style={{ width: "100%" }} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
