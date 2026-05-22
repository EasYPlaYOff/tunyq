"use client"

import { useRef } from "react"
import { 
  X, 
  Printer, 
  Download, 
  Droplets,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Calendar,
  Building2,
  FileText,
  BarChart3
} from "lucide-react"

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
}

const currentDate = new Date()
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]
const reportMonth = monthNames[currentDate.getMonth()]
const reportYear = currentDate.getFullYear()

const sensorData = [
  { id: "S-07", location: "Yesil District, Waterfront", status: "Normal", ph: 7.2, turbidity: 2.1, microplastic: 0.3, temp: 14.2 },
  { id: "S-12", location: "Saryarka District, Industrial", status: "Alert", ph: 6.8, turbidity: 4.5, microplastic: 2.8, temp: 15.1 },
  { id: "S-18", location: "Almaty District, Residential", status: "Normal", ph: 7.1, turbidity: 1.8, microplastic: 0.4, temp: 13.8 },
  { id: "S-23", location: "Baikonur District, Park Zone", status: "Normal", ph: 7.3, turbidity: 1.5, microplastic: 0.2, temp: 14.0 },
  { id: "S-31", location: "Expo District, Central", status: "Warning", ph: 6.9, turbidity: 3.2, microplastic: 1.5, temp: 14.8 },
]

const summaryStats = {
  totalReadings: 4320,
  avgPh: 7.06,
  avgTurbidity: 2.62,
  avgMicroplastic: 1.04,
  alertsTriggered: 12,
  systemUptime: 99.7,
}

