import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Anmol Vijay Bhatia - Software Engineer | GenAI Specialist',
  description: 'Experienced Software Engineer with 2 years in Generative AI. Explore my projects, skills, and professional journey.',
  keywords: ['Software Engineer', 'GenAI', 'AI', 'Machine Learning', 'Full Stack Developer'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}


