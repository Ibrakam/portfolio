"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Download, FileText, Menu, X } from "lucide-react";
import { PrismaHero } from "@/components/ui/prisma-hero";
import { projectSlugs, translations, type Locale } from "./content";
import { ThemeToggle } from "./theme-toggle";

function LeadoraVisual({ locale }: { locale: Locale }) {
  const visualCopy = {
    ru: { ad: "Реклама", lead: "Лид", score: "Скоринг", deal: "Сделка", crmAlt: "Интерфейс CRM LEADORA" },
    en: { ad: "Ads", lead: "Lead", score: "Scoring", deal: "Deal", crmAlt: "LEADORA CRM interface" },
    uz: { ad: "Reklama", lead: "Lid", score: "Baholash", deal: "Bitim", crmAlt: "LEADORA CRM interfeysi" },
  }[locale];

  return (
    <div className="project-visual visual-crm">
      <div className="visual-chrome"><span>PRODUCT / CRM</span><b>LEADORA</b></div>
      <Image src="/projects/leadora.jpg" alt={visualCopy.crmAlt} width={1524} height={792} sizes="(max-width: 760px) calc(100vw - 60px), (max-width: 1120px) calc(100vw - 100px), 55vw" />
      <div className="visual-flow" aria-hidden="true">
        <span>{visualCopy.ad}</span><i>→</i><span>{visualCopy.lead}</span><i>→</i><span>{visualCopy.score}</span><i>→</i><b>{visualCopy.deal}</b>
      </div>
    </div>
  );
}