export function ReportModal({ isOpen, onClose }: ReportModalProps) {
  const printRef = useRef<HTMLDivElement>(null)

  if (!isOpen) return null

  const handlePrint = () => {
    const printContent = printRef.current
    if (!printContent) return

    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Tunyq Water Quality Report - ${reportMonth} ${reportYear}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              padding: 40px;
              color: #1a1a2e;
              line-height: 1.6;
            }
            .header { 
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 3px solid #00d4aa;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .logo { font-size: 28px; font-weight: 700; color: #00d4aa; }
            .logo span { color: #00b4d8; }
            .report-title { font-size: 24px; color: #1a1a2e; }
            .report-meta { color: #666; font-size: 14px; }
            .section { margin-bottom: 30px; }
            .section-title { 
              font-size: 18px; 
              font-weight: 600; 
              color: #1a1a2e;
              margin-bottom: 15px;
              padding-bottom: 8px;
              border-bottom: 1px solid #e0e0e0;
            }
            .stats-grid { 
              display: grid; 
              grid-template-columns: repeat(3, 1fr); 
              gap: 15px; 
              margin-bottom: 25px;
            }
            .stat-card { 
              background: #f8f9fa; 
              padding: 15px; 
              border-radius: 8px;
              border-left: 4px solid #00d4aa;
            }
            .stat-value { font-size: 24px; font-weight: 700; color: #00d4aa; }
            .stat-label { font-size: 12px; color: #666; text-transform: uppercase; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e0e0e0; }
            th { background: #f8f9fa; font-weight: 600; font-size: 12px; text-transform: uppercase; color: #666; }
            .status-normal { color: #00d4aa; font-weight: 600; }
            .status-warning { color: #f59e0b; font-weight: 600; }
            .status-alert { color: #ef4444; font-weight: 600; }
            .footer { 
              margin-top: 40px; 
              padding-top: 20px; 
              border-top: 1px solid #e0e0e0;
              font-size: 12px;
              color: #666;
              display: flex;
              justify-content: space-between;
            }
            .ai-badge {
              display: inline-block;
              background: linear-gradient(135deg, #00d4aa, #00b4d8);
              color: white;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 11px;
              font-weight: 600;
            }
            @media print {
              body { padding: 20px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  const handleDownloadTxt = () => {
    const reportText = `
TUNYQ WATER QUALITY MONITORING REPORT
=====================================
Period: ${reportMonth} ${reportYear}
Organization: Astana City Administration
Generated: ${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}

EXECUTIVE SUMMARY
-----------------
Total Readings: ${summaryStats.totalReadings.toLocaleString()}
System Uptime: ${summaryStats.systemUptime}%
Alerts Triggered: ${summaryStats.alertsTriggered}

AVERAGE PARAMETERS
------------------
pH Level: ${summaryStats.avgPh}
Turbidity: ${summaryStats.avgTurbidity} NTU
Microplastic: ${summaryStats.avgMicroplastic} μg/L

SENSOR DATA
-----------
${sensorData.map(s => `
Sensor ${s.id} - ${s.location}
  Status: ${s.status}
  pH: ${s.ph}
  Turbidity: ${s.turbidity} NTU
  Microplastic: ${s.microplastic} μg/L
  Temperature: ${s.temp}°C
`).join("")}

RECOMMENDATIONS
---------------
1. Continue monitoring Sensor S-12 (Industrial Zone) - elevated microplastic levels detected
2. Schedule maintenance for Sensor S-31 - minor calibration required
3. All other sensors operating within normal parameters

---
Report generated by Tunyq AI-Powered Water Quality Monitoring System
© ${reportYear} Tunyq Technologies. All rights reserved.
    `.trim()

    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Tunyq_Water_Report_${reportMonth}_${reportYear}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center glow-neon-green">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Water Quality Report</h2>
              <p className="text-sm text-muted-foreground">{reportMonth} {reportYear} - Astana Region</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadTxt}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/15 text-accent hover:bg-accent/25 transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download TXT</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/15 text-primary hover:bg-primary/25 transition-colors text-sm font-medium"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6 bg-white text-gray-900">
          <div ref={printRef}>
            {/* Report Header */}
            <div className="flex justify-between items-start border-b-2 border-emerald-500 pb-4 mb-6">
              <div>
                <div className="text-2xl font-bold">
                  <span className="text-emerald-500">Tunyq</span>
                  <span className="text-cyan-500">.</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">AI-Powered Water Quality Monitoring</p>
              </div>
              <div className="text-right">
                <h1 className="text-xl font-semibold text-gray-900">Water Quality Report</h1>
                <p className="text-gray-500 text-sm">{reportMonth} {reportYear}</p>
                <span className="ai-badge mt-2 inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  AI-Generated Analysis
                </span>
              </div>
            </div>

            {/* Organization Info */}
            <div className="flex items-center gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Astana City Administration</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Generated: {currentDate.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Astana Region, Kazakhstan</span>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-500" />
                Executive Summary
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-emerald-500">
                  <div className="text-2xl font-bold text-emerald-500">{summaryStats.totalReadings.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Total Readings</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-cyan-500">
                  <div className="text-2xl font-bold text-cyan-500">{summaryStats.systemUptime}%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">System Uptime</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-amber-500">
                  <div className="text-2xl font-bold text-amber-500">{summaryStats.alertsTriggered}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Alerts Triggered</div>
                </div>
              </div>
            </div>

            {/* Average Parameters */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-cyan-500" />
                Average Water Parameters
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-emerald-50 rounded-lg text-center">
                  <div className="text-3xl font-bold text-emerald-600">{summaryStats.avgPh}</div>
                  <div className="text-sm text-gray-600">pH Level</div>
                  <div className="text-xs text-emerald-600 mt-1 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Normal Range
                  </div>
                </div>
                <div className="p-4 bg-cyan-50 rounded-lg text-center">
                  <div className="text-3xl font-bold text-cyan-600">{summaryStats.avgTurbidity}</div>
                  <div className="text-sm text-gray-600">Turbidity (NTU)</div>
                  <div className="text-xs text-cyan-600 mt-1 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Acceptable
                  </div>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg text-center">
                  <div className="text-3xl font-bold text-amber-600">{summaryStats.avgMicroplastic}</div>
                  <div className="text-sm text-gray-600">Microplastic (μg/L)</div>
                  <div className="text-xs text-amber-600 mt-1 flex items-center justify-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Monitor
                  </div>
                </div>
              </div>
            </div>

            {/* Sensor Data Table */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Sensor Readings Summary
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Sensor ID</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Location</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">pH</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Turbidity</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Microplastic</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Temp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensorData.map((sensor, idx) => (
                      <tr key={sensor.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-medium">{sensor.id}</td>
                        <td className="px-4 py-3 text-gray-600">{sensor.location}</td>
                        <td className="px-4 py-3">
                          <span className={`font-semibold ${
                            sensor.status === "Normal" ? "text-emerald-500" :
                            sensor.status === "Warning" ? "text-amber-500" : "text-red-500"
                          }`}>
                            {sensor.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">{sensor.ph}</td>
                        <td className="px-4 py-3 text-right">{sensor.turbidity} NTU</td>
                        <td className="px-4 py-3 text-right">{sensor.microplastic} μg/L</td>
                        <td className="px-4 py-3 text-right">{sensor.temp}°C</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-700">High Priority</p>
                    <p className="text-sm text-red-600">Continue monitoring Sensor S-12 (Industrial Zone) - elevated microplastic levels detected requiring immediate attention.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-700">Medium Priority</p>
                    <p className="text-sm text-amber-600">Schedule calibration maintenance for Sensor S-31 - minor drift detected in turbidity readings.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-emerald-700">Status OK</p>
                    <p className="text-sm text-emerald-600">All other sensors (S-07, S-18, S-23) operating within normal parameters. No action required.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-4 mt-6 flex justify-between text-xs text-gray-500">
              <div>
                <p>Report generated by Tunyq AI-Powered Water Quality Monitoring System</p>
                <p>© {reportYear} Tunyq Technologies. All rights reserved.</p>
              </div>
              <div className="text-right">
                <p>Document ID: TQ-{reportYear}{(currentDate.getMonth() + 1).toString().padStart(2, "0")}-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
                <p>Classification: Internal Use</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
