import type { Metadata } from "next";
import Portfolio from "../portfolio";
import { createHomeMetadata } from "../seo";

export const metadata: Metadata = createHomeMetadata("en");

export default function EnglishHomePage() {
  return <Portfolio initialLocale="en" />;
}
