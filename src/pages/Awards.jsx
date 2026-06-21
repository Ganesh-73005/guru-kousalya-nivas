import React, { useState, useEffect, useRef } from "react";
import { PageHero } from "../components/Shared";
import { SectionTitle, RangoliBg, Lotus, HangingLamp } from "../components/decorative/Ornaments";
import { AWARDS } from "../data/mock";
import { useReveal, useCounter } from "../hooks/useAnim";
import { Award } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StatBox = ({ value, label }) => {
  const ref = useCounter(value);
  return (
    <div data-reveal className="luxe-card rounded-xl px-6 py-8 text-center">
      <span ref={ref} className="font-num text-5xl font-semibold" style={{ color: "var(--maroon)" }}>{value}</span>
      <p className="mt-2 text-[11px] tracking-[0.16em] uppercase" style={{ color: "var(--ink-soft)" }}>{label}</p>
    </div>
  );
};

const Awards = () => {
  const statRef = useReveal();
  const listRef = useReveal();
  const scrollRef = useRef(null);
  const galleryContainerRef = useRef(null);
  const gallerySectionRef = useRef(null);
  const [lightboxData, setLightboxData] = useState(null);

  // Auto-scroll animation for awards gallery
  useEffect(() => {
    if (!scrollRef.current || !AWARDS.gallery?.length) return;

    const scrollContainer = scrollRef.current;
    let animationFrameId;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 0.5; // Adjust speed here

      // Reset when scrolled past first set of images
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // GSAP Zoom animation on scroll
  useEffect(() => {
    if (!galleryContainerRef.current || !gallerySectionRef.current || !AWARDS.gallery?.length) return;

    const container = galleryContainerRef.current;
    const section = gallerySectionRef.current;

    // Create ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        pin: false,
        markers: false, // Set to true for debugging
      }
    });

    // Zoom in, hold, then zoom out
    tl.fromTo(
      container,
      {
        scale: 0.9,
        borderRadius: "24px",
      },
      {
        scale: 1.05,
        borderRadius: "0px",
        duration: 0.3,
        ease: "power2.out"
      }
    )
    .to(container, {
      scale: 1.05,
      duration: 0.4, // Hold at zoomed state while scrolling through images
      ease: "none"
    })
    .to(container, {
      scale: 0.9,
      borderRadius: "24px",
      duration: 0.3,
      ease: "power2.in"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div>
      <PageHero title="Awards & Honours" breadcrumb={[{ label: "Home", path: "/" }, { label: "Awards" }]} />

      <section className="py-16" style={{ background: "var(--ivory)" }}>
        <p className="mx-auto max-w-2xl px-6 text-center text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>{AWARDS.intro}</p>
        <div ref={statRef} className="mx-auto mt-12 grid max-w-3xl gap-5 px-6 sm:grid-cols-3">
          {AWARDS.stats.map((s) => <StatBox key={s.label} value={s.value} label={s.label} />)}
        </div>
      </section>

      {/* Cinematic scrolling gallery */}
      {AWARDS.gallery?.length > 0 && (
        <section ref={gallerySectionRef} className="py-16" style={{ background: "var(--cream)", minHeight: "100vh" }}>
          <SectionTitle eyebrow="Moments of Recognition" title="Award Ceremonies" />
          <div
            ref={galleryContainerRef}
            className="relative mt-8 md:mt-12 h-[280px] md:h-[360px] overflow-hidden"
            style={{ transformOrigin: "center center" }}
          >
            {/* Fading edges - narrower on mobile */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 md:w-32"
              style={{ background: "linear-gradient(to right, var(--cream), transparent)" }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 md:w-32"
              style={{ background: "linear-gradient(to left, var(--cream), transparent)" }}
            />

            {/* Scrolling container */}
            <div
              ref={scrollRef}
              className="flex h-full gap-3 md:gap-5 overflow-x-hidden px-2 md:px-6"
              style={{ scrollBehavior: 'auto' }}
            >
              {/* Duplicate images for infinite scroll effect */}
              {[...AWARDS.gallery, ...AWARDS.gallery].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxData(item)}
                  className="group relative h-full flex-shrink-0 overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
                  style={{
                    width: window.innerWidth < 768 ? '220px' : '280px',
                    border: "2px solid var(--gold)",
                    boxShadow: "0 20px 40px -20px rgba(110,20,35,0.4)"
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  {/* Gradient overlay - always visible, darkens on hover */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)" }}
                  />
                  {/* Award details - slides up on hover */}
                  <div
                    className="absolute inset-x-0 bottom-0 p-5 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <h4
                      className="font-serif-display text-lg font-semibold leading-tight"
                      style={{ color: "white", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="mt-2 text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.9)", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
                    >
                      {item.org}
                    </p>
                    <p
                      className="mt-2 font-serif-display text-base font-semibold"
                      style={{ color: "white", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
                    >
                      {item.year}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nataraja (left) + Awards list (right) */}
      <section className="relative overflow-hidden py-16" style={{ background: "var(--ivory)" }}>
        <RangoliBg className="absolute -left-32 top-1/4 h-[460px] w-[460px]" opacity={0.12} />
        <SectionTitle eyebrow="A Legacy of Recognition" title="Awards Timeline" />

        <div className="mx-auto mt-14 grid max-w-[1280px] gap-12 px-6 lg:grid-cols-[420px_1fr] lg:px-10">
          {/* Left — Nataraja bronze sculpture */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative mx-auto max-w-[380px]">
              <div className="relative">
                <img src={AWARDS.nataraja} alt="Bronze Nataraja sculpture" className="h-[460px] w-full object-contain" style={{ filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.25))" }} loading="lazy" />
              </div>
              <div className="mt-5 text-center">
                <Lotus className="mx-auto mb-2 h-5 w-11" color="var(--maroon)" />
                <p className="font-serif-display text-2xl font-semibold" style={{ color: "var(--maroon)" }}>Nataraja</p>
                <p className="text-[11px] tracking-[0.16em] uppercase" style={{ color: "var(--bronze)" }}>The Cosmic Dancer</p>
              </div>
            </div>
          </div>

          {/* Right — awards list (scrollable) */}
          <div ref={listRef} className="max-h-[600px] overflow-y-auto pr-2" style={{ scrollbarWidth: "thin", scrollbarColor: "var(--gold) var(--sandal)" }}>
            {AWARDS.list.map((a, idx) => (
              <div
                key={a.title + a.year}
                data-reveal
                className="group relative mb-6 overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, var(--ivory) 0%, var(--cream) 100%)",
                  border: "1px solid rgba(182,138,62,0.25)",
                  boxShadow: "0 4px 12px rgba(110,20,35,0.08)"
                }}
              >
                {/* Decorative corner accent */}
                <div
                  className="absolute right-0 top-0 h-20 w-20 opacity-40 transition-opacity duration-300 group-hover:opacity-60"
                  style={{
                    background: "radial-gradient(circle at top right, var(--gold-pale) 0%, transparent 70%)"
                  }}
                />

                {/* Year badge - left side */}
                <div
                  className="absolute left-0 top-0 flex items-center gap-2 px-4 py-2"
                  style={{
                    background: "linear-gradient(90deg, var(--maroon) 0%, rgba(87,16,25,0.85) 100%)",
                    clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)"
                  }}
                >
                  <Award size={16} style={{ color: "var(--gold-light)" }} />
                  <span
                    className="font-num text-lg font-bold tracking-wide"
                    style={{ color: "var(--ivory)" }}
                  >
                    {a.year}
                  </span>
                </div>

                <div className="flex items-start gap-5 p-6 pt-14">
                  {/* Award number indicator */}
                  <div className="flex flex-shrink-0 flex-col items-center">
                    <div
                      className="relative flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: "linear-gradient(135deg, var(--maroon) 0%, var(--maroon-deep) 100%)",
                        border: "2px solid var(--gold)",
                        boxShadow: "0 4px 12px rgba(110,20,35,0.25)"
                      }}
                    >
                      <span
                        className="font-num text-xl font-bold"
                        style={{
                          color: "var(--gold-light)"
                        }}
                      >
                        {String(AWARDS.list.length - idx).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                      <h3
                        className="flex-1 font-serif-display text-2xl font-bold leading-tight transition-colors duration-300"
                        style={{ color: "var(--maroon)" }}
                      >
                        {a.title}
                      </h3>
                      <span
                        className="rounded-full px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] uppercase transition-all duration-300 group-hover:scale-105"
                        style={{
                          background: "var(--gold)",
                          color: "var(--maroon-deep)",
                          boxShadow: "0 2px 8px rgba(182,138,62,0.3)"
                        }}
                      >
                        {a.tag}
                      </span>
                    </div>

                    {/* Decorative line */}
                    <div
                      className="mb-3 h-px w-16 transition-all duration-500 group-hover:w-32"
                      style={{ background: "var(--gold)" }}
                    />

                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      {a.org}
                    </p>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className="h-1 w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: "linear-gradient(90deg, var(--gold) 0%, var(--bronze) 100%)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
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
            <span className="text-2xl">×</span>
          </button>
          <div
            className="relative max-h-[90vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="overflow-hidden rounded-lg"
              style={{ border: "3px solid var(--gold)", boxShadow: "0 30px 80px -20px rgba(182,138,62,0.6)" }}
            >
              <img
                src={lightboxData.image}
                alt={lightboxData.title}
                className="h-auto w-full object-contain"
                style={{ maxHeight: '70vh' }}
              />
            </div>
            {/* Award Info Caption */}
            <div
              className="mt-5 rounded-lg p-6 text-center"
              style={{ background: "rgba(40,16,20,0.8)", border: "1px solid var(--gold)" }}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <Lotus className="h-5 w-10" color="var(--gold)" />
                <span
                  className="font-serif-display text-3xl font-semibold"
                  style={{ color: "var(--gold-light)" }}
                >
                  {lightboxData.year}
                </span>
                <Lotus className="h-5 w-10" color="var(--gold)" />
              </div>
              <h3
                className="font-serif-display text-2xl font-semibold leading-tight md:text-3xl"
                style={{ color: "var(--ivory)" }}
              >
                {lightboxData.title}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed md:text-base"
                style={{ color: "var(--gold-light)" }}
              >
                {lightboxData.org}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Awards;
