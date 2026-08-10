import type { ReactNode } from "react";
import Link from "next/link";
import { BULLET_LINKS } from "@/lib/site";

/**
 * Renders a plain-text body block as paragraphs and lists.
 *
 * Consecutive `- ` lines are grouped into a single <ul>. The templates this
 * replaces split the body on "\n" and then called `.split("\n")` again inside
 * the bullet branch, which can only ever yield one element — so a six-item list
 * rendered as six separate one-item lists. That is wrong semantically (a screen
 * reader announces "list, 1 item" six times) and visually, since each list
 * carried the block margin instead of the intended item gap.
 */
/** Normalised key for matching a body line against the `promote` map. */
const key = (s: string) =>
  s.toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9 &]/g, "").trim();

export default function Prose({
  body,
  promote,
}: {
  body: string;
  /**
   * In-body labels to render as real headings, keyed by line text and valued by
   * heading level (T5.1). 41 of the workbook's 51 heading-level rows name a
   * label that lives *inside* a section body — "Street names of benzodiazepine:"
   * introducing a bullet list, for example — not a section heading. They read as
   * headings and were marked up as body text, so they are promoted here rather
   * than by restructuring the content into more sections.
   */
  promote?: Record<string, number>;
}): ReactNode {
  const lines = body
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const promoteByKey = new Map<string, number>(
    Object.entries(promote ?? {}).map(([k, v]) => [key(k), v])
  );

  const out: ReactNode[] = [];
  let bullets: string[] = [];

  const flush = () => {
    if (!bullets.length) return;
    out.push(
      <ul key={`ul-${out.length}`}>
        {bullets.map((b, i) => {
          // T5.2 — resolve known bullets to their own pages.
          const href = BULLET_LINKS[key(b)];
          return <li key={i}>{href ? <Link href={href}>{b}</Link> : b}</li>;
        })}
      </ul>
    );
    bullets = [];
  };

  for (const line of lines) {
    if (/^[-•*]\s+/.test(line)) {
      bullets.push(line.replace(/^[-•*]\s*/, ""));
      continue;
    }
    flush();
    const level = promoteByKey.get(key(line));
    if (level === 4) out.push(<h4 key={`h-${out.length}`}>{line}</h4>);
    else if (level) out.push(<h3 key={`h-${out.length}`}>{line}</h3>);
    else out.push(<p key={`p-${out.length}`}>{line}</p>);
  }
  flush();

  return <>{out}</>;
}
