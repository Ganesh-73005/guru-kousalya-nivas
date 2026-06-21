import React, { useState } from "react";
import { PageHero } from "../components/Shared";
import { SectionTitle, Lotus } from "../components/decorative/Ornaments";
import { MEDIA } from "../data/mock";
import { useReveal } from "../hooks/useAnim";
import { Newspaper, X } from "lucide-react";

const Media = () => {
  const ref = useReveal();
  const [lightboxData, setLightboxData] = useState(null);

  return (
    <div>
      <PageHero title="Media" breadcrumb={[{ label: "Home", path: "/" }, { label: "Media" }]} />

      <section className="py-12 sm:py-20" style={{ background: "var(--ivory)" }}>
        <SectionTitle eyebrow="In the Press" title="Media Coverage" />
        <div ref={ref} className="mx-auto mt-10 grid max-w-[1280px] gap-5 px-4 sm:mt-14 sm:gap-7 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-10">
          {MEDIA.map((m, i) => (
            <article key={i} data-reveal className="zoom-parent group flex flex-col overflow-hidden rounded-xl luxe-card">
              <button
                onClick={() => setLightboxData(m)}
                className="h-44 overflow-hidden transition-transform duration-300 sm:h-52 hover:scale-105"
              >
                <img src={m.image} alt={m.headline} className="zoom-img h-full w-full object-cover" loading="lazy" />
              </button>
              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <div className="flex items-center gap-2">
                  <Newspaper size={14} className="sm:w-[15px] sm:h-[15px]" style={{ color: "var(--gold)" }} />
                  <span className="text-[10px] font-semibold tracking-[0.12em] sm:text-[11px] sm:tracking-[0.14em] uppercase" style={{ color: "var(--bronze)" }}>{m.publication}</span>
                  <span className="ml-auto text-[10px] sm:text-[11px]" style={{ color: "var(--ink-soft)" }}>{m.date}</span>
                </div>
                <h3 className="mt-2 font-serif-display text-lg font-semibold leading-snug sm:mt-3 sm:text-xl" style={{ color: "var(--maroon)" }}>{m.headline}</h3>
                <Lotus className="my-2 h-3 w-7 sm:my-3 sm:h-4 sm:w-9" color="var(--gold)" />
                <p className="flex-1 text-xs leading-relaxed sm:text-sm" style={{ color: "var(--ink-soft)" }}>{m.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Media Lightbox */}
      {lightboxData && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
          style={{ background: "rgba(40,16,20,0.95)" }}
          onClick={() => setLightboxData(null)}
        >
          <button
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full transition-transform sm:right-5 sm:top-5 sm:h-11 sm:w-11 hover:scale-110"
            style={{ border: "1px solid var(--gold)", color: "var(--gold-light)" }}
            onClick={() => setLightboxData(null)}
            aria-label="Close"
          >
            <X size={18} className="sm:w-[22px] sm:h-[22px]" />
          </button>
          <div
            className="relative flex max-h-[90vh] w-full max-w-6xl flex-col gap-4 overflow-y-auto sm:gap-6 md:flex-row md:overflow-y-visible"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left - Image */}
            <div
              className="flex flex-1 items-center justify-center overflow-hidden rounded-lg bg-black/20"
              style={{
                border: "2px solid var(--gold)",
                boxShadow: "0 20px 60px -20px rgba(182,138,62,0.6)",
              }}
            >
              <img
                src={lightboxData.image}
                alt={lightboxData.headline}
                className="h-auto w-full object-contain"
                style={{ maxHeight: '70vh' }}
              />
            </div>
            {/* Right - Content */}
            <div
              className="flex flex-col justify-center rounded-lg p-5 sm:p-6 md:p-8 md:w-[420px]"
              style={{ background: "rgba(40,16,20,0.85)", border: "2px solid var(--gold)" }}
            >
              <div className="flex items-center gap-2 mb-3 sm:gap-3 sm:mb-4">
                <Newspaper size={16} className="sm:w-[20px] sm:h-[20px]" style={{ color: "var(--gold)" }} />
                <span
                  className="text-[10px] font-semibold tracking-[0.12em] sm:text-xs sm:tracking-[0.14em] uppercase"
                  style={{ color: "var(--gold-light)" }}
                >
                  {lightboxData.publication}
                </span>
              </div>
              <h3
                className="font-serif-display text-xl font-semibold leading-tight sm:text-2xl md:text-3xl"
                style={{ color: "var(--ivory)" }}
              >
                {lightboxData.headline}
              </h3>
              <Lotus className="my-3 h-4 w-9 sm:my-4 sm:h-5 sm:w-11" color="var(--gold)" />
              <p
                className="text-sm leading-relaxed sm:text-base"
                style={{ color: "var(--gold-light)", opacity: 0.95 }}
              >
                {lightboxData.excerpt}
              </p>
              <div className="mt-4 pt-4 sm:mt-6 sm:pt-6" style={{ borderTop: "1px solid rgba(182,138,62,0.3)" }}>
                <span className="text-xs sm:text-sm" style={{ color: "var(--gold-light)" }}>
                  Published: {lightboxData.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;
