import React from 'react';
import { DashboardFooter } from '@/components/dashboard/footer';
import { LanguageProvider } from '@/lib/language-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1">{children}</main>
        <DashboardFooter />
      </div>
    </LanguageProvider>
  );
}
