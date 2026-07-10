import type { SVGProps } from "react";

type IconName =
  | "shield"
  | "home"
  | "sun"
  | "calendar"
  | "monitor"
  | "heart"
  | "user"
  | "users"
  | "leaf"
  | "clipboard"
  | "badge"
  | "steps"
  | "phone"
  | "mail"
  | "pin"
  | "check"
  | "arrow-right"
  | "chevron-down"
  | "menu"
  | "close"
  | "star"
  | "shield-check"
  | "clock"
  | "facebook"
  | "instagram"
  | "linkedin";

const paths: Record<IconName, React.ReactNode> = {
  shield: <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />,
  home: (
    <>
      <path d="M4 11l8-6 8 6" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 9h16M8 3v4M16 3v4" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  heart: <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.3 3-5.5 6.5-5.5s6.5 2.2 6.5 5.5" />
      <path d="M16 5.2A3.5 3.5 0 0 1 18 12M17 14.4c2.6.5 4.5 2.4 4.5 5.1" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 20c0-8 5-14 14-14 0 9-5 14-14 14z" />
      <path d="M9 16c2-3 4-5 8-7" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4a3 3 0 0 1 6 0" />
      <path d="M9 11h6M9 15h4" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="10" r="6" />
      <path d="M9 15l-1 6 4-2 4 2-1-6" />
      <path d="M9.5 10l1.7 1.7L15 8" />
    </>
  ),
  steps: (
    <>
      <path d="M4 18h4v-4h4v-4h4V6h4" />
    </>
  ),
  phone: (
    <path d="M6.6 3h3l1.5 5-2 1.5a12 12 0 0 0 5.4 5.4l1.5-2 5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  check: <path d="M4 12l5 5L20 6" />,
  "shield-check": (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M8.5 12l2.5 2.5L15.5 10" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  "chevron-down": <path d="M6 9l6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  star: (
    <path d="M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9 6.7 19l1-5.8L3.5 9.2l5.9-.9L12 3z" />
  ),
  facebook: (
    <path d="M14 8.5h2V5.5h-2.2C11.3 5.5 10 7 10 9.2v1.3H8V13h2v6h3v-6h2.2l.4-2.5H13V9.3c0-.6.2-.8.8-.8H14z" />
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8 10.5V17M8 7.6v.1M12 17v-3.4c0-1.6 2.3-1.8 2.3 0V17M12 17v-6.5" />
    </>
  ),
};

export default function Icon({
  name,
  size = 24,
  ...props
}: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

export type { IconName };
