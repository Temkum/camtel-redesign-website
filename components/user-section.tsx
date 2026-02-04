"use client"

import { User, FileText, Lock, LogOut, Receipt, RefreshCw, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export function UserSection() {
  const { t } = useLanguage()

  const quickActions = [
    { icon: Receipt, label: "viewBills", color: "text-primary" },
    { icon: RefreshCw, label: "recharge", color: "text-accent" },
    { icon: BarChart3, label: "dataUsage", color: "text-primary" },
  ]

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* User Welcome Card */}
          <Card className="overflow-hidden border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-md lg:col-span-1">
            <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/20">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm opacity-90">{t("welcome")},</p>
                  <CardTitle className="text-lg">KUM JUDE THADDEUS TEM</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                <button className="flex items-center gap-3 px-6 py-4 text-left text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground">
                  <FileText className="h-4 w-4" />
                  {t("customerInfo")}
                </button>
                <button className="flex items-center gap-3 border-t border-border/50 px-6 py-4 text-left text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground">
                  <Lock className="h-4 w-4" />
                  {t("changePassword")}
                </button>
                <button className="flex items-center gap-3 border-t border-border/50 px-6 py-4 text-left text-sm font-medium text-destructive transition-all duration-200 hover:bg-destructive/10">
                  <LogOut className="h-4 w-4" />
                  {t("logout")}
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-md lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                {t("quickActions")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="group flex h-auto flex-col items-center gap-3 border-border/50 p-6 transition-all duration-300 hover:border-primary hover:bg-primary/5 bg-transparent"
                  >
                    <div className={`rounded-xl bg-secondary p-3 transition-colors group-hover:bg-primary/10 ${action.color}`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{t(action.label)}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
