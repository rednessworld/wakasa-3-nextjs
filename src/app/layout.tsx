import type { Metadata } from 'next';
import { Shippori_Mincho, DM_Sans } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

const shipporiMincho = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-shippori',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tasca Japonesa WAKASA 3.0 | Barcelona',
  description: 'Auténtica cocina japonesa en el corazón de Barcelona. Reservas: +34 932 081 866',
  openGraph: {
    title: 'Tasca Japonesa WAKASA 3.0 | Barcelona',
    description: 'Auténtica cocina japonesa en el corazón de Barcelona. Reservas: +34 932 081 866',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${shipporiMincho.variable} ${dmSans.variable}`}
    >
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
