// lucide-react no longer ships brand/logo icons, so these are small
// hand-rolled outline glyphs matching the rest of the icon set (stroke-based,
// 1.8 width, 24x24 box) for Instagram / Facebook / YouTube.

export function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 8.5h-2a1.5 1.5 0 0 0-1.5 1.5v2H15l-.5 3H11.5v6.5" />
      <path d="M13.5 4A9.5 9.5 0 1 0 22 13.4" />
    </svg>
  );
}

export function YoutubeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="6.5" width="19" height="11" rx="3.5" />
      <path d="M10.5 9.5l4.5 2.5-4.5 2.5v-5z" fill="currentColor" stroke="none" />
    </svg>
  );
}
