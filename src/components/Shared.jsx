import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, X, Play } from "lucide-react";
import { Mandala, KolamDivider, CornerFlourish, RangoliBg, HangingLamp } from "./decorative/Ornaments";

/* ===== Standard page hero used on inner pages ===== */
export const PageHero = ({ title, breadcrumb = [] }) => (
  <section className="relative overflow-hidden pt-32 pb-14" style={{ background: "var(--cream)" }}>
    <RangoliBg className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2" opacity={0.12} />
    <HangingLamp className="pointer-events-none absolute left-6 top-16 h-28 sm:left-16 lg:left-32" />
    <HangingLamp className="pointer-events-none absolute right-6 top-16 h-28 sm:right-16 lg:right-32" />
    <div className="relative mx-auto max-w-[1400px] px-6 text-center">
      <h1 className="font-serif-display text-5xl font-semibold md:text-6xl" style={{ color: "var(--maroon)" }}>
        {title}
      </h1>
      <KolamDivider className="my-5" />
      <nav className="flex items-center justify-center gap-2 text-xs tracking-[0.18em] uppercase" style={{ color: "var(--bronze)" }}>
        {breadcrumb.map((b, i) => (
          <span key={i} className="flex items-center gap-2">
            {b.path ? (
              <Link to={b.path} className="hover:text-[var(--maroon)]">{b.label}</Link>
            ) : (
              <span style={{ color: "var(--maroon)" }}>{b.label}</span>
            )}
            {i < breadcrumb.length - 1 && <ChevronRight size={12} />}
          </span>
        ))}
      </nav>
    </div>
  </section>
);

/* ===== Luxe maroon button ===== */
export const LuxeButton = ({ children, to, href, onClick, variant = "solid", className = "" }) => {
  const base =
    "group inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[12px] font-semibold tracking-[0.18em] uppercase transition-all duration-300";
  const styles =
    variant === "solid"
      ? { background: "var(--maroon)", color: "var(--ivory)", border: "1px solid var(--maroon)" }
      : { background: "transparent", color: "var(--maroon)", border: "1px solid var(--gold)" };

  const content = (
    <>
      {children}
      <ChevronRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );
  const cls = `${base} ${className}`;
  if (to) return <Link to={to} className={cls} style={styles}>{content}</Link>;
  if (href) return <a href={href} className={cls} style={styles}>{content}</a>;
  return <button onClick={onClick} className={cls} style={styles}>{content}</button>;
};

/* ===== YouTube lightbox modal ===== */
export const YouTubeModal = ({ videoId, onClose }) => {
  if (!videoId) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(40,16,20,0.88)" }}
      onClick={onClose}
    >
      <button
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full"
        style={{ border: "1px solid var(--gold)", color: "var(--gold-light)" }}
        onClick={onClose}
        aria-label="Close"
      >
        <X size={22} />
      </button>
      <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-lg" style={{ border: "2px solid var(--gold)" }} onClick={(e) => e.stopPropagation()}>
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

/* ===== Video thumbnail tile ===== */
export const VideoTile = ({ videoId, onPlay, className = "" }) => (
  <button
    onClick={() => onPlay(videoId)}
    className={`zoom-parent group relative aspect-video w-full overflow-hidden rounded-lg ${className}`}
    style={{ border: "1px solid rgba(182,138,62,0.4)" }}
  >
    <img
      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
      alt="Video thumbnail"
      className="zoom-img h-full w-full object-cover"
      loading="lazy"
    />
    <span className="absolute inset-0 flex items-center justify-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110" style={{ background: "var(--maroon)", border: "2px solid var(--gold-light)" }}>
        <Play size={22} className="ml-0.5" style={{ color: "var(--gold-light)" }} fill="var(--gold-light)" />
      </span>
    </span>
  </button>
);
