import type { Metadata } from "next";
import "../globals.css";
import { createHomeMetadata } from "../seo";
import SiteShell from "../site-shell";

export const metadata: Metadata = createHomeMetadata("uz");

export default function UzbekLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell lang="uz">{children}</SiteShell>;
}
