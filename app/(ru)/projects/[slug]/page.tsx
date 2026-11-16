import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { projectSlugs, translations } from "../../../content";
import { siteUrl } from "../../../seo";

type ProjectSlug = (typeof projectSlugs)[number];

const projectImages: Record<ProjectSlug, string | null> = {
  leadora: "/projects/leadora.jpg",
  "service-portal": "/projects/public-portal-desktop.jpg",
  "translate-v": null,
  "jobs-bot": "/projects/jobs-bot-main.jpg",
};

function getProject(slug: string) {
  const index = projectSlugs.indexOf(slug as ProjectSlug);
  if (index < 0) return null;
  const projectSlug = projectSlugs[index];
  return { ...translations.ru.projects[index], slug: projectSlug, image: projectImages[projectSlug] };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} — проект Ибрагима Кадамжанова`;
  const description = `${project.headline} ${project.description}`;
  const path = `/projects/${project.slug}`;
  const images = project.image ? [{ url: project.image, alt: `${project.title} — проект Ибрагима Кадамжанова` }] : [];

  return {
    title,
    description,
    alternates: { canonical: path },
    authors: [{ name: "Ибрагим Кадамжанов", url: siteUrl }],
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Ibragim Kadamzhanov — Portfolio",
      locale: "ru_RU",
      type: "article",
      images,
    },
    twitter: {
      card: project.image ? "summary_large_image" : "summary",
      title,
      description,
      images: project.image ? [project.image] : [],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const projectUrl = `${siteUrl}/projects/${project.slug}`;
  const liveUrl = project.slug === "leadora" ? project.href : null;
  const currentIndex = projectSlugs.indexOf(project.slug);
  const nextIndex = (currentIndex + 1) % projectSlugs.length;
  const nextProject = translations.ru.projects[nextIndex];
  const nextSlug = projectSlugs[nextIndex];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${projectUrl}#project`,
    url: projectUrl,
    name: project.title,
    headline: project.headline,
    description: project.description,
    inLanguage: "ru",
    keywords: project.stack.join(", "),
    image: project.image ? `${siteUrl}${project.image}` : undefined,
    sameAs: liveUrl || undefined,
    creator: { "@id": `${siteUrl}/#person`, "@type": "Person", name: "Ибрагим Кадамжанов" },
    isPartOf: { "@id": `${siteUrl}/#website` },
  };

  return (
    <main className="case-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className="case-topbar">
        <Link className="case-brand" href="/" aria-label="Ибрагим Кадамжанов — главная">
          <b>IK</b><span>Ибрагим Кадамжанов<small>Full-stack developer</small></span>
        </Link>
        <nav aria-label="Основная навигация">
          <Link className="active" href="/#work">Проекты</Link>
          <Link href="/#stack">Стек</Link>
          <Link href="/#about">Обо мне</Link>
          <Link href="/#contact">Контакт</Link>
        </nav>
      </header>

      <article className="case-study">
        <nav className="case-breadcrumbs" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link><span>/</span><Link href="/#work">Проекты</Link><span>/</span><b>{project.title}</b>
        </nav>
        <p className="case-index">{project.number} / {project.eyebrow}</p>
        <h1>{project.title}</h1>
        <p className="case-headline">{project.headline}</p>
        <div className="case-meta-strip">
          <div><span>Формат</span><b>{project.eyebrow}</b></div>
          <div><span>Участие</span><b>{project.role}</b></div>
          <div><span>Стек</span><b>{project.stack.length} технологий</b></div>
          <div><span>Статус</span><b>{liveUrl ? "Live product" : "Project case"}</b></div>
        </div>

        {project.image ? (
          liveUrl ? (
            <a className="case-media case-media-link" href={liveUrl} target="_blank" rel="noreferrer" aria-label="Открыть сайт LEADORA — leadora.uz">
              <Image src={project.image} alt={`${project.title}: ${project.headline}`} width={1524} height={900} sizes="(max-width: 760px) calc(100vw - 36px), 88vw" priority />
              <span className="case-live-label"><i aria-hidden="true" /> Смотреть сайт · leadora.uz <b><ArrowUpRight aria-hidden="true" /></b></span>
            </a>
          ) : (
            <div className="case-media">
              <Image src={project.image} alt={`${project.title}: ${project.headline}`} width={1524} height={900} sizes="(max-width: 760px) calc(100vw - 36px), 88vw" priority />
            </div>
          )
        ) : (
          <div className="case-media case-pipeline" aria-label="Этапы AI-пайплайна Translate-V">
            <span>WHISPER</span><i><ArrowRight aria-hidden="true" /></i><span>DEEPL</span><i><ArrowRight aria-hidden="true" /></i><span>VOICE</span><i><ArrowRight aria-hidden="true" /></i><span>LIP-SYNC</span>
          </div>
        )}

        <div className="case-content">
          <section>
            <p className="section-kicker">01 / Проект</p>
            <h2>Задача и решение</h2>
            <p>{project.description}</p>
          </section>
          <section>
            <p className="section-kicker">02 / Участие</p>
            <h2>Моя роль</h2>
            <p>{project.role}</p>
          </section>
          <section className="case-stack">
            <p className="section-kicker">03 / Технологии</p>
            <h2>Стек проекта</h2>
            <ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>

        <div className="case-actions">
          <Link className="button button-primary" href="/#contact">Обсудить похожий проект <ArrowRight aria-hidden="true" /></Link>
          {project.href && <a className="button button-quiet" href={project.href} target="_blank" rel="noreferrer">{project.slug === "leadora" ? "Открыть leadora.uz" : "Открыть GitHub"} <ArrowUpRight aria-hidden="true" /></a>}
        </div>

        <Link className="case-next" href={`/projects/${nextSlug}`}>
          <span>Следующий проект</span><b>{nextProject.title}</b><i><ArrowUpRight aria-hidden="true" /></i>
        </Link>
      </article>
    </main>
  );
}
