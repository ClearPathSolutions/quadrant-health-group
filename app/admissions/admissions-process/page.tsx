import type { Metadata } from "next";
import PortedPage from "@/components/PortedPage";
import { getPage } from "@/lib/content";
import { seo } from "@/lib/site";

const SLUG = "admissions/admissions-process";
const page = getPage(SLUG)!;

export const metadata: Metadata = {
  title: page.title,
  description: page.metaDescription,
  ...seo({
    path: `/${SLUG}`,
    title: page.title,
    description: page.metaDescription,
  }),
};

export default function Page() {
  return <PortedPage page={page} />;
}
