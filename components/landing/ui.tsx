import Image from "next/image";
import { Fragment, type ReactNode } from "react";

export const external = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
export const plain = (text: string) => text.replace(/<br\s*\/?\s*>/g, " ");
export function Lines({ text }: { text: string }) {
  return text.split(/<br\s*\/?\s*>/g).map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));
}
export function Icon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg className={`icon ${className}`} viewBox="0 0 32 32" aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}
export function Arrow() {
  return <Icon name="arrow" className="arrow" />;
}
export function Ornament() {
  return (
    <span className="ornament" aria-hidden="true">
      <i />
      <b>✦</b>
      <i />
    </span>
  );
}
export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="section-heading">
      <h2>{children}</h2>
      <Ornament />
    </div>
  );
}
export function Logo({ lazy = false }: { lazy?: boolean }) {
  return (
    <Image
      src="/contax/contax-logo-consolidado-transparente.webp"
      width={952}
      height={236}
      alt="Contax Business Solutions"
      priority={!lazy}
      loading={lazy ? "lazy" : undefined}
    />
  );
}
export function Growth({ priority = false }: { priority?: boolean }) {
  return (
    <Image
      src="/contax/growth-scene.svg"
      width={600}
      height={510}
      alt=""
      priority={priority}
    />
  );
}
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <Icon name="check" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
export function VideoArtwork({
  video,
  featured = false,
  origin,
}: {
  video: { theme: string; title: string };
  featured?: boolean;
  origin?: string;
}) {
  return (
    <div className={`video-art art-${video.theme}`}>
      {video.theme === "planning" || video.theme === "company" ? (
        <Growth />
      ) : (
        <span className="video-illustration">
          <Icon name={video.theme === "coins" ? "coins" : "document"} />
        </span>
      )}
      <span className="art-grid" aria-hidden="true" />
      {featured && <span className="video-origin">{origin}</span>}
      <span className="play-circle">
        <Icon name="play" />
      </span>
      {featured && <h3>{video.title}</h3>}
    </div>
  );
}
