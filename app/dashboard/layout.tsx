import React from 'react';
import { DashboardHeader } from '@/components/dashboard/header';
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
        <DashboardHeader />
        <main className="flex-1">{children}</main>
        <DashboardFooter />
      </div>
    </LanguageProvider>
  );
}
