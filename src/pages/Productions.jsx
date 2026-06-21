import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PageHero, LuxeButton } from "../components/Shared";
import { SectionTitle, Lotus } from "../components/decorative/Ornaments";
import { PRODUCTIONS, ADVITIYAM } from "../data/mock";
import { useReveal } from "../hooks/useAnim";

const FILTERS = ["All", "Dance Drama", "Solo Production"];

const Productions = () => {
  const [filter, setFilter] = useState("All");
  const listRef = useReveal([filter]);
  const items = PRODUCTIONS.filter((p) => filter === "All" || p.type === filter);

  return (
    <div>
      <PageHero title="Productions" breadcrumb={[{ label: "Home", path: "/" }, { label: "Productions" }]} />

      {/* Advitiyam intro */}
      <section className="py-20" style={{ background: "var(--ivory)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="eyebrow mb-3" style={{ color: "var(--bronze)" }}>Project Advitiyam</p>
          <h2 className="font-serif-display text-3xl font-semibold md:text-4xl" style={{ color: "var(--maroon)" }}>{ADVITIYAM.title}</h2>
          <p className="mt-5 text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>{ADVITIYAM.body}</p>
          <p className="mt-6 font-serif-display text-2xl italic" style={{ color: "var(--maroon-soft)" }}>“{ADVITIYAM.tagline}”</p>
        </div>
      </section>

      {/* Filters + list */}
      <section className="pb-24" style={{ background: "var(--ivory)" }}>
        <div className="mb-12 flex flex-wrap justify-center gap-3 px-6">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-5 py-2 text-[11px] font-semibold tracking-[0.16em] uppercase transition-all duration-300"
                style={{
                  background: active ? "var(--maroon)" : "transparent",
                  color: active ? "var(--ivory)" : "var(--maroon)",
                  border: `1px solid ${active ? "var(--maroon)" : "var(--gold)"}`,
                  borderRadius: "999px",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div ref={listRef} className="mx-auto flex max-w-[1180px] flex-col gap-10 px-6 lg:px-10">
          {items.map((p, i) => (
            <div key={p.slug} data-reveal className={`grid items-stretch gap-8 overflow-hidden rounded-2xl luxe-card md:grid-cols-2 ${i % 2 ? "md:[direction:rtl]" : ""}`}>
              <div className="zoom-parent relative h-[320px] overflow-hidden md:h-[420px] [direction:ltr]">
                <img src={p.image} alt={p.title} className="zoom-img h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-8 lg:p-12 [direction:ltr] flex flex-col justify-center">
                <div className="flex items-center gap-3">
                  <span className="font-num text-xs tracking-[0.18em] uppercase" style={{ color: "var(--bronze)" }}>{p.year}</span>
                  <span className="h-1 w-1 rounded-full" style={{ background: "var(--gold)" }} />
                  <span className="text-xs tracking-[0.18em] uppercase" style={{ color: "var(--bronze)" }}>{p.type}</span>
                </div>
                <h3 className="mt-3 font-serif-display text-4xl font-semibold" style={{ color: "var(--maroon)" }}>{p.title}</h3>
                <p className="mt-1 text-sm tracking-[0.12em] uppercase" style={{ color: "var(--maroon-soft)" }}>{p.subtitle}</p>
                <Lotus className="my-5 h-6 w-12" color="var(--gold)" />
                <p className="text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>{p.short}</p>
                <div className="mt-7"><LuxeButton to={`/productions/${p.slug}`}>View Details</LuxeButton></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Productions;
