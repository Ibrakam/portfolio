"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { useRef, type CSSProperties, type ReactNode } from "react";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: CSSProperties;
}

export function WordsPullUp({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <span ref={ref} className={`words-pull-up ${className}`} style={style} aria-hidden="true">
      {words.map((word, index) => {
        const isLast = index === words.length - 1;

        return (
          <motion.span
            key={`${word}-${index}`}
            initial={reduceMotion ? false : { y: "0.28em", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="words-pull-up-item"
            style={{ marginRight: isLast ? 0 : "0.22em" }}
          >
            {word}
            {showAsterisk && isLast && <span className="hero-asterisk">*</span>}
          </motion.span>
        );
      })}
    </span>
  );
}

interface PrismaHeroProps {
  fullName: string;
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  projectsCta: string;
  contactCta: string;
  availability: string;
  disciplinesLabel: string;
  disciplines: ReadonlyArray<readonly [string, string]>;
  navigation: ReactNode;
}

const heroVideo = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

export function PrismaHero({
  fullName,
  eyebrow,
  title,
  accent,
  intro,
  projectsCta,
  contactCta,
  availability,
  disciplinesLabel,
  disciplines,
  navigation,
}: PrismaHeroProps) {
  const firstName = fullName.split(" ")[0];

  return (
    <section className="hero-prisma" id="top" aria-labelledby="hero-title">
      <div className="hero-prisma-frame">
        <video className="hero-prisma-video" autoPlay loop muted playsInline preload="metadata" src={heroVideo} aria-hidden="true" tabIndex={-1} />
        <div className="hero-prisma-noise" aria-hidden="true" />
        <div className="hero-prisma-shade" aria-hidden="true" />

        <div className="hero-prisma-navigation">{navigation}</div>

        <div className="hero-prisma-topline">
          <p><span>01</span>{eyebrow}</p>
          <p className="hero-prisma-available"><i />{availability}</p>
        </div>

        <div className="hero-prisma-content">
          <div className="hero-prisma-title-block">
            <motion.p
              className="hero-prisma-promise"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {title} <em>{accent}</em>
            </motion.p>
            <h1 id="hero-title">
              <span className="sr-only">{fullName} — {title} {accent}</span>
              <WordsPullUp text={firstName} showAsterisk />
            </h1>
            <div className="hero-prisma-disciplines" aria-label={disciplinesLabel}>
              {disciplines.map(([label, value]) => <span key={label}><b>{label}</b><small>{value}</small></span>)}
            </div>
          </div>

          <motion.div
            className="hero-prisma-intro"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="hero-prisma-fullname">{fullName} · Full-stack developer</p>
            <p>{intro}</p>
            <div className="hero-prisma-actions">
              <a className="hero-prisma-primary" href="#work">
                {projectsCta}
                <span><ArrowRight aria-hidden="true" /></span>
              </a>
              <a className="hero-prisma-secondary" href="#contact">{contactCta}<ArrowDownRight aria-hidden="true" /></a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
