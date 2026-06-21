import React from "react";
import { Link } from "react-router-dom";
import { Landmark, Flame, Sparkles, Award } from "lucide-react";
import { ABOUT } from "../data/mock";
import { PageHero, LuxeButton } from "../components/Shared";
import { Mandala, TempleArchFrame, KolamDivider, SectionTitle, Lotus, RangoliBg } from "../components/decorative/Ornaments";
import { useReveal } from "../hooks/useAnim";

const ICONS = { Landmark, Flame, Sparkles, Award };

const About = () => {
  const bioRef = useReveal();
  const pillarRef = useReveal();
  const workRef = useReveal();
  const timeRef = useReveal();

  return (
    <div>
      <PageHero title="About" breadcrumb={[{ label: "Home", path: "/" }, { label: "About" }]} />

      {/* Bio */}
      <section className="py-16 sm:py-24" style={{ background: "var(--ivory)" }}>
        <div ref={bioRef} className="mx-auto grid max-w-[1280px] items-start gap-8 px-4 sm:gap-14 sm:px-6 lg:grid-cols-[400px_1fr] lg:px-10">
          <div data-reveal className="relative mx-auto w-[280px] sm:w-[340px] md:w-[420px] lg:w-[400px] lg:sticky lg:top-28">
            <RangoliBg className="absolute -inset-6 -z-10 h-auto w-auto sm:-inset-10" opacity={0.18} />
            <TempleArchFrame className="h-auto">
              <img src={ABOUT.portrait} alt={ABOUT.name} className="h-auto w-full object-cover" />
            </TempleArchFrame>
          </div>
          <div data-reveal className="text-center lg:text-left">
            <p className="eyebrow mb-3 text-[0.65rem] sm:text-xs" style={{ color: "var(--bronze)" }}>The Artist</p>
            <h2 className="font-serif-display text-3xl font-semibold sm:text-4xl md:text-5xl" style={{ color: "var(--maroon)" }}>{ABOUT.name}</h2>
            <KolamDivider className="my-5 sm:my-6 scale-75 sm:scale-100 origin-center lg:origin-left" />
            <div className="space-y-4 sm:space-y-5">
              {ABOUT.paragraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-justify sm:text-base" style={{ color: "var(--ink-soft)" }}>{p}</p>
              ))}
            </div>
            <p className="mt-6 font-serif-display text-2xl italic sm:mt-8 sm:text-3xl" style={{ color: "var(--maroon-soft)" }}>— Kousalya Nivas</p>
          </div>
        </div>
      </section>

      {/* Philosophy pillars */}
      <section className="py-24" style={{ background: "var(--cream)" }}>
        <SectionTitle eyebrow="Artistic Philosophy" title="Pillars of Practice" />
        <div ref={pillarRef} className="mx-auto mt-14 grid max-w-[1280px] gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          {ABOUT.pillars.map((p) => {
            const Icon = ICONS[p.icon] || Sparkles;
            return (
              <div key={p.title} data-reveal className="luxe-card rounded-xl p-7 text-center">
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "var(--cream)", border: "1px solid var(--gold)" }}>
                  <Icon size={24} style={{ color: "var(--maroon)" }} />
                </span>
                <h3 className="font-serif-display text-2xl font-semibold" style={{ color: "var(--maroon)" }}>{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-justify" style={{ color: "var(--ink-soft)" }}>{p.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Signature works */}
      <section className="py-24" style={{ background: "var(--ivory)" }}>
        <SectionTitle eyebrow="Signature Works & Leadership" title="Bringing Epics to Life" />
        <div ref={workRef} className="mx-auto mt-14 grid max-w-[1100px] gap-5 px-6 sm:grid-cols-2 lg:px-10">
          {ABOUT.signatureWorks.map((w) => (
            <Link key={w.slug} to={`/productions/${w.slug}`} data-reveal className="group flex items-center gap-5 rounded-xl p-6 transition-all duration-300 luxe-card hover:-translate-y-1">
              <Lotus className="h-8 w-14 flex-shrink-0" color="var(--maroon)" />
              <div>
                <h3 className="font-serif-display text-2xl font-semibold" style={{ color: "var(--maroon)" }}>{w.title}</h3>
                <p className="text-sm text-justify" style={{ color: "var(--ink-soft)" }}>{w.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Building a Legacy */}
      <section className="py-16 sm:py-24" style={{ background: "var(--parchment)" }}>
        <div className="mx-auto max-w-[900px] px-4 text-center sm:px-6 lg:px-10">
          <p className="eyebrow mb-3 text-[0.6rem] leading-relaxed sm:text-xs" style={{ color: "var(--bronze)" }}>Nurturing the next generation of classical performers</p>
          <h2 className="font-serif-display text-3xl font-semibold sm:text-4xl md:text-5xl" style={{ color: "var(--maroon)" }}>Building a Legacy</h2>
          <Lotus className="mx-auto my-5 h-5 w-10 sm:my-6 sm:h-6 sm:w-12" color="var(--gold)" />
          <div className="space-y-4 sm:space-y-5">
            <p className="text-sm leading-relaxed text-justify sm:text-base" style={{ color: "var(--ink-soft)" }}>
              Beyond the stage, Kousalya is a dedicated cultural catalyst. She established an in-house auditorium "Parvata" at M.S. Naatyakshetra to provide a dedicated platform for emerging artists.
            </p>
            <p className="text-sm leading-relaxed text-justify sm:text-base" style={{ color: "var(--ink-soft)" }}>
              As a festival organizer and curator, she remains committed to honoring excellence in the arts and nurturing the next generation of classical performers.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden py-16 sm:py-24" style={{ background: "var(--cream)" }}>
        <RangoliBg className="absolute left-1/2 top-1/2 h-[360px] w-[360px] sm:h-[460px] sm:w-[460px] -translate-x-1/2 -translate-y-1/2" opacity={0.1} />
        <SectionTitle eyebrow="Milestones" title="My Journey" />
        <div ref={timeRef} className="relative mx-auto mt-12 max-w-3xl px-4 sm:mt-16 sm:px-6">
          <span className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 sm:block" style={{ background: "var(--gold)" }} />
          {ABOUT.timeline.map((t, i) => (
            <div key={t.year} data-reveal className={`relative mb-8 flex flex-col sm:mb-10 sm:w-1/2 ${i % 2 ? "sm:ml-auto sm:pl-10" : "sm:pr-10 sm:text-right"}`}>
              <span className="absolute top-2 hidden h-4 w-4 rounded-full sm:block" style={{ background: "var(--maroon)", border: "2px solid var(--gold)", [i % 2 ? "left" : "right"]: "-2.45rem" }} />
              <span className="font-num text-2xl font-semibold sm:text-3xl" style={{ color: "var(--maroon)" }}>{t.year}</span>
              <p className="mt-1 text-xs leading-relaxed sm:text-sm" style={{ color: "var(--ink-soft)" }}>{t.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center sm:mt-10"><LuxeButton to="/awards" variant="outline">View Awards & Honours</LuxeButton></div>
      </section>
    </div>
  );
};

export default About;
