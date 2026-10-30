/* =============================================================================
   Pictogrammes des réseaux — au trait, comme le reste du site.
   ========================================================================== */

type IconProps = { size?: number; className?: string };

export function InstagramIcon({ size = 17, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="5.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ size = 17, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="5.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M15.5 7.5h-1.7c-1.3 0-2.3 1-2.3 2.3V21.5M9 12.5h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WhatsAppIcon({ size = 17, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M3.5 20.5l1.3-4.2A8.6 8.6 0 1 1 8 19.4l-4.5 1.1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.3c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .5-.1.6l-.5.6c-.1.1-.1.3 0 .5.6 1 1.4 1.8 2.5 2.4.2.1.4.1.5 0l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.3.3.5v.4c0 .4-.2.8-.6 1-.6.3-1.4.5-2.3.2-1.9-.6-3.6-2.1-4.6-3.9-.6-1-.8-2-.5-2.9.1-.4.3-.8.6-1.1Z"
        fill="currentColor"
      />
    </svg>
  );
}
