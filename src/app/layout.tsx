import Providers from '@/providers/providers';
import type { Metadata } from 'next';
import { Geist_Mono, Onest } from 'next/font/google';
import './globals.css';

const onest = Onest({
  subsets: ['latin'],
  variable: '--font-onest'
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'SkillQuest'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${onest.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
