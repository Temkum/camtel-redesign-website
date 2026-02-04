"use client"

import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Logo and Tagline */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <span className="text-sm font-bold text-primary-foreground">C</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">camtel</span>
              <span className="ml-2 text-xs text-muted-foreground">{t("tagline")}</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              {t("privacyPolicy")}
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              {t("termsOfService")}
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; 2005-{currentYear} {t("copyright")}
          </p>
          <p>Visits: 696,424,502</p>
        </div>
      </div>
    </footer>
  )
}
