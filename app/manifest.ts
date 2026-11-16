import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ибрагим Кадамжанов — Full-Stack Developer",
    short_name: "Ibragim",
    description: "Портфолио full-stack разработчика Ибрагима Кадамжанова из Ташкента.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b111b",
    theme_color: "#0b111b",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
