import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { LanguageProvider } from '@/lib/language-context';
import { DashboardHeader } from '@/components/dashboard/header';
import { AuthProvider } from '@/lib/auth-context';

const _geist = Geist({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Camtel - Customer Portal',
  description:
    'Manage your Camtel X-tremNet internet services - account, billing, and support',
  icons: {
    icon: '/camtel.png',
    apple: '/camtel.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <LanguageProvider>
          <AuthProvider>
            <DashboardHeader />
            {children}
            <Analytics />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
