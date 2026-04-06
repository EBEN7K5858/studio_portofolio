import type {Metadata} from 'next';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LangProvider } from '@/contexts/LangContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import LoadingScreen from '@/components/LoadingScreen';

export const metadata: Metadata = {
  metadataBase: new URL('https://eben-kambou.vercel.app'),
  title: 'Sansan Eben-Ezer KAMBOU | Portfolio',
  description: 'Computer Engineering Student & Aspiring Cybersecurity Analyst',
  openGraph: {
    title: 'Sansan Eben-Ezer KAMBOU | Portfolio',
    description: 'Computer Engineering Student & Aspiring Cybersecurity Analyst',
    url: 'https://eben-kambou.vercel.app',
    siteName: 'Sansan Eben-Ezer Portfolio',
    images: [
      {
        url: '/assets/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Sansan Eben-Ezer KAMBOU Profile',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sansan Eben-Ezer KAMBOU | Portfolio',
    description: 'Computer Engineering Student & Aspiring Cybersecurity Analyst',
    images: ['/assets/profile.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@400;500&family=JetBrains+Mono&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased transition-colors duration-300">
        <LangProvider>
          <ThemeProvider>
            <LoadingScreen />
            <CustomCursor />
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </LangProvider>
      </body>
    </html>
  );
}
 
 
