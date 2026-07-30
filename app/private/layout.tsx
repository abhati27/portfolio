import type { Metadata } from 'next';

// Keep this route out of search engines. The meta robots tag is rendered into
// the static HTML head, which crawlers honor even though the page is unlinked.
export const metadata: Metadata = {
  title: 'Private Room',
  robots: { index: false, follow: false, nocache: true },
};

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
