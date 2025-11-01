'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to portfolio page on load
    router.replace('/portfolio');
  }, [router]);

  return null;
}