export default function Portfolio({ initialLocale }: { initialLocale: Locale }) {
  const router = useRouter();
  const locale = initialLocale;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStack, setActiveStack] = useState(0);
  const copy = translations[locale];
  const featuredProject = copy.projects[0];
  const compactProjects = copy.projects.slice(1);

  useEffect(() => {
    document.documentElement.lang = initialLocale;
  }, [initialLocale]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth > 1120) setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [menuOpen]);

  function changeLocale(nextLocale: Locale) {
    window.localStorage.setItem("portfolio-language", nextLocale);
    setMenuOpen(false);
    router.push(nextLocale === "ru" ? "/" : `/${nextLocale}`);
  }

  return (
    <main>
      <PrismaHero
        fullName={copy.fullName}
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        accent={copy.hero.accent}
        intro={copy.hero.intro}
        projectsCta={copy.hero.projectsCta}
        contactCta={copy.hero.contactCta}
        availability={copy.availability}
        disciplinesLabel={copy.hero.disciplinesLabel}
        disciplines={copy.hero.disciplines}
        navigation={
          <div className={`hero-nav${menuOpen ? " menu-open" : ""}`}>
            <nav className="hero-nav-links" aria-label={copy.navigationLabel}>
              <a href="#work">{copy.nav.projects}</a>
              <a href="#stack">{copy.nav.stack}</a>
              <a href="#about">{copy.nav.about}</a>
              <a href="#contact">{copy.nav.contact}</a>
            </nav>
            <div className="hero-nav-tools">
              <div className="language-switcher" role="group" aria-label={copy.languageLabel}>
                {(["ru", "en", "uz"] as Locale[]).map((item) => (
                  <button className={locale === item ? "active" : ""} type="button" onClick={() => changeLocale(item)} key={item} aria-pressed={locale === item}>{item}</button>
                ))}
              </div>
              <ThemeToggle lightLabel={copy.themeLight} darkLabel={copy.themeDark} />
            </div>
            <button
              className="mobile-menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? copy.menuClose : copy.menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
            >
              <Menu aria-hidden="true" />
            </button>
          </div>
        }
      />

      <div className={`mobile-menu${menuOpen ? " open" : ""}`} id="mobile-menu" aria-hidden={!menuOpen}>
        <button className="mobile-menu-backdrop" type="button" aria-label={copy.menuClose} onClick={() => setMenuOpen(false)} />
        <div className="mobile-menu-card" role="dialog" aria-modal="true" aria-label={copy.navigationLabel}>
          <div className="mobile-menu-header">
            <div>
              <span className="mobile-menu-eyebrow">IBRAGIM / MENU</span>
              <strong>FULL-STACK · TASHKENT</strong>
            </div>
            <button className="mobile-menu-close" type="button" aria-label={copy.menuClose} onClick={() => setMenuOpen(false)}><X aria-hidden="true" /></button>
          </div>
          <nav aria-label={copy.navigationLabel}>
            {[
              ["01", "#work", copy.nav.projects],
              ["02", "#stack", copy.nav.stack],
              ["03", "#about", copy.nav.about],
              ["04", "#contact", copy.nav.contact],
            ].map(([number, href, label]) => (
              <a href={href} onClick={() => setMenuOpen(false)} key={href}>
                <small>{number}</small><span>{label}</span><i><ArrowDownRight aria-hidden="true" /></i>
              </a>
            ))}
          </nav>
          <a className="mobile-menu-contact" href="#contact" onClick={() => setMenuOpen(false)}>
            <span className="status-dot" /><b>{copy.availability}</b><ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <section className="work section" id="work">
        <div className="section-heading">
          <div><p className="section-kicker">{copy.work.kicker}</p><h2>{copy.work.title}<br /><em>{copy.work.accent}</em></h2></div>
          <p className="section-note">{copy.work.note}</p>
        </div>

        <article className="featured-project">
          <div className="featured-stage">
            <LeadoraVisual locale={locale} />
            <div className="featured-stage-meta"><span>LIVE PRODUCT</span><a href="https://leadora.uz" target="_blank" rel="noreferrer">leadora.uz <ArrowUpRight aria-hidden="true" /></a></div>
          </div>
          <div className="featured-copy">
            <div className="project-index"><span>{featuredProject.number}</span><span>{featuredProject.eyebrow}</span></div>
            <p className="project-name">{featuredProject.title}</p>
            <h3>{featuredProject.headline}</h3>
            <p className="project-description">{featuredProject.description}</p>
            <p className="project-role">{featuredProject.role}</p>
            <ul>{featuredProject.stack.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="featured-actions">
              <a className="button button-primary" href={`/projects/${projectSlugs[0]}`}>{copy.work.details} <ArrowRight aria-hidden="true" /></a>
              <a className="button button-quiet" href="https://leadora.uz" target="_blank" rel="noreferrer">Live <ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>
        </article>

        <div className="project-gallery">
          {compactProjects.map((project, index) => (
            <a className="project-text-card" href={`/projects/${projectSlugs[index + 1]}`} key={project.number} aria-label={`${project.title}: ${copy.work.details}`}>
              <span className="project-text-number">{project.number}</span>
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <span className="project-text-arrow" aria-hidden="true"><ArrowUpRight /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="stack section" id="stack">
        <div className="section-heading">
          <div><p className="section-kicker">{copy.stack.kicker}</p><h2>{copy.stack.title}<br /><em>{copy.stack.accent}</em></h2></div>
          <p className="section-note">{copy.stack.note}</p>
        </div>
        <div className="stack-explorer">
          <div className="stack-tabs" role="tablist" aria-label={copy.stack.kicker}>
            {copy.stack.groups.map((group, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeStack === index}
                className={activeStack === index ? "active" : ""}
                onClick={() => setActiveStack(index)}
                key={group.index}
              >
                <span>{group.index}</span><b>{group.title}</b><small>{group.label}</small><i><ArrowDownRight aria-hidden="true" /></i>
              </button>
            ))}
          </div>
          <article className="stack-panel" role="tabpanel">
            <div className="stack-panel-copy">
              <div className="stack-card-top"><span>{copy.stack.groups[activeStack].index}</span><span>{copy.stack.groups[activeStack].label}</span></div>
              <h3>{copy.stack.groups[activeStack].title}</h3>
              <p>{copy.stack.groups[activeStack].description}</p>
              <ul>{copy.stack.groups[activeStack].items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="stack-visual" aria-hidden="true">
              <div className="stack-core">{copy.stack.groups[activeStack].title.slice(0, 2).toUpperCase()}</div>
              {copy.stack.groups[activeStack].items.slice(0, 6).map((item, index) => <span style={{ "--stack-i": index } as React.CSSProperties} key={item}>{item}</span>)}
            </div>
          </article>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="about-photo">
          <div className="about-photo-frame">
            <Image src="/portrait.jpg" alt={copy.about.photoAlt} width={1086} height={1448} sizes="(max-width: 760px) calc(100vw - 36px), 38vw" />
            <span className="about-photo-label">{copy.about.photoLabel}</span>
          </div>
          <span className="about-photo-index" aria-hidden="true">IK / PORTRAIT</span>
          <div className="about-float about-float-main"><b>FULL</b><span>STACK</span></div>
          <div className="about-float about-float-status"><i /><span>{copy.about.facts[2]}</span></div>
        </div>
        <div className="about-copy">
          <p className="section-kicker">{copy.about.kicker}</p>
          <h2>{copy.about.title}<br /><em>{copy.about.accent}</em></h2>
          <p className="about-lead">{copy.about.text}</p>
          <p className="about-note">{copy.about.note}</p>
          <ul aria-label={copy.about.kicker}>
            {copy.about.facts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>
          <div className="about-cv-card">
            <span className="about-cv-icon" aria-hidden="true"><FileText /></span>
            <span className="about-cv-copy">
              <small>{copy.about.cvLabel}</small>
              <strong>{copy.about.cvMeta}</strong>
            </span>
            <span className="about-cv-actions">
              <a className="about-cv-view" href="/Ibrohim-Kadamjanov-CV.pdf" target="_blank" rel="noreferrer">
                {copy.about.cvView}<ArrowUpRight aria-hidden="true" />
              </a>
              <a
                className="about-cv-download"
                href="/Ibrohim-Kadamjanov-CV.pdf"
                download="Ibrohim-Kadamjanov-CV.pdf"
                aria-label={copy.about.cvDownload}
                title={copy.about.cvDownload}
              >
                <Download aria-hidden="true" />
              </a>
            </span>
          </div>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-status"><span className="status-dot" /> {copy.availability}</div>
        <div className="contact-inner">
          <div className="contact-title"><p className="contact-overline">{copy.contact.overline}</p><h2>{copy.contact.title}<br /><em>{copy.contact.accent}</em></h2></div>
          <div className="contact-side">
            <a className="contact-arrow" href="mailto:gomimih@gmail.com" aria-label="Email"><ArrowUpRight aria-hidden="true" /></a>
            <p>{copy.contact.text}</p>
            <div className="contact-links">
              <a href="https://t.me/gomimih" target="_blank" rel="noreferrer"><span>Telegram</span><b>@gomimih</b><i><ArrowUpRight aria-hidden="true" /></i></a>
              <a href="mailto:gomimih@gmail.com"><span>Email</span><b>gomimih@gmail.com</b><i><ArrowUpRight aria-hidden="true" /></i></a>
              <a href="https://github.com/Ibrakam" target="_blank" rel="noreferrer"><span>GitHub</span><b>/Ibrakam</b><i><ArrowUpRight aria-hidden="true" /></i></a>
            </div>
          </div>
        </div>
        <footer><span>{copy.fullName.toUpperCase()} © 2026</span><span>FULL-STACK · TASHKENT · REMOTE</span><a href="#top">{copy.contact.back} ↑</a></footer>
      </section>
    </main>
  );
}
