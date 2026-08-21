/**
 * Head-and-shoulders placeholder for staff with no photo yet.
 *
 * Client asked for "an image head with no profile pic" rather than the initials
 * the cards used to fall back to. Inline SVG so it scales to any card size and
 * needs no asset; the container already paints the navy gradient, so the
 * silhouette sits on it at low opacity and reads as deliberate rather than
 * broken.
 */
export default function AvatarPlaceholder({ label }: { label?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      role="img"
      aria-label={label ? `${label} — photo coming soon` : "Photo coming soon"}
      style={{ display: "block" }}
    >
      <circle cx="50" cy="38" r="16" fill="#fff" fillOpacity="0.78" />
      <path
        d="M50 60c-15.5 0-28 9.7-28 21.7V100h56V81.7C78 69.7 65.5 60 50 60Z"
        fill="#fff"
        fillOpacity="0.78"
      />
    </svg>
  );
}
