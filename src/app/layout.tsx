import Providers from '@/providers/providers';
import type { Metadata } from 'next';
import { Geist_Mono, Onest, } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/common/ui/navbar';
import { Footer } from '@/components/common/ui/footer';

const onest = Onest({
  subsets: ['latin'],
  variable: '--font-onest'
});


const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
   weight: ['400', '700'],
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
    <>
    <Navbar />
    <html lang='en' suppressHydrationWarning>
      <body className={`${onest.variable} ${geistMono.variable} antialiased pt-10`}>
        <Providers>{children}</Providers>
      </body>
    </html>
    <Footer />
    </>
  );
}
