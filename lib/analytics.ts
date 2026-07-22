import posthog from 'posthog-js';

// Safe, tiny wrapper around posthog.capture. No-ops on the server and whenever
// PostHog isn't configured, so call sites never need to guard.
type EventProps = Record<string, unknown>;

export function track(event: string, props?: EventProps): void {
  if (typeof window === 'undefined') return;
  if (!posthog.__loaded) return; // PostHog isn't configured/initialized → no-op
  try {
    posthog.capture(event, props);
  } catch {
    // Never let analytics break the UI.
  }
}
