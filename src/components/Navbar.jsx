import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data/mock";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "var(--ivory)",
        borderBottom: "1px solid rgba(182,138,62,0.3)",
        boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-2 py-3 sm:px-5 lg:px-7">
        {/* Logo */}
        <Link to="/" className="group flex items-center">
          <img
            src="/logo.png"
            alt="Kousalya Nivas"
            className="h-16 sm:h-20 md:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.path;
            return (
              <li key={l.path}>
                <Link
                  to={l.path}
                  className=" text-[13px]  h-12 relative px-3 py-2  font-medium tracking-[0.14em] uppercase transition-colors"
                  style={{ color: active ? "var(--maroon)" : "var(--ink-soft)" }}
                >
                  {l.label}
                  <span
                    className="absolute bottom-0 left-1/2 h-[2px] translate-x-1/2 rounded transition-all duration-300"
                    style={{  background: "var(--gold)" }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          aria-label="Toggle menu"
          className="xl:hidden rounded-md p-2"
          style={{ color: "var(--maroon)" }}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="overflow-hidden xl:hidden transition-all duration-500"
        style={{ maxHeight: open ? "640px" : "0px", background: "var(--ivory)" }}
      >
        <ul className="flex flex-col px-6 pb-6 pt-2">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.path;
            return (
              <li key={l.path}>
                <Link
                  to={l.path}
                  className="block border-b py-3 text-base tracking-[0.14em] uppercase"
                  style={{ color: active ? "var(--maroon)" : "var(--ink-soft)", borderColor: "rgba(182,138,62,0.2)" }}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
