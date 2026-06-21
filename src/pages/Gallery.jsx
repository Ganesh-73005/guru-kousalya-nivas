import React, { useState } from "react";
import { PageHero } from "../components/Shared";
import { GALLERY, GALLERY_FILTERS } from "../data/mock";
import { useReveal } from "../hooks/useAnim";
import { X, ZoomIn } from "lucide-react";

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);
  const ref = useReveal([filter]);
  const items = GALLERY.filter((g) => filter === "All" || g.cat === filter);

  return (
    <div>
      <PageHero title="Gallery" breadcrumb={[{ label: "Home", path: "/" }, { label: "Gallery" }]} />

      <section className="py-16" style={{ background: "var(--ivory)" }}>
        <div className="mb-12 flex flex-wrap justify-center gap-3 px-6">
          {GALLERY_FILTERS.map((f) => {
            const a = filter === f;
            return (
              <button key={f} onClick={() => setFilter(f)} className="px-5 py-2 text-[11px] font-semibold tracking-[0.16em] uppercase transition-all duration-300" style={{ background: a ? "var(--maroon)" : "transparent", color: a ? "var(--ivory)" : "var(--maroon)", border: `1px solid ${a ? "var(--maroon)" : "var(--gold)"}`, borderRadius: "999px" }}>{f}</button>
            );
          })}
        </div>

        <div ref={ref} className="mx-auto max-w-[1280px] px-6 lg:px-10" style={{ columnGap: "1rem" }}>
          <div className="[column-count:2] md:[column-count:3] lg:[column-count:4] [column-gap:1rem]">
            {items.map((g, i) => (
              <button key={g.src + i} data-reveal onClick={() => setActive(g.src)} className="zoom-parent group relative mb-4 block w-full overflow-hidden rounded-xl" style={{ border: "1px solid rgba(182,138,62,0.4)", breakInside: "avoid" }}>
                <img
                  src={g.src}
                  alt={g.cat}
                  className="zoom-img w-full"
                  loading="lazy"
                />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "rgba(87,16,25,0.4)" }}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "var(--maroon)", border: "1px solid var(--gold-light)" }}>
                    <ZoomIn size={20} style={{ color: "var(--gold-light)" }} />
                  </span>
                </span>
                <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-[9px] font-semibold tracking-[0.12em] uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "var(--gold-light)", color: "var(--maroon-deep)" }}>{g.cat}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(40,16,20,0.9)" }} onClick={() => setActive(null)}>
          <button className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full" style={{ border: "1px solid var(--gold)", color: "var(--gold-light)" }} onClick={() => setActive(null)} aria-label="Close"><X size={22} /></button>
          <img src={active} alt="Gallery view" className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain" style={{ border: "2px solid var(--gold)" }} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};

export default Gallery;
