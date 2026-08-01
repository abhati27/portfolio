// Bespoke icon (no lucide equivalent exists) for the Galactic Empire theme,
// drawn in the same stroke conventions as lucide-react so it sits naturally
// alongside the rest of the site's iconography: 24x24 grid, round caps/joins,
// currentColor stroke, no fill.
export default function TieFighterIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="5" width="4.5" height="14" rx="1" />
      <rect x="17.5" y="5" width="4.5" height="14" rx="1" />
      <line x1="6.5" y1="12" x2="9" y2="12" />
      <line x1="15" y1="12" x2="17.5" y2="12" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
