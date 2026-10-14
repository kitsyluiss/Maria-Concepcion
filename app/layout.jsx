import { Anton, Onest } from 'next/font/google';
import './globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const onest = Onest({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-onest',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://mariaepk.netlify.app'),
  title: 'Maria Concepcion — Official EPK',
  description: 'Official Electronic Press Kit (EPK) for Maria Concepcion — Dark pop vocalist, songwriter, and performer with over 350M streams.',
  applicationName: 'Maria Concepcion EPK',
  keywords: [
    'Maria Concepcion',
    'Maria Concepcion EPK',
    'Dark Pop',
    'Electronic Pop',
    'Press Kit',
    'Music EPK',
    'Artist EPK'
  ],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  alternates: {
    canonical: 'https://mariaepk.netlify.app',
  },
  openGraph: {
    title: 'Maria Concepcion — Official EPK',
    description: 'Dark electronic pop, raw vulnerability, 350M+ streams. Booking, discography, press acclaim, and statistics.',
    url: 'https://mariaepk.netlify.app',
    siteName: 'Maria Concepcion EPK',
    images: [
      {
        url: '/images/Maria%20Concepcion%20portrait.png',
        width: 1200,
        height: 630,
        alt: 'Maria Concepcion Portrait',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maria Concepcion — Official EPK',
    description: 'Dark electronic pop, raw vulnerability, 350M+ streams. Booking, discography, press acclaim, and statistics.',
    images: ['/images/Maria%20Concepcion%20portrait.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#08080a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${anton.variable} ${onest.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased overflow-x-hidden selection:bg-accent selection:text-background">
        {children}
      </body>
    </html>
  );
}
