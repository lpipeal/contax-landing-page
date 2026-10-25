/* Buildless, standalone prototype. All content comes from content.js. */
(() => {
  "use strict";
  const { contact } = window.CONTAX;
  const app = document.getElementById("app");
  const dialog = document.getElementById("dialog");
  const announcer = document.getElementById("announcer");
  const navIds = ["home", "services", "about", "industries", "resources", "contact"];
  let language = "es";
  let observer;
  let dialogOpener;
  try {
    const requested = new URLSearchParams(location.search).get("lang");
    const stored = localStorage.getItem("contax-prototype-language");
    language = ["es", "en"].includes(requested) ? requested : stored === "en" ? "en" : "es";
  } catch { /* Local files can block storage; Spanish remains available. */ }
  const t = () => window.CONTAX[language];
  const plain = (text) => text.replace(/<br\s*\/?\s*>/g, " ");
  const icon = (name, extra = "") => `<svg class="icon ${extra}" viewBox="0 0 32 32" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
  const arrow = () => icon("arrow", "arrow");
  const whatsapp = (message = t().whatsappMessage) => `${contact.whatsapp}?text=${encodeURIComponent(message)}`;
  const external = 'target="_blank" rel="noopener noreferrer"';
  const ornament = () => '<span class="ornament" aria-hidden="true"><i></i><b>✦</b><i></i></span>';
  const sectionHeading = (title) => `<div class="section-heading"><h2>${title}</h2>${ornament()}</div>`;

  function symbols() {
    return `<svg class="symbol-library" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>
      <symbol id="i-arrow" viewBox="0 0 32 32"><path d="M5 16h21m-6-6 6 6-6 6"/></symbol>
      <symbol id="i-close" viewBox="0 0 32 32"><path d="m9 9 14 14M23 9 9 23"/></symbol>
      <symbol id="i-check" viewBox="0 0 32 32"><circle cx="16" cy="16" r="11"/><path d="m10 16 4 4 9-10"/></symbol>
      <symbol id="i-document" viewBox="0 0 32 32"><path d="M7 3h12l6 6v20H7zM19 3v7h6M11 14h10m-10 5h10m-10 5h6"/><path d="M3 8v19h1m18 5h7V12"/></symbol>
      <symbol id="i-tax" viewBox="0 0 32 32"><rect x="6" y="4" width="20" height="25" rx="1"/><path d="M11 2v4m10-4v4M9 10h14m-14 5h5m-5 5h5m-5 5h5"/><rect x="18" y="15" width="5" height="10" rx="1"/></symbol>
      <symbol id="i-building" viewBox="0 0 32 32"><path d="M7 29V8h17v21M12 8V3h7v5M3 29h25M13 29v-6h5v6M11 12h2m5 0h2m-9 5h2m5 0h2m-9 5h2m5 0h2"/></symbol>
      <symbol id="i-people" viewBox="0 0 32 32"><circle cx="16" cy="7" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="26" cy="12" r="3"/><path d="M11 28V16c0-4 10-4 10 0v12M2 28v-8c0-4 7-4 7-1m14 0c0-3 7-3 7 1v8M16 19v10"/></symbol>
      <symbol id="i-chart" viewBox="0 0 32 32"><path d="M3 29h26M6 25v-7h5v7m4 0V13h5v12m4 0V7h5v18M4 13l7-6 6 2 9-7m-6 0h6v6"/></symbol>
      <symbol id="i-globe" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13"/><ellipse cx="16" cy="16" rx="6" ry="13"/><path d="M3 16h26M6 8c6 4 14 4 20 0M6 24c6-4 14-4 20 0"/></symbol>
      <symbol id="i-shield" viewBox="0 0 32 32"><path d="m16 3 11 4v8c0 6-5 11-11 14C10 26 5 21 5 15V7z"/><path d="m10 15 4 4 8-9"/></symbol>
      <symbol id="i-technology" viewBox="0 0 32 32"><rect x="4" y="4" width="24" height="18" rx="2"/><path d="M11 28h10m-5-6v6M8 9h6m-6 4h10m-10 4h7m7-7 3 3-3 3"/></symbol>
      <symbol id="i-cart" viewBox="0 0 32 32"><path d="M3 4h4l4 17h14l4-12H9M12 13h13m-12 4h11M14 9l1 12m6-12-1 12"/><circle cx="13" cy="27" r="2"/><circle cx="24" cy="27" r="2"/></symbol>
      <symbol id="i-helmet" viewBox="0 0 32 32"><path d="M4 23v-4c0-6 5-11 12-11s12 5 12 11v4M12 15V5h8v10M7 23h18M2 23h28v5H2zM8 10v7m16-7v7"/></symbol>
      <symbol id="i-heart" viewBox="0 0 32 32"><path d="M16 28 4 16C-3 7 8-1 16 8 24-1 35 7 28 16Z"/><path d="M6 16h5l3-6 4 12 3-6h5"/></symbol>
      <symbol id="i-cutlery" viewBox="0 0 32 32"><path d="M5 3v9c0 4 8 4 8 0V3M9 3v26M23 3c-4 5-6 11-5 16h7M25 3v26"/></symbol>
      <symbol id="i-briefcase" viewBox="0 0 32 32"><rect x="3" y="9" width="26" height="19" rx="2"/><path d="M11 9V4h10v5M3 16c8 5 18 5 26 0M14 17h4v5h-4z"/></symbol>
      <symbol id="i-gear" viewBox="0 0 32 32"><path d="m13 3 6 0 1 4 4 2 4-1 3 5-3 3v4l2 3-4 5-4-2-3 1-1 4h-6l-1-4-4-2-4 1-2-5 3-3v-4L2 11l4-5 4 2 3-1z"/><circle cx="16" cy="17" r="5"/></symbol>
      <symbol id="i-store" viewBox="0 0 32 32"><rect x="3" y="5" width="26" height="20" rx="2"/><path d="M3 10h26M3 21h26m-13 4v4m-5 0h10M7 14h4v4H7m8-4h10m-10 4h6"/></symbol>
      <symbol id="i-handshake" viewBox="0 0 32 32"><path d="m2 14 6-9 5 3 5-2 12 8-5 9-5 5-11-6zM13 8l-4 6 4 3 5-5 8 8M5 18l4-5m7 7 6 5m-10-2 5 5"/></symbol>
      <symbol id="i-comments" viewBox="0 0 32 32"><path d="M4 4h24v17H16l-7 6v-6H4zM9 10h14m-14 5h9"/></symbol>
      <symbol id="i-mail" viewBox="0 0 32 32"><rect x="3" y="6" width="26" height="20" rx="1"/><path d="m4 7 12 11L28 7M4 25l9-9m15 9-9-9"/></symbol>
      <symbol id="i-phone" viewBox="0 0 32 32"><path d="m6 3 6 2-1 7-4 1c3 6 6 9 12 12l1-5 7-1 2 6c-1 8-10 5-18-3C3 14 0 6 6 3z"/></symbol>
      <symbol id="i-location" viewBox="0 0 32 32"><path d="M16 30S5 20 5 12a11 11 0 0 1 22 0c0 8-11 18-11 18z"/><circle cx="16" cy="12" r="4"/></symbol>
      <symbol id="i-clock" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13"/><path d="M16 7v10h7"/></symbol>
      <symbol id="i-instagram" viewBox="0 0 32 32"><rect x="4" y="4" width="24" height="24" rx="7"/><circle cx="16" cy="16" r="6"/><circle cx="23" cy="9" r="1"/></symbol>
      <symbol id="i-whatsapp" viewBox="0 0 32 32"><path d="m4 29 2-8A13 13 0 1 1 12 28z"/><path d="m12 9 3 4-2 2c1 3 3 5 6 6l2-3 4 3c-2 7-14 0-16-7-1-3 0-4 3-5z"/></symbol>
      <symbol id="i-play" viewBox="0 0 32 32"><path d="m12 7 14 9-14 9z" fill="currentColor" stroke="none"/></symbol>
      <symbol id="i-coins" viewBox="0 0 32 32"><ellipse cx="11" cy="20" rx="8" ry="4"/><path d="M3 20v5c0 5 16 5 16 0v-5M3 15v5m16-5v5"/><ellipse cx="11" cy="15" rx="8" ry="4"/><ellipse cx="23" cy="6" rx="7" ry="3"/><path d="M16 6v4c0 4 14 4 14 0V6m-9 8v10c3 2 9 0 9-3V10"/></symbol>
    </defs></svg>`;
  }

  function worldMap() {
    return `<div class="coverage-map" role="img" aria-label="${t().mapLabel}">
      <svg viewBox="0 0 480 280" aria-hidden="true"><defs>
        <pattern id="map-dots" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#cbd0ce"/></pattern>
        <pattern id="us-dots" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#1b8b9a"/></pattern>
        <radialGradient id="pin-gold" cx=".3" cy=".2"><stop stop-color="#ffe0a0"/><stop offset="1" stop-color="#b47f2c"/></radialGradient>
      </defs><g fill="url(#map-dots)">
        <path d="m28 55 18-16 40-7 13-13 38 5 8 16 28 5-1 24-25 19-7 20-17 6-3 21-14-2-4-22-25-5-16-25-23-5-10-11zM57 33l-28 4-10 19 13 5 14-15zM159 14l28-8 27 12-6 21-19 15-18-12z"/>
        <path d="m125 141 20-2 19 15 17 6 9 23-12 19-7 23-14 22-5 21-9-13-4-31-12-23 3-24-12-15z"/>
        <path d="m226 58 17-14 20 6 8 13-7 11-18-1-10 13-19-5 3-12zM223 91l31-7 28 17 11 25-14 20-5 34-16 19-14-11-8-34-16-15-8-27z"/>
        <path d="m273 48 16-13 34-6 35 6 22-6 50 19 23 5-3 25-24 11-8 24-23 4-14-14-11 15-16-6-8 17-14-20-21-12-18 1-8-16-26-8zM302 113l14 8 2 32-10-5-12-22zM341 122l21 5 14 24-10 10-14-15zM385 133l8 11-4 18-10-9zM414 94l5-15 6 16-5 14z"/>
        <path d="m373 194 26-13 25 6 13 22-10 20-36 2-22-13zM440 230l7-10 6 8-8 15zM284 184l6-8 3 18-8 10z"/>
      </g><path d="m61 79 52-6 26 11-9 20-17 7-5-9-28-2z" fill="url(#us-dots)"/>
      <path d="M106 99Q116 119 140 155" stroke="#c49748" stroke-width="1" stroke-dasharray="3 5" opacity=".6"/>
      <g transform="translate(105 91)"><ellipse cy="16" rx="10" ry="3" fill="#042543" opacity=".13"/><path d="M0 16S-9 6-9 0a9 9 0 0 1 18 0C9 6 0 16 0 16z" fill="#064867" stroke="#f4f1e7" stroke-width="2"/><circle r="4.5" fill="url(#pin-gold)"/></g>
      <g transform="translate(143 157)"><ellipse cy="16" rx="10" ry="3" fill="#042543" opacity=".13"/><path d="M0 16S-9 6-9 0a9 9 0 0 1 18 0C9 6 0 16 0 16z" fill="#064867" stroke="#f4f1e7" stroke-width="2"/><circle r="4.5" fill="url(#pin-gold)"/></g></svg><p>${t().mapNote}</p></div>`;
  }

  function videoArtwork(video, featured = false) {
    return `<div class="video-art art-${video.theme}">${video.theme === "planning" || video.theme === "company" ? '<img src="assets/growth-scene.svg" alt="" loading="lazy">' : `<span class="video-illustration">${icon(video.theme === "coins" ? "coins" : "document")}</span>`}<span class="art-grid" aria-hidden="true"></span>${featured ? `<span class="video-origin">${t().reelLabel}</span>` : ""}<span class="play-circle">${icon("play")}</span>${featured ? `<h3>${video.title}</h3>` : ""}</div>`;
  }

  function render() {
    observer?.disconnect();
    const copy = t();
    document.documentElement.lang = language;
    document.title = language === "es" ? "Contax · Prototipo de landing page" : "Contax · Landing page prototype";
    app.innerHTML = `${symbols()}
      <a class="skip-link" href="#main">${copy.skip}</a>
      <header class="hero" id="home">
        <div class="container nav-wrap">
          <a class="brand" href="#home" aria-label="Contax Business Solutions · ${copy.nav[0]}"><img src="assets/contax-logo-gold-outline.svg" width="1485" height="352" alt="Contax Business Solutions" fetchpriority="high"></a>
          <nav class="desktop-nav" aria-label="${copy.navigation}">${copy.nav.map((label, index) => `<a href="#${navIds[index]}" ${index === 0 ? 'aria-current="location"' : ""}>${label}${index === 1 ? '<span class="chevron" aria-hidden="true">⌄</span>' : ""}</a>`).join("")}</nav>
          <div class="nav-actions"><div class="language-switch" role="group" aria-label="${copy.language}"><button data-language="es" aria-pressed="${language === "es"}">ES</button><span aria-hidden="true">/</span><button data-language="en" aria-pressed="${language === "en"}">EN</button></div><button class="button button-gold nav-cta" data-consult>${copy.schedule}</button><button class="menu-toggle" aria-label="${copy.menu}" aria-expanded="false" aria-controls="mobile-nav"><span></span><span></span></button></div>
        </div>
        <nav class="mobile-nav" id="mobile-nav" aria-label="${copy.navigation}" hidden>${copy.nav.map((label, index) => `<a href="#${navIds[index]}">${label}</a>`).join("")}<button class="button button-gold" data-consult>${copy.schedule}</button></nav>
        <div class="container hero-grid"><div class="hero-copy"><h1>${copy.hero}<em>${copy.heroAccent}</em></h1>${ornament()}<p>${copy.heroText}</p><div class="button-row"><button class="button button-gold" data-consult>${copy.schedule}${arrow()}</button><a class="button button-outline" href="#services">${copy.discover}${arrow()}</a></div></div><div class="hero-art"><img src="assets/growth-scene.svg" width="600" height="510" alt="" fetchpriority="high"></div></div>
        <svg class="hero-wave" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true"><path d="M0 303C260 154 725 252 1100 177C1299 137 1394 53 1440 0V320H0Z" fill="#c79745"/><path d="M0 317C260 168 725 266 1100 191C1299 151 1394 67 1440 14V320H0Z" fill="#f9f8f5"/></svg>
      </header>
      <main id="main" tabindex="-1">
        <section class="services section" id="services"><div class="container">${sectionHeading(copy.servicesTitle)}<div class="service-grid">${copy.services.map((service) => `<article class="service-card"><span class="service-icon">${icon(service.icon)}</span><h3>${service.title}</h3><p>${service.text}</p><button class="card-action" data-service="${service.id}" aria-label="${plain(service.title)}: ${copy.read}">${arrow()}</button></article>`).join("")}</div></div></section>
        <section class="coverage section" id="coverage"><div class="container coverage-layout"><div class="coverage-main"><h2>${copy.coverageTitle}</h2>${ornament()}<div class="country-grid">${copy.countries.map((country) => `<article class="country-card"><h3><span class="flag" aria-hidden="true">${country.flag}</span>${country.name}</h3><p>${country.text}</p><ul class="check-list">${country.items.map((item) => `<li>${icon("check")}<span>${item}</span></li>`).join("")}</ul></article>`).join("")}</div></div>${worldMap()}</div></section>
        <section class="planning" id="tax-planning"><div class="container planning-layout"><div class="planning-copy"><h2>${copy.planningTitle}</h2><p>${copy.planningText}</p><div class="planning-comparison"><div><h3>${copy.preparation}</h3><p>${copy.preparationText}</p></div><span aria-hidden="true">✦</span><div><h3>${copy.planning}</h3><p>${copy.planningBrief}</p></div></div></div><div class="planning-seal" aria-hidden="true">${icon("document")}<span>${icon("check")}</span></div><div class="planning-panel"><ul class="check-list">${copy.planningPoints.map((item) => `<li>${icon("check")}<span>${item}</span></li>`).join("")}</ul><a class="button button-gold" href="${whatsapp(copy.planningMessage)}" ${external}>${copy.planningCta}${arrow()}</a></div></div></section>
        <section class="resources section" id="resources"><div class="container">${sectionHeading(copy.resourcesTitle)}<div class="resource-grid"><article class="resource-card resource-featured"><div class="featured-content"><div class="reel-meta"><span>${copy.reelLabel}</span>${icon("instagram")}<span>${contact.handle}</span></div><h3>${copy.planningResource}</h3><p>${copy.planningResourceText}</p><span class="featured-play" aria-hidden="true">${icon("play")}</span><img class="resource-watermark" src="assets/contax-isotype.png" alt="" loading="lazy"></div><a class="resource-link" href="${contact.reel}" ${external}>${copy.viewReel}${arrow()}</a></article>${copy.resources.map((resource) => `<article class="resource-card"><div class="resource-meta"><span>${resource.type}</span><small>${resource.country}</small></div><h3>${resource.title}</h3><p>${resource.text}</p><button class="text-link" data-resource="${resource.id}">${copy.read}${arrow()}</button></article>`).join("")}</div></div></section>
        <section class="videos section" id="videos"><div class="container">${sectionHeading(copy.learnTitle)}<div class="video-grid">${copy.videos.map((video, index) => `<article class="video-card ${index === 0 ? "video-featured" : ""}"><button class="video-open" data-video="${video.id}" aria-label="${video.title}">${videoArtwork(video, index === 0)}${index > 0 ? `<h3>${video.title}</h3>` : ""}<span class="category-label">${video.category}</span></button></article>`).join("")}</div><a class="text-link center-link" href="${contact.instagram}" ${external}>${copy.allVideos}${arrow()}</a></div></section>
        <section class="why section" id="about"><div class="container why-layout"><div class="why-content"><p class="eyebrow">${copy.whyEyebrow}</p><h2>${copy.whyTitle}</h2>${ornament()}<div class="reason-grid">${copy.reasons.map(([image, title, text]) => `<article><span class="reason-icon">${icon(image)}</span><div><h3>${title}</h3><p>${text}</p></div></article>`).join("")}</div></div><img class="why-watermark" src="assets/contax-isotype.png" width="800" height="820" alt="" loading="lazy"></div></section>
        <section class="process section" id="process"><div class="container">${sectionHeading(copy.processTitle)}<ol class="process-grid">${copy.steps.map(([title, text], index) => `<li><span class="step-number">${index + 1}</span><h3>${title}</h3><p>${text}</p></li>`).join("")}</ol></div></section>
        <section class="industries section" id="industries"><div class="container">${sectionHeading(copy.industriesTitle)}<div class="industry-grid">${copy.industries.map(([image, title]) => `<div>${icon(image)}<h3>${title}</h3></div>`).join("")}</div><p class="industry-note">${copy.industriesNote}</p></div></section>
        <section class="social-proof" aria-label="${copy.partners} · ${copy.testimonials}"><div class="container proof-grid"><div class="proof-placeholder"><h2>${copy.partners}</h2><div>${icon("handshake")}<p><strong>${copy.soon}</strong><span>${copy.partnersPending}</span></p></div></div><div class="proof-placeholder"><h2>${copy.testimonials}</h2><div>${icon("comments")}<p><strong>${copy.soon}</strong><span>${copy.testimonialsPending}</span></p></div></div></div></section>
        <section class="contact-section" id="contact"><div class="container contact-layout"><div><h2>${copy.ctaTitle}</h2><p>${copy.ctaText}</p><div class="contact-actions"><button class="button button-gold" data-consult>${copy.schedule}${arrow()}</button><a href="${whatsapp()}" ${external}>${icon("whatsapp")}${copy.whatsapp}</a><a href="mailto:${contact.email}">${icon("mail")}${copy.email}</a></div></div><img class="contact-art" src="assets/growth-scene.svg" width="600" height="510" alt="" loading="lazy"></div><svg class="contact-wave" viewBox="0 0 500 300" preserveAspectRatio="none" aria-hidden="true"><path d="M0 300C215 278 415 175 500 0V300Z" fill="#bf8d37"/><path d="M0 300C218 286 418 184 500 12V300Z" fill="#f9f8f5"/><path d="M140 300C295 264 449 171 500 88V300Z" fill="#006376"/></svg></section>
      </main>
      <footer class="footer"><div class="container footer-grid"><div class="footer-brand"><a class="brand" href="#home" aria-label="Contax · ${copy.backTop}"><img src="assets/contax-logo-gold-outline.svg" width="1485" height="352" alt="Contax Business Solutions" loading="lazy"></a><p>${copy.footerText}</p><div class="social-links"><a href="${contact.instagram}" ${external} aria-label="Instagram ${contact.handle}">${icon("instagram")}</a><a href="${whatsapp()}" ${external} aria-label="WhatsApp ${contact.phone}">${icon("whatsapp")}</a></div></div><div class="footer-column"><h2>${copy.navigation}</h2>${copy.nav.map((label, index) => `<a href="#${navIds[index]}">${label}</a>`).join("")}</div><div class="footer-column"><h2>${copy.servicesTitle}</h2>${copy.services.map((service) => `<button data-service="${service.id}">${plain(service.title)}</button>`).join("")}</div><div class="footer-column footer-contact"><h2>${copy.contact}</h2><a href="${contact.telephone}">${icon("phone")}${contact.phone}</a><a href="mailto:${contact.email}">${icon("mail")}${contact.email}</a><span>${icon("location")}${copy.location}</span><span>${icon("clock")}${copy.hours}</span></div></div><div class="container footer-bottom"><p>© ${new Date().getFullYear()} Contax Business Solutions LLC. ${copy.rights}</p><div><button data-legal="privacy">${copy.privacy}</button><span aria-hidden="true">|</span><button data-legal="terms">${copy.terms}</button></div></div></footer>`;
    observeNavigation();
  }

  function observeNavigation() {
    if (!("IntersectionObserver" in window)) return;
    observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      document.querySelectorAll(".desktop-nav a, .mobile-nav a").forEach((link) => {
        if (link.hash === `#${visible.target.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-10% 0px -60% 0px", threshold: 0 });
    navIds.forEach((id) => { const section = document.getElementById(id); if (section) observer.observe(section); });
  }

  function closeMenu(restoreFocus = false) {
    const menu = document.getElementById("mobile-nav");
    const button = document.querySelector(".menu-toggle");
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", t().menu);
    document.body.classList.remove("menu-open");
    if (restoreFocus) button.focus();
  }

  function openDialog(eyebrow, title, body, className = "") {
    dialogOpener = document.activeElement;
    closeMenu();
    dialog.className = className;
    dialog.innerHTML = `<button class="dialog-close" data-close aria-label="${t().close}">${icon("close")}</button><p class="eyebrow">${eyebrow}</p><h2 id="dialog-title">${title}</h2>${ornament()}${body}`;
    document.body.classList.add("dialog-open");
    dialog.showModal();
  }

  function consultation(serviceId = "") {
    const copy = t();
    const options = copy.services.map((service) => `<option value="${service.id}" ${serviceId === service.id ? "selected" : ""}>${plain(service.title)}</option>`).join("");
    openDialog("Contax Business Solutions", copy.consultationTitle, `<p class="dialog-intro">${copy.consultationIntro}</p><form id="consultation-form" action="${contact.whatsapp}" method="get" target="_blank" rel="noopener noreferrer"><label for="consultation-country">${copy.country}</label><select id="consultation-country" required><option value="">${copy.countryPlaceholder}</option>${copy.countries.map((country) => `<option value="${country.id}" ${serviceId === "itin" && country.id === "us" ? "selected" : ""}>${country.name}</option>`).join("")}<option value="both">${copy.countryBoth}</option></select><label for="consultation-service">${copy.service}</label><select id="consultation-service" required><option value="">${copy.servicePlaceholder}</option>${options}<option value="general">${copy.other}</option></select><input type="hidden" name="text" id="consultation-text"><button class="button button-gold form-submit" type="submit">${icon("whatsapp")}${copy.next}${arrow()}</button></form><a class="dialog-alternative" href="mailto:${contact.email}">${icon("mail")}${contact.email}</a>`, "consultation-dialog");
    updateConsultation();
  }

  function updateConsultation() {
    const form = document.getElementById("consultation-form");
    if (!form) return;
    const countrySelect = document.getElementById("consultation-country");
    const serviceSelect = document.getElementById("consultation-service");
    const itinOption = serviceSelect.querySelector('[value="itin"]');
    itinOption.disabled = countrySelect.value === "co";
    if (itinOption.disabled && serviceSelect.value === "itin") serviceSelect.value = "";
    if (serviceSelect.value === "itin" && countrySelect.value === "both") countrySelect.value = "us";
    const country = countrySelect.value === "both" ? t().countryBoth : t().countries.find((item) => item.id === countrySelect.value)?.name;
    const service = serviceSelect.value === "general" ? t().other : plain(t().services.find((item) => item.id === serviceSelect.value)?.title ?? "");
    document.getElementById("consultation-text").value = [t().consultationMessage, country ? `${t().contactCountry}: ${country}.` : "", service ? `${t().contactAbout}: ${service}.` : ""].filter(Boolean).join(" ");
  }

  app.addEventListener("click", (event) => {
    const languageButton = event.target.closest("[data-language]");
    if (languageButton) {
      if (languageButton.dataset.language === language) return;
      language = languageButton.dataset.language;
      const position = window.scrollY;
      try { localStorage.setItem("contax-prototype-language", language); } catch { /* Optional preference. */ }
      render();
      window.scrollTo({ top: position, behavior: "instant" });
      document.querySelector(`[data-language="${language}"]`).focus({ preventScroll: true });
      announcer.textContent = t().changed;
      return;
    }
    const menuButton = event.target.closest(".menu-toggle");
    if (menuButton) {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      if (expanded) closeMenu();
      else {
        document.getElementById("mobile-nav").hidden = false;
        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", t().closeMenu);
        document.body.classList.add("menu-open");
      }
      return;
    }
    if (event.target.closest(".mobile-nav a")) closeMenu();
    if (event.target.closest("[data-consult]")) { consultation(); return; }
    const serviceButton = event.target.closest("[data-service]");
    if (serviceButton) {
      const service = t().services.find((item) => item.id === serviceButton.dataset.service);
      openDialog(t().serviceDetail, plain(service.title), `<p class="dialog-intro">${service.details}</p><p class="dialog-country">${icon("globe")}${service.countries}</p><ul class="dialog-features check-list">${service.features.map((feature) => `<li>${icon("check")}<span>${feature}</span></li>`).join("")}</ul><p class="scope-note">${t().scope}</p><button class="button button-gold" data-consult-service="${service.id}">${t().consultService}${arrow()}</button>`);
      return;
    }
    const resourceButton = event.target.closest("[data-resource]");
    if (resourceButton) {
      const resource = t().resources.find((item) => item.id === resourceButton.dataset.resource);
      openDialog(`${resource.type} · ${resource.country}`, resource.title, `<div class="sample-notice"><strong>${t().sampleLabel}</strong><p>${t().sampleText}</p></div><div class="article-body">${resource.sections.map(([title, text]) => `<h3>${title}</h3><p>${text}</p>`).join("")}</div><a class="button button-gold" href="${whatsapp(`${t().whatsappMessage} ${t().contactAbout}: ${resource.title}.`)}" ${external}>${t().topicCta}${arrow()}</a>`, "article-dialog");
      return;
    }
    const videoButton = event.target.closest("[data-video]");
    if (videoButton) {
      const video = t().videos.find((item) => item.id === videoButton.dataset.video);
      openDialog(`${t().learnTitle} · ${video.country}`, video.title, `<div class="dialog-video-art">${videoArtwork(video)}</div><p class="dialog-intro">${video.description}</p>${video.real ? `<p class="scope-note">${t().reelIntro}</p><a class="button button-gold" href="${contact.reel}" ${external}>${icon("instagram")}${t().watch}${arrow()}</a>` : `<div class="sample-notice"><strong>${t().videoSample}</strong><p>${t().videoSampleText}</p></div><a class="button button-gold" href="${whatsapp(`${t().whatsappMessage} ${t().contactAbout}: ${video.title}`)}" ${external}>${t().topicCta}${arrow()}</a>`}`, "video-dialog");
      return;
    }
    const legalButton = event.target.closest("[data-legal]");
    if (legalButton) openDialog(t().legalPending, t()[legalButton.dataset.legal], `<p class="dialog-intro">${t().legalText}</p><a class="text-link" href="mailto:${contact.email}">${t().contactByEmail}${arrow()}</a>`);
  });

  dialog.addEventListener("click", (event) => {
    if (event.target.closest("[data-close]")) dialog.close();
    const service = event.target.closest("[data-consult-service]");
    if (service) {
      const opener = dialogOpener;
      dialog.close();
      // Let the close event finish before opening the next view of the same dialog.
      requestAnimationFrame(() => { consultation(service.dataset.consultService); dialogOpener = opener; });
    }
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
  });
  dialog.addEventListener("change", updateConsultation);
  dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    if (dialogOpener?.isConnected) dialogOpener.focus({ preventScroll: true });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !dialog.open) closeMenu(true);
  });
  window.matchMedia("(min-width: 1061px)").addEventListener("change", (event) => { if (event.matches) closeMenu(); });
  render();
  // Initial fragments must resolve after the standalone document has rendered.
  const initialAnchor = location.hash.slice(1);
  if (initialAnchor) requestAnimationFrame(() => document.getElementById(initialAnchor)?.scrollIntoView({ behavior: "instant", block: "start" }));
})();
