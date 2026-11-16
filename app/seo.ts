import type { Metadata } from "next";

export const siteUrl = "https://www.ibragim.site";

const localizedSeo = {
  ru: {
    title: "Ибрагим Кадамжанов — Full-Stack разработчик",
    description: "Ибрагим Кадамжанов — full-stack разработчик из Ташкента. Создаю веб-продукты на Next.js, React, Python, Django и FastAPI: от интерфейса до запуска.",
    locale: "ru_RU",
  },
  en: {
    title: "Ibragim Kadamzhanov — Full-Stack Developer",
    description: "Ibragim Kadamzhanov is a full-stack developer in Tashkent building complete web products with Next.js, React, Python, Django, FastAPI and PostgreSQL.",
    locale: "en_US",
  },
  uz: {
    title: "Ibragim Kadamjanov — Full-Stack dasturchi",
    description: "Ibragim Kadamjanov — Toshkentdagi full-stack dasturchi. Next.js, React, Python, Django, FastAPI va PostgreSQL yordamida to‘liq veb-mahsulotlar yarataman.",
    locale: "uz_UZ",
  },
} as const;

export type SeoLocale = keyof typeof localizedSeo;

const localePaths: Record<SeoLocale, string> = {
  ru: "/",
  en: "/en",
  uz: "/uz",
};

export function createHomeMetadata(locale: SeoLocale): Metadata {
  const seo = localizedSeo[locale];
  const path = localePaths[locale];

  return {
    metadataBase: new URL(siteUrl),
    title: seo.title,
    description: seo.description,
    applicationName: "Ibragim Kadamzhanov — Portfolio",
    authors: [{ name: "Ибрагим Кадамжанов", url: siteUrl }],
    creator: "Ибрагим Кадамжанов",
    publisher: "Ибрагим Кадамжанов",
    category: "technology",
    keywords: [
      "Ибрагим Кадамжанов",
      "Ибрагим Кадамжанов разработчик",
      "Ibragim Kadamzhanov",
      "Ibragim Kadamjanov",
      "Full-Stack Developer",
      "Tashkent developer",
      "Python developer Uzbekistan",
      "Next.js developer Uzbekistan",
    ],
    alternates: {
      canonical: path,
      languages: {
        ru: "/",
        en: "/en",
        uz: "/uz",
        "x-default": "/",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: path,
      siteName: "Ibragim Kadamzhanov — Portfolio",
      locale: seo.locale,
      alternateLocale: ["ru_RU", "en_US", "uz_UZ"].filter((item) => item !== seo.locale),
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: seo.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/og.png"],
    },
    icons: {
      icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/favicon.svg", type: "image/svg+xml" }],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/manifest.webmanifest",
    formatDetection: { email: false, address: false, telephone: false },
  };
}

export const profileJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile-page`,
      url: siteUrl,
      name: "Ибрагим Кадамжанов — Full-Stack разработчик",
      inLanguage: ["ru", "en", "uz"],
      mainEntity: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Ибрагим Кадамжанов",
      alternateName: ["Ibragim Kadamzhanov", "Ibragim Kadamjanov", "Ibrakam"],
      identifier: "Ibrakam",
      url: siteUrl,
      image: {
        "@type": "ImageObject",
        url: `${siteUrl}/portrait.jpg`,
        width: 1086,
        height: 1448,
      },
      jobTitle: "Full-Stack Developer",
      description: "Full-stack developer from Tashkent building web products, APIs, automation systems and production infrastructure.",
      email: "mailto:gomimih@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tashkent",
        addressCountry: "UZ",
      },
      hasOccupation: {
        "@type": "Occupation",
        name: "Full-Stack Developer",
        occupationLocation: {
          "@type": "City",
          name: "Tashkent",
        },
        skills: "Next.js, React, TypeScript, Python, Django, FastAPI, PostgreSQL, Redis, Docker",
      },
      knowsAbout: ["Full-stack development", "Web application development", "REST APIs", "Python", "Next.js", "Django", "FastAPI", "PostgreSQL", "Docker"],
      sameAs: ["https://github.com/Ibrakam", "https://t.me/gomimih"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Ibragim Kadamzhanov — Portfolio",
      alternateName: "Ибрагим Кадамжанов — Портфолио",
      inLanguage: ["ru", "en", "uz"],
      publisher: { "@id": `${siteUrl}/#person` },
    },
  ],
};
