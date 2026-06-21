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

      <section className="py-20" style={{ background: "var(--ivory)" }}>
        <SectionTitle eyebrow="In the Press" title="Media Coverage" />
        <div ref={ref} className="mx-auto mt-14 grid max-w-[1280px] gap-7 px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-10">
          {MEDIA.map((m, i) => (
            <article key={i} data-reveal className="zoom-parent group flex flex-col overflow-hidden rounded-xl luxe-card">
              <button
                onClick={() => setLightboxData(m)}
                className="h-52 overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <img src={m.image} alt={m.headline} className="zoom-img h-full w-full object-cover" loading="lazy" />
              </button>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2">
                  <Newspaper size={15} style={{ color: "var(--gold)" }} />
                  <span className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: "var(--bronze)" }}>{m.publication}</span>
                  <span className="ml-auto text-[11px]" style={{ color: "var(--ink-soft)" }}>{m.date}</span>
                </div>
                <h3 className="mt-3 font-serif-display text-xl font-semibold leading-snug" style={{ color: "var(--maroon)" }}>{m.headline}</h3>
                <Lotus className="my-3 h-4 w-9" color="var(--gold)" />
                <p className="flex-1 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>{m.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Media Lightbox */}
      {lightboxData && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(40,16,20,0.95)" }}
          onClick={() => setLightboxData(null)}
        >
          <button
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-110"
            style={{ border: "1px solid var(--gold)", color: "var(--gold-light)" }}
            onClick={() => setLightboxData(null)}
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <div
            className="relative flex max-h-[90vh] w-full max-w-6xl flex-col gap-6 md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left - Image */}
            <div
              className="flex flex-1 items-center justify-center overflow-hidden rounded-lg bg-black/20"
              style={{
                border: "3px solid var(--gold)",
                boxShadow: "0 30px 80px -20px rgba(182,138,62,0.6)",
                minHeight: '500px',
                minWidth: '400px'
              }}
            >
              <img
                src={lightboxData.image}
                alt={lightboxData.headline}
                className="h-auto w-full object-contain"
                style={{ maxHeight: '90vh' }}
              />
            </div>
            {/* Right - Content */}
            <div
              className="flex flex-col justify-center rounded-lg p-8 md:w-[420px]"
              style={{ background: "rgba(40,16,20,0.85)", border: "2px solid var(--gold)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Newspaper size={20} style={{ color: "var(--gold)" }} />
                <span
                  className="text-xs font-semibold tracking-[0.14em] uppercase"
                  style={{ color: "var(--gold-light)" }}
                >
                  {lightboxData.publication}
                </span>
              </div>
              <h3
                className="font-serif-display text-3xl font-semibold leading-tight"
                style={{ color: "var(--ivory)" }}
              >
                {lightboxData.headline}
              </h3>
              <Lotus className="my-5 h-5 w-11" color="var(--gold)" />
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--gold-light)", opacity: 0.95 }}
              >
                {lightboxData.excerpt}
              </p>
              <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(182,138,62,0.3)" }}>
                <span className="text-sm" style={{ color: "var(--gold-light)" }}>
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
