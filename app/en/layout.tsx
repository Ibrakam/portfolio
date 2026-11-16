import type { Metadata } from "next";
import "../globals.css";
import { createHomeMetadata } from "../seo";
import SiteShell from "../site-shell";

export const metadata: Metadata = createHomeMetadata("en");

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
