import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Drama, GraduationCap, Award, Flame, ChevronRight } from "lucide-react";
import { HERO, STATS, ABOUT_PREVIEW, PRODUCTIONS, SITE, INITIATIVES, GALLERY } from "../data/mock";
import { Mandala, KolamDivider, TempleArchFrame, TempleLamp, SectionTitle, Lotus, RangoliBg, HangingLamp, DiyaRow } from "../components/decorative/Ornaments";
import { LuxeButton } from "../components/Shared";
import { useReveal, useCounter, gsap } from "../hooks/useAnim";

const ICONS = { Sparkles, Drama, GraduationCap, Award, Flame };

const StatCard = ({ stat }) => {
  const Icon = ICONS[stat.icon] || Sparkles;
  const numRef = useCounter(stat.value);
  return (
    <div data-reveal className="luxe-card flex flex-col items-center rounded-xl px-4 py-7 text-center">
      <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "var(--cream)", border: "1px solid var(--gold)" }}>
        <Icon size={22} style={{ color: "var(--maroon)" }} />
      </span>
      <span ref={numRef} className="font-num text-4xl font-semibold" style={{ color: "var(--maroon)" }}>
        {stat.value}
      </span>
      <span className="mt-1 text-[11px] tracking-[0.14em] uppercase" style={{ color: "var(--ink-soft)" }}>
        {stat.label}
      </span>
    </div>
  );
};

