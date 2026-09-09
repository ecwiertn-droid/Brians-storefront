// Small hand-drawn line icons used in the hero's floating decorations and
// the photo placeholder cards. Plain inline SVG -- no icon library needed.

export function DumbbellIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
      <rect x="4" y="18" width="6" height="12" rx="1.5" />
      <rect x="38" y="18" width="6" height="12" rx="1.5" />
      <rect x="14" y="21" width="20" height="6" rx="1" />
      <line x1="10" y1="24" x2="14" y2="24" />
      <line x1="34" y1="24" x2="38" y2="24" />
    </svg>
  );
}

export function SmoothieIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
      <path d="M14 10h20l-3 26a3 3 0 0 1-3 3H20a3 3 0 0 1-3-3L14 10Z" />
      <line x1="12" y1="10" x2="36" y2="10" />
      <line x1="24" y1="4" x2="24" y2="10" />
      <line x1="18" y1="17" x2="30" y2="17" />
      <line x1="19" y1="24" x2="29" y2="24" />
    </svg>
  );
}

export function PulseIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
      <path d="M4 24h8l4-12 8 22 4-14 3 4h13" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export function CameraIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
      <rect x="5" y="14" width="38" height="26" rx="4" />
      <path d="M17 14l3-5h8l3 5" />
      <circle cx="24" cy="27" r="8" />
    </svg>
  );
}

export function LeafIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
      <path d="M10 38C8 22 20 8 40 8c2 20-12 32-28 30Z" strokeLinejoin="round" />
      <path d="M12 36 30 18" strokeLinecap="round" />
    </svg>
  );
}

export function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
      <rect x="6" y="10" width="36" height="32" rx="4" />
      <line x1="6" y1="19" x2="42" y2="19" />
      <line x1="15" y1="5" x2="15" y2="14" strokeLinecap="round" />
      <line x1="33" y1="5" x2="33" y2="14" strokeLinecap="round" />
    </svg>
  );
}

export function SparkleIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
      <path
        d="M24 6c1.5 8 3 9.5 11 11-8 1.5-9.5 3-11 11-1.5-8-3-9.5-11-11 8-1.5 9.5-3 11-11Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
      <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" />
      <polyline points="13 5 20 12 13 19" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
