import type { Metadata } from "next";
import Portfolio from "../portfolio";
import { createHomeMetadata } from "../seo";

export const metadata: Metadata = createHomeMetadata("uz");

export default function UzbekHomePage() {
  return <Portfolio initialLocale="uz" />;
}
