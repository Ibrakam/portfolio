import type { Metadata } from "next";
import "../globals.css";
import { createHomeMetadata } from "../seo";
import SiteShell from "../site-shell";

export const metadata: Metadata = createHomeMetadata("ru");

export default function RussianLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell lang="ru">{children}</SiteShell>;
}
