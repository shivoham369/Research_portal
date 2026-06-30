import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Research Wing, AnC, IIT Kanpur',
  description: 'Fueling Curiosity, Inspiring Innovation at IIT Kanpur. Your gateway to research opportunities, lab tours, and academic excellence.',
  openGraph: {
    title: 'Research Wing, AnC, IIT Kanpur',
    description: 'Fueling Curiosity, Inspiring Innovation at IIT Kanpur',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research Wing, AnC, IIT Kanpur',
    description: 'Fueling Curiosity, Inspiring Innovation at IIT Kanpur',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
