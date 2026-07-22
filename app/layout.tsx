import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import PostHogProvider from '@/providers/PostHogProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Anmol Vijay Bhatia — AI/ML Software Engineer',
  description: 'I build multi-agent AI systems and full-stack products people actually use — including one serving 150K+ users. Two-time Incedo Excellence Award winner. Explore my work.',
  keywords: ['AI Engineer', 'Machine Learning Engineer', 'Multi-Agent Systems', 'LLM', 'Full Stack Developer', 'Software Engineer'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PostHogProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}



