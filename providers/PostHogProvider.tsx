'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

// The PostHog project API key is injected at build time from an env var
// (NEXT_PUBLIC_POSTHOG_KEY) — never hard-coded in source. It is a publishable
// client-side key, so it does end up in the shipped browser bundle (unavoidable
// for any client-side analytics), but it stays out of the git repository. If
// the var isn't set, analytics simply no-ops.
const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

if (typeof window !== 'undefined' && KEY && !posthog.__loaded) {
  posthog.init(KEY, {
    api_host: HOST,
    capture_pageview: false, // handled manually below for the App Router
    capture_pageleave: true,
    autocapture: true, // clicks, form submits, etc.
    enable_heatmaps: true, // click/scroll heatmaps
    person_profiles: 'identified_only', // don't burn the free tier on anon profiles
    // Session replay: records once "Record user sessions" is enabled in the
    // PostHog project settings. Passwords are always masked; we leave other
    // inputs visible so replays are useful (no sensitive fields on this site).
    session_recording: {
      maskAllInputs: false,
    },
    capture_performance: true, // web vitals
  });
}

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!KEY) return;
    let url = window.location.origin + pathname;
    const qs = searchParams?.toString();
    if (qs) url += `?${qs}`;
    posthog.capture('$pageview', { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  // No key configured → render children untouched, zero analytics overhead.
  if (!KEY) return <>{children}</>;

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      {children}
    </PHProvider>
  );
}