const Hero = () => {
  const heroRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Start animations immediately, don't wait for image
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(".hero-line", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 })
        .fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(".hero-cta", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

      // Portrait fades in when loaded
      if (imageLoaded) {
        gsap.fromTo(".hero-portrait",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
        );
      }
    }, heroRef);
    return () => ctx.revert();
  }, [imageLoaded]);

  return (
    <section ref={heroRef} className="relative overflow-hidden pt-20 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24" style={{ background: "var(--ivory)" }}>
      <RangoliBg className="absolute -left-24 bottom-0 h-[420px] w-[420px] sm:h-[520px] sm:w-[520px]" opacity={0.13} />
      <RangoliBg className="absolute -right-24 top-0 h-[420px] w-[420px] sm:h-[520px] sm:w-[520px]" opacity={0.13} />
      <HangingLamp className="pointer-events-none absolute left-4 top-16 hidden lg:block lg:h-40 xl:h-48 2xl:h-56" />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-8 px-4 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:px-10">
        {/* Left Content */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <p className="hero-sub eyebrow mb-4 text-[0.65rem] sm:mb-5 sm:text-xs" style={{ color: "var(--bronze)" }}>{HERO.eyebrow}</p>
          <h1 className="font-serif-display font-semibold leading-[1.05]" style={{ color: "var(--maroon)" }}>
            {HERO.title.map((t, i) => (
              <span key={i} className="hero-line block text-[2rem] sm:text-[2.6rem] md:text-6xl">{t}</span>
            ))}
          </h1>
          <p className="hero-sub mx-auto mt-4 max-w-md text-sm leading-relaxed sm:mt-6 sm:text-base lg:mx-0" style={{ color: "var(--ink-soft)" }}>
            {HERO.subtitle}
          </p>
          <div className="hero-cta mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:gap-4 sm:flex-wrap lg:justify-start">
            <LuxeButton to="/productions">Explore the Journey</LuxeButton>
            <LuxeButton to="/connect" variant="outline">Get in Touch</LuxeButton>
          </div>
        </div>

        {/* Right portrait */}
        <div className="order-1 flex justify-center lg:order-2">
          <div className="hero-portrait relative w-[280px] sm:w-[340px] md:w-[420px] lg:w-[500px]" style={{ opacity: imageLoaded ? 1 : 0.3 }}>
            <TempleArchFrame className="h-[420px] sm:h-[500px] md:h-auto lg:h-auto">
              <img
                src={HERO.portrait}
                alt="Kousalya Nivas"
                className="h-auto w-full object-cover"
                style={{ objectPosition: "center 30%" }}
                onLoad={() => setImageLoaded(true)}
                loading="eager"
                fetchpriority="high"
              />
            </TempleArchFrame>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const statsRef = useReveal();
  const aboutRef = useReveal();
  const prodRef = useReveal();
  const scrollRef = useRef(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Auto-scroll animation for gallery
  useEffect(() => {
    if (!scrollRef.current || !GALLERY?.length) return;

    const scrollContainer = scrollRef.current;
    let animationFrameId;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 0.5;

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

  return (
    <div>
      <Hero />

      {/* Stats */}
      <section className="relative -mt-4 pb-20" style={{ background: "var(--ivory)" }}>
        <div ref={statsRef} className="mx-auto grid max-w-[1400px] grid-cols-2 gap-4 px-6 sm:gap-5 lg:grid-cols-5 lg:px-10">
          {STATS.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>
      </section>

      {/* About preview */}
      <section className="relative overflow-hidden py-24" style={{ background: "var(--cream)" }}>
        <div ref={aboutRef} className="mx-auto grid max-w-[1280px] items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
          <div data-reveal className="relative flex justify-center">
            <div className="relative w-[320px] sm:w-[400px]">
              <RangoliBg className="absolute -inset-10 -z-10 h-auto w-auto" opacity={0.18} />
              <TempleArchFrame className="h-auto sm:h-auto">
                <img src={HERO.portrait} alt="Kousalya Nivas portrait" className="h-auto w-full object-cover" />
              </TempleArchFrame>
            </div>
          </div>
          <div data-reveal>
            <p className="eyebrow mb-3" style={{ color: "var(--bronze)" }}>The Artist</p>
            <h2 className="font-serif-display text-4xl font-semibold leading-tight md:text-5xl" style={{ color: "var(--maroon)" }}>
              {ABOUT_PREVIEW.heading}
            </h2>
            <KolamDivider className="my-6" center={false} />
            <p className="text-base leading-relaxed text-justify" style={{ color: "var(--ink-soft)" }}>
              {ABOUT_PREVIEW.body}
            </p>
            <p className="mt-6 font-serif-display text-3xl italic" style={{ color: "var(--maroon-soft)" }}>
              {ABOUT_PREVIEW.signature}
            </p>
            <div className="mt-8">
              <LuxeButton to="/about" variant="outline">Know More</LuxeButton>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Productions */}
      <section className="py-24" style={{ background: "var(--ivory)" }}>
        <SectionTitle eyebrow="Signature Works" title="Featured Productions" />
        <div ref={prodRef} className="mx-auto mt-14 grid max-w-[1400px] gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          {PRODUCTIONS.slice(0, 4).map((p) => (
            <Link
              key={p.slug}
              to={`/productions/${p.slug}`}
              data-reveal
              className="zoom-parent group relative block overflow-hidden rounded-xl"
              style={{ border: "1px solid rgba(182,138,62,0.4)" }}
            >
              <div className="relative h-[400px] overflow-hidden">
                <img src={p.image} alt={p.title} className="zoom-img h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(40,16,20,0.92) 8%, rgba(40,16,20,0.15) 55%, transparent)" }} />
                <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                  <Lotus className="mx-auto mb-2 h-5 w-10" color="var(--gold-light)" />
                  <h3 className="font-serif-display text-2xl font-semibold tracking-wide" style={{ color: "var(--ivory)" }}>{p.title}</h3>
                  <p className="mt-1 text-[11px] tracking-[0.18em] uppercase" style={{ color: "var(--gold-light)" }}>{p.subtitle}</p>
                </div>
              </div>
              <span className="pointer-events-none absolute inset-2 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ border: "1px solid var(--gold-light)" }} />
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <LuxeButton to="/productions" variant="outline">View All Productions</LuxeButton>
        </div>
      </section>

      {/* Gallery Scrolling Section */}
      <section className="py-16" style={{ background: "var(--cream)" }}>
        <SectionTitle eyebrow="Visual Journey" title="Moments Captured" />
        <div className="relative mt-12 h-[280px] md:h-[360px] overflow-hidden">
          {/* Fading edges */}
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
            {[...GALLERY.slice(0, 12), ...GALLERY.slice(0, 12)].map((item, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxImage(item.src)}
                className="group relative h-full flex-shrink-0 overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
                style={{
                  width: window.innerWidth < 768 ? '200px' : '280px',
                  border: "2px solid var(--gold)",
                  boxShadow: "0 20px 40px -20px rgba(110,20,35,0.4)"
                }}
              >
                <img
                  src={item.src}
                  alt={item.cat}
                  className="h-full w-full object-cover"
                />
                {/* Category badge on hover */}
                <div className="absolute left-3 top-3 rounded-full px-3 py-1 text-[9px] font-semibold tracking-[0.12em] uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "var(--gold-light)", color: "var(--maroon-deep)" }}
                >
                  {item.cat}
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.16em] uppercase transition-colors duration-300 hover:opacity-70" style={{ color: "var(--maroon)" }}>
            View Full Gallery
            <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* Quote strip */}
      <section className="relative overflow-hidden py-24" style={{ background: "var(--parchment)" }}>
        <RangoliBg className="absolute -left-24 top-1/2 h-80 w-80 -translate-y-1/2" opacity={0.12} />
        <RangoliBg className="absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2" opacity={0.12} />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <TempleLamp className="mx-auto mb-6 h-24" />
          <p className="font-serif-display text-3xl italic leading-snug md:text-4xl" style={{ color: "var(--maroon)" }}>
            “Dance is not just my profession, it is my prayer, my purpose and my path.”
          </p>
          <DiyaRow className="mx-auto mt-8 h-8 w-56" />
        </div>
      </section>

      {/* Initiatives CTA */}
      <section className="py-24" style={{ background: "var(--maroon)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Lotus className="mx-auto mb-5 h-7 w-14" color="var(--gold-light)" />
          <h2 className="font-serif-display text-4xl font-semibold md:text-5xl" style={{ color: "var(--ivory)" }}>
            Beyond the Stage
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed" style={{ color: "rgba(251,246,236,0.82)" }}>
            {INITIATIVES.intro}
          </p>
          <div className="mt-9 flex justify-center">
            <Link
              to="/initiatives"
              className="group inline-flex items-center gap-2 px-7 py-3.5 text-[12px] font-semibold tracking-[0.18em] uppercase transition-all duration-300"
              style={{ background: "var(--gold-light)", color: "var(--maroon-deep)" }}
            >
              Discover Initiatives
              <ChevronRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(40,16,20,0.95)" }}
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-110"
            style={{ border: "1px solid var(--gold)", color: "var(--gold-light)" }}
            onClick={() => setLightboxImage(null)}
            aria-label="Close"
          >
            <span className="text-2xl">×</span>
          </button>
          <div
            className="overflow-hidden rounded-lg"
            style={{ border: "3px solid var(--gold)", boxShadow: "0 30px 80px -20px rgba(182,138,62,0.6)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage}
              alt="Gallery"
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
