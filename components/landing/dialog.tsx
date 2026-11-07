"use client";
import { useEffect, useRef, useState } from "react";
import content, { type Language } from "./content";
import {
  Arrow,
  CheckList,
  external,
  Icon,
  Ornament,
  plain,
  VideoArtwork,
} from "./ui";

export type DialogView =
  | { type: "service" | "resource" | "video"; id: string }
  | { type: "consultation"; id?: string }
  | { type: "legal"; id: "privacy" | "terms" };
export function LandingDialog({
  language,
  view,
  onClose,
  onConsult,
}: {
  language: Language;
  view: DialogView | null;
  onClose: () => void;
  onConsult: (id: string) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const copy = content[language];
  const contact = content.contact;
  const wa = (message: string) =>
    `${contact.whatsapp}?text=${encodeURIComponent(message)}`;
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !view) return;
    if (!dialog.open) {
      opener.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      dialog.showModal();
      document.body.classList.add("dialog-open");
    }
    // Focus the close control when switching from a service to its consultation.
    dialog.querySelector<HTMLButtonElement>(".dialog-close")?.focus();
  }, [view]);
  useEffect(() => () => document.body.classList.remove("dialog-open"), []);
  const close = () => {
    ref.current?.close();
    document.body.classList.remove("dialog-open");
    opener.current?.focus({ preventScroll: true });
    onClose();
  };
  if (!view) return null;
  const service =
    view.type === "service"
      ? copy.services.find((item) => item.id === view.id)
      : undefined;
  const resource =
    view.type === "resource"
      ? copy.resources.find((item) => item.id === view.id)
      : undefined;
  const video =
    view.type === "video"
      ? copy.videos.find((item) => item.id === view.id)
      : undefined;
  const title = service
    ? plain(service.title)
    : (resource?.title ??
      video?.title ??
      (view.type === "legal" ? copy[view.id] : copy.consultationTitle));
  const eyebrow = service
    ? copy.serviceDetail
    : resource
      ? `${resource.type} · ${resource.country}`
      : video
        ? `${copy.learnTitle} · ${video.country}`
        : view.type === "legal"
          ? copy.legalPending
          : "Contax Business Solutions";
  return (
    <dialog
      ref={ref}
      aria-labelledby="dialog-title"
      className={`${view.type}-dialog`}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          close();
      }}
    >
      <button className="dialog-close" onClick={close} aria-label={copy.close}>
        <Icon name="close" />
      </button>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id="dialog-title">{title}</h2>
      <Ornament />
      {service && (
        <>
          <p className="dialog-intro">{service.details}</p>
          <p className="dialog-country">
            <Icon name="globe" />
            {service.countries}
          </p>
          <div className="dialog-features">
            <CheckList items={service.features} />
          </div>
          <p className="scope-note">{copy.scope}</p>
          <button
            className="button button-gold"
            onClick={() => onConsult(service.id)}
          >
            {copy.consultService}
            <Arrow />
          </button>
        </>
      )}
      {view.type === "consultation" && (
        <Consultation
          key={view.id ?? "general"}
          language={language}
          serviceId={view.id}
        />
      )}
      {resource && (
        <>
          <div className="sample-notice">
            <strong>{copy.sampleLabel}</strong>
            <p>{copy.sampleText}</p>
          </div>
          <div className="article-body">
            {resource.sections.map(([heading, text]) => (
              <section key={heading}>
                <h3>{heading}</h3>
                <p>{text}</p>
              </section>
            ))}
          </div>
          <a
            className="button button-gold"
            href={wa(
              `${copy.whatsappMessage} ${copy.contactAbout}: ${resource.title}.`,
            )}
            {...external}
          >
            {copy.topicCta}
            <Arrow />
          </a>
        </>
      )}
      {video && (
        <>
          <div className="dialog-video-art">
            <VideoArtwork video={video} />
          </div>
          <p className="dialog-intro">{video.description}</p>
          {video.real ? (
            <>
              <p className="scope-note">{copy.reelIntro}</p>
              <a
                className="button button-gold"
                href={contact.reel}
                {...external}
              >
                <Icon name="instagram" />
                {copy.watch}
                <Arrow />
              </a>
            </>
          ) : (
            <>
              <div className="sample-notice">
                <strong>{copy.videoSample}</strong>
                <p>{copy.videoSampleText}</p>
              </div>
              <a
                className="button button-gold"
                href={wa(
                  `${copy.whatsappMessage} ${copy.contactAbout}: ${video.title}.`,
                )}
                {...external}
              >
                {copy.topicCta}
                <Arrow />
              </a>
            </>
          )}
        </>
      )}
      {view.type === "legal" && (
        <>
          <p className="dialog-intro">{copy.legalText}</p>
          <a className="text-link" href={`mailto:${contact.email}`}>
            {copy.contactByEmail}
            <Arrow />
          </a>
        </>
      )}
    </dialog>
  );
}

function Consultation({
  language,
  serviceId = "",
}: {
  language: Language;
  serviceId?: string;
}) {
  const copy = content[language];
  const [country, setCountry] = useState(serviceId === "itin" ? "us" : "");
  const [service, setService] = useState(serviceId);
  const countryName =
    country === "both"
      ? copy.countryBoth
      : copy.countries.find((item) => item.id === country)?.name;
  const serviceName =
    service === "general"
      ? copy.other
      : plain(copy.services.find((item) => item.id === service)?.title ?? "");
  const message = [
    copy.consultationMessage,
    countryName && `${copy.contactCountry}: ${countryName}.`,
    serviceName && `${copy.contactAbout}: ${serviceName}.`,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <>
      <p className="dialog-intro">{copy.consultationIntro}</p>
      <form
        id="consultation-form"
        action={content.contact.whatsapp}
        method="get"
        {...external}
      >
        <label htmlFor="consultation-country">{copy.country}</label>
        <select
          id="consultation-country"
          required
          value={country}
          onChange={(event) => {
            const value = event.target.value;
            setCountry(value);
            if (value === "co" && service === "itin") setService("");
            if (value === "both" && service === "itin") setService("");
          }}
        >
          <option value="">{copy.countryPlaceholder}</option>
          {copy.countries.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
          <option value="both">{copy.countryBoth}</option>
        </select>
        <label htmlFor="consultation-service">{copy.service}</label>
        <select
          id="consultation-service"
          required
          value={service}
          onChange={(event) => {
            setService(event.target.value);
            if (event.target.value === "itin") setCountry("us");
          }}
        >
          <option value="">{copy.servicePlaceholder}</option>
          {copy.services.map((item) => (
            <option
              key={item.id}
              value={item.id}
              disabled={item.id === "itin" && country === "co"}
            >
              {plain(item.title)}
            </option>
          ))}
          <option value="general">{copy.other}</option>
        </select>
        <input type="hidden" name="text" value={message} />
        <button className="button button-gold form-submit" type="submit">
          <Icon name="whatsapp" />
          {copy.next}
          <Arrow />
        </button>
      </form>
      <a
        className="dialog-alternative"
        href={`mailto:${content.contact.email}`}
      >
        <Icon name="mail" />
        {content.contact.email}
      </a>
    </>
  );
}
