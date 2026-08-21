"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureFirstTouch } from "@/lib/attribution";

/**
 * Records the campaign that brought a visitor here, on their first pageview.
 *
 * Lives in the root layout because a visitor can land on any page — capturing
 * this from the form would record whichever page happens to hold the form as
 * the entry point, which is the same wrong answer with more steps.
 *
 * `usePathname`, deliberately not `useSearchParams`: the latter forces a
 * Suspense boundary and opts every static page into dynamic rendering. The
 * query string is read straight off `window.location` instead, which costs
 * nothing. The gap that leaves — a client-side navigation that changes only the
 * query string — cannot carry a campaign, because internal links do not have
 * one and an ad click is always a full page load.
 */
export default function AttributionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    captureFirstTouch();
  }, [pathname]);

  return null;
}
