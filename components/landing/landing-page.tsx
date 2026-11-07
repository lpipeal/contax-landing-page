"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import content, { type Language } from "./content";
import { LandingDialog, type DialogView } from "./dialog";
import { SymbolLibrary, WorldMap } from "./graphics";
import {
  Arrow,
  CheckList,
  external,
  Growth,
  Icon,
  Lines,
  Logo,
  Ornament,
  plain,
  SectionHeading,
  VideoArtwork,
} from "./ui";

const navIds = [
  "home",
  "services",
  "about",
  "industries",
  "resources",
  "contact",
];
export default function LandingPage({ language }: { language: Language }) {
  const copy = content[language];
  const contact = content.contact;
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [dialog, setDialog] = useState<DialogView | null>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const dialogOpener = useRef<HTMLElement | null>(null);
  const wa = (message = copy.whatsappMessage) =>
    `${contact.whatsapp}?text=${encodeURIComponent(message)}`;
  const open = (view: DialogView) => {
    if (!dialog)
      dialogOpener.current = menuOpen
        ? menuToggle.current
        : document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
    setMenuOpen(false);
    setDialog(view);
  };
  const consult = () => open({ type: "consultation" });
  useEffect(() => {
    document.documentElement.lang = language;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-10% 0px -45% 0px", threshold: [0, 0.2, 0.5] },
    );
    navIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [language]);
  useEffect(() => {
    if (!menuOpen) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggle.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1061px)");
    const resize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", escape);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", escape);
      desktop.removeEventListener("change", resize);
    };
  }, [menuOpen]);
  const navLinks = () =>
    copy.nav.map((label, index) => (
      <a
        key={navIds[index]}
        href={`#${navIds[index]}`}
        aria-current={active === navIds[index] ? "location" : undefined}
        onClick={() => setMenuOpen(false)}
      >
        {label}
        {index === 1 && (
          <span className="chevron" aria-hidden="true">
            ⌄
          </span>
        )}
      </a>
    ));
  return (
    <>
      <SymbolLibrary />
      <a className="skip-link" href="#main">
        {copy.skip}
      </a>
      <header className="hero" id="home">
        <div className="container nav-wrap">
          <a
            className="brand"
            href="#home"
            aria-label={`Contax Business Solutions · ${copy.nav[0]}`}
          >
            <Logo />
          </a>
          <nav className="desktop-nav" aria-label={copy.navigation}>
            {navLinks()}
          </nav>
          <div className="nav-actions">
            <div
              className="language-switch"
              role="group"
              aria-label={copy.language}
            >
              <Link
                href="/"
                lang="es"
                hrefLang="es"
                aria-label="Español"
                aria-current={language === "es" ? "page" : undefined}
              >
                ES
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href="/en"
                lang="en"
                hrefLang="en"
                aria-label="English"
                aria-current={language === "en" ? "page" : undefined}
              >
                EN
              </Link>
            </div>
            <button className="button button-gold nav-cta" onClick={consult}>
              {copy.schedule}
            </button>
            <button
              ref={menuToggle}
              className="menu-toggle"
              aria-label={menuOpen ? copy.closeMenu : copy.menu}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        <nav
          className="mobile-nav"
          id="mobile-nav"
          aria-label={copy.navigation}
          hidden={!menuOpen}
        >
          {navLinks()}
          <button className="button button-gold" onClick={consult}>
            {copy.schedule}
          </button>
        </nav>
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>
              <Lines text={copy.hero} />
              <em>{copy.heroAccent}</em>
            </h1>
            <Ornament />
            <p>{copy.heroText}</p>
            <div className="button-row">
              <button className="button button-gold" onClick={consult}>
                {copy.schedule}
                <Arrow />
              </button>
              <a className="button button-outline" href="#services">
                {copy.discover}
                <Arrow />
              </a>
            </div>
          </div>
          <div className="hero-art">
            <Growth priority />
          </div>
        </div>
        <svg
          className="hero-wave"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 303C260 154 725 252 1100 177C1299 137 1394 53 1440 0V320H0Z"
            fill="#c79745"
          />
          <path
            d="M0 317C260 168 725 266 1100 191C1299 151 1394 67 1440 14V320H0Z"
            fill="#f9f8f5"
          />
        </svg>
      </header>
      <main id="main" tabIndex={-1}>
        <section className="services section" id="services">
          <div className="container">
            <SectionHeading>{copy.servicesTitle}</SectionHeading>
            <div className="service-grid">
              {copy.services.map((service) => (
                <article className="service-card" key={service.id}>
                  <span className="service-icon">
                    <Icon name={service.icon} />
                  </span>
                  <h3>
                    <Lines text={service.title} />
                  </h3>
                  <p>{service.text}</p>
                  <button
                    className="card-action"
                    onClick={() => open({ type: "service", id: service.id })}
                    aria-label={`${plain(service.title)}: ${copy.read}`}
                  >
                    <Arrow />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="coverage section" id="coverage">
          <div className="container coverage-layout">
            <div className="coverage-main">
              <h2>
                <Lines text={copy.coverageTitle} />
              </h2>
              <Ornament />
              <div className="country-grid">
                {copy.countries.map((country) => (
                  <article className="country-card" key={country.id}>
                    <h3>
                      <span className="flag" aria-hidden="true">
                        {country.flag}
                      </span>
                      {country.name}
                    </h3>
                    <p>{country.text}</p>
                    <CheckList items={country.items} />
                  </article>
                ))}
              </div>
            </div>
            <WorldMap label={copy.mapLabel} note={copy.mapNote} />
          </div>
        </section>
        <section className="planning" id="tax-planning">
          <div className="container planning-layout">
            <div className="planning-copy">
              <h2>
                <Lines text={copy.planningTitle} />
              </h2>
              <p>{copy.planningText}</p>
              <div className="planning-comparison">
                <div>
                  <h3>{copy.preparation}</h3>
                  <p>{copy.preparationText}</p>
                </div>
                <span aria-hidden="true">✦</span>
                <div>
                  <h3>{copy.planning}</h3>
                  <p>{copy.planningBrief}</p>
                </div>
              </div>
            </div>
            <div className="planning-seal" aria-hidden="true">
              <Icon name="document" />
              <span>
                <Icon name="check" />
              </span>
            </div>
            <div className="planning-panel">
              <CheckList items={copy.planningPoints} />
              <a
                className="button button-gold"
                href={wa(copy.planningMessage)}
                {...external}
              >
                {copy.planningCta}
                <Arrow />
              </a>
            </div>
          </div>
        </section>
        <section className="resources section" id="resources">
          <div className="container">
            <SectionHeading>{copy.resourcesTitle}</SectionHeading>
            <div className="resource-grid">
              <article className="resource-card resource-featured">
                <div className="featured-content">
                  <div className="reel-meta">
                    <span>{copy.reelLabel}</span>
                    <Icon name="instagram" />
                    <span>{contact.handle}</span>
                  </div>
                  <h3>
                    <Lines text={copy.planningResource} />
                  </h3>
                  <p>{copy.planningResourceText}</p>
                  <span className="featured-play" aria-hidden="true">
                    <Icon name="play" />
                  </span>
                  <Image
                    className="resource-watermark"
                    src="/contax/contax-isotype.png"
                    width={800}
                    height={820}
                    alt=""
                  />
                </div>
                <a className="resource-link" href={contact.reel} {...external}>
                  {copy.viewReel}
                  <Arrow />
                </a>
              </article>
              {copy.resources.map((resource) => (
                <article className="resource-card" key={resource.id}>
                  <div className="resource-meta">
                    <span>{resource.type}</span>
                    <small>{resource.country}</small>
                  </div>
                  <h3>{resource.title}</h3>
                  <p>{resource.text}</p>
                  <button
                    className="text-link"
                    onClick={() => open({ type: "resource", id: resource.id })}
                  >
                    {copy.read}
                    <Arrow />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="videos section" id="videos">
          <div className="container">
            <SectionHeading>{copy.learnTitle}</SectionHeading>
            <div className="video-grid">
              {copy.videos.map((video, index) => (
                <article
                  className={`video-card ${index === 0 ? "video-featured" : ""}`}
                  key={video.id}
                >
                  <button
                    className="video-open"
                    onClick={() => open({ type: "video", id: video.id })}
                    aria-label={video.title}
                  >
                    <VideoArtwork
                      video={video}
                      featured={index === 0}
                      origin={copy.reelLabel}
                    />
                    {index > 0 && <h3>{video.title}</h3>}
                    <span className="category-label">{video.category}</span>
                  </button>
                </article>
              ))}
            </div>
            <a
              className="text-link center-link"
              href={contact.instagram}
              {...external}
            >
              {copy.allVideos}
              <Arrow />
            </a>
          </div>
        </section>
        <section className="why section" id="about">
          <div className="container why-layout">
            <div className="why-content">
              <p className="eyebrow">{copy.whyEyebrow}</p>
              <h2>
                <Lines text={copy.whyTitle} />
              </h2>
              <Ornament />
              <div className="reason-grid">
                {copy.reasons.map(([image, title, text]) => (
                  <article key={title}>
                    <span className="reason-icon">
                      <Icon name={image} />
                    </span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <Image
              className="why-watermark"
              src="/contax/contax-isotype.png"
              width={800}
              height={820}
              alt=""
            />
          </div>
        </section>
        <section className="process section" id="process">
          <div className="container">
            <SectionHeading>{copy.processTitle}</SectionHeading>
            <ol className="process-grid">
              {copy.steps.map(([title, text], index) => (
                <li key={title}>
                  <span className="step-number">{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="industries section" id="industries">
          <div className="container">
            <SectionHeading>{copy.industriesTitle}</SectionHeading>
            <div className="industry-grid">
              {copy.industries.map(([image, title]) => (
                <div key={title}>
                  <Icon name={image} />
                  <h3>{title}</h3>
                </div>
              ))}
            </div>
            <p className="industry-note">{copy.industriesNote}</p>
          </div>
        </section>
        <section
          className="social-proof"
          aria-label={`${copy.partners} · ${copy.testimonials}`}
        >
          <div className="container proof-grid">
            {[
              [copy.partners, "handshake", copy.partnersPending],
              [copy.testimonials, "comments", copy.testimonialsPending],
            ].map(([title, icon, text]) => (
              <div className="proof-placeholder" key={title}>
                <h2>{title}</h2>
                <div>
                  <Icon name={icon} />
                  <p>
                    <strong>{copy.soon}</strong>
                    <span>{text}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="contact-section" id="contact">
          <div className="container contact-layout">
            <div>
              <h2>{copy.ctaTitle}</h2>
              <p>{copy.ctaText}</p>
              <div className="contact-actions">
                <button className="button button-gold" onClick={consult}>
                  {copy.schedule}
                  <Arrow />
                </button>
                <a href={wa()} {...external}>
                  <Icon name="whatsapp" />
                  {copy.whatsapp}
                </a>
                <a href={`mailto:${contact.email}`}>
                  <Icon name="mail" />
                  {copy.email}
                </a>
              </div>
            </div>
            <div className="contact-art">
              <Growth />
            </div>
          </div>
          <svg
            className="contact-wave"
            viewBox="0 0 500 300"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 300C215 278 415 175 500 0V300Z" fill="#bf8d37" />
            <path d="M0 300C218 286 418 184 500 12V300Z" fill="#f9f8f5" />
            <path d="M140 300C295 264 449 171 500 88V300Z" fill="#006376" />
          </svg>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a
              className="brand"
              href="#home"
              aria-label={`Contax · ${copy.backTop}`}
            >
              <Logo lazy />
            </a>
            <p>{copy.footerText}</p>
            <div className="social-links">
              <a
                href={contact.instagram}
                {...external}
                aria-label={`Instagram ${contact.handle}`}
              >
                <Icon name="instagram" />
              </a>
              <a
                href={wa()}
                {...external}
                aria-label={`WhatsApp ${contact.phone}`}
              >
                <Icon name="whatsapp" />
              </a>
            </div>
          </div>
          <div className="footer-column">
            <h2>{copy.navigation}</h2>
            {copy.nav.map((label, index) => (
              <a key={label} href={`#${navIds[index]}`}>
                {label}
              </a>
            ))}
          </div>
          <div className="footer-column">
            <h2>{copy.servicesTitle}</h2>
            {copy.services.map((service) => (
              <button
                key={service.id}
                onClick={() => open({ type: "service", id: service.id })}
              >
                {plain(service.title)}
              </button>
            ))}
          </div>
          <div className="footer-column footer-contact">
            <h2>{copy.contact}</h2>
            <a href={contact.telephone}>
              <Icon name="phone" />
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`}>
              <Icon name="mail" />
              {contact.email}
            </a>
            <span>
              <Icon name="location" />
              {copy.location}
            </span>
            <span>
              <Icon name="clock" />
              {copy.hours}
            </span>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>
            © {new Date().getFullYear()} Contax Business Solutions LLC.{" "}
            {copy.rights}
          </p>
          <div>
            <button onClick={() => open({ type: "legal", id: "privacy" })}>
              {copy.privacy}
            </button>
            <span aria-hidden="true">|</span>
            <button onClick={() => open({ type: "legal", id: "terms" })}>
              {copy.terms}
            </button>
          </div>
        </div>
      </footer>
      <LandingDialog
        language={language}
        view={dialog}
        onClose={() => {
          setDialog(null);
          dialogOpener.current?.focus({ preventScroll: true });
        }}
        onConsult={(id) => open({ type: "consultation", id })}
      />
    </>
  );
}
