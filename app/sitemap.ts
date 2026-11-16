import type { MetadataRoute } from "next";
import { projectSlugs } from "./content";
import { siteUrl } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-04T00:00:00.000Z");
  const homePages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/en`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/uz`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
  const projectPages: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${siteUrl}/projects/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...homePages, ...projectPages];
}
