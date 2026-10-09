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
  title: 'Maria Concepcion — Official EPK',
  description: 'Official Electronic Press Kit (EPK) for Maria Concepcion — Dark pop vocalist, songwriter, and performer with over 350M streams.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Maria Concepcion — Official EPK',
    description: 'Dark electronic pop, raw vulnerability, 350M+ streams. Booking, discography, press acclaim, and statistics.',
    url: 'https://mariaconcepcion.com',
    siteName: 'Maria Concepcion EPK',
    images: [
      {
        url: '/images/Maria Concepcion portrait.png',
        width: 1200,
        height: 630,
        alt: 'Maria Concepcion Portrait',
      },
    ],
    locale: 'en_US',
    type: 'website',
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
