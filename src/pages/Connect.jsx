import React, { useState } from "react";
import { PageHero, LuxeButton } from "../components/Shared";
import { Mandala, KolamDivider, Lotus, TempleLamp, RangoliBg } from "../components/decorative/Ornaments";
import { SITE } from "../data/mock";
import { useReveal } from "../hooks/useAnim";
import { Mail, MapPin, Phone, Instagram, Facebook, Youtube, CheckCircle2 } from "lucide-react";

const Field = ({ label, type = "text", name, value, onChange, textarea, required }) => (
  <label className="block">
    <span className="mb-2 block text-[11px] font-medium tracking-[0.14em] uppercase" style={{ color: "var(--bronze)" }}>{label}{required && " *"}</span>
    {textarea ? (
      <textarea name={name} value={value} onChange={onChange} required={required} rows={5} className="w-full rounded-lg bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--maroon)]" style={{ border: "1px solid rgba(182,138,62,0.4)", color: "var(--ink)" }} />
    ) : (
      <input type={type} name={name} value={value} onChange={onChange} required={required} className="w-full rounded-lg bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--maroon)]" style={{ border: "1px solid rgba(182,138,62,0.4)", color: "var(--ink)" }} />
    )}
  </label>
);

const Connect = () => {
  const ref = useReveal();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4500);
  };

  const contacts = [
    { Icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { Icon: MapPin, label: "Location", value: SITE.location },
    { Icon: Phone, label: "Institution", value: "M.S. Naatyakshetra" },
  ];

  return (
    <div>
      <PageHero title="Connect" breadcrumb={[{ label: "Home", path: "/" }, { label: "Connect" }]} />

      <section className="relative overflow-hidden py-20" style={{ background: "var(--ivory)" }}>
        <RangoliBg className="absolute -right-24 top-10 h-[460px] w-[460px]" opacity={0.1} />
        <div ref={ref} className="mx-auto grid max-w-[1200px] gap-12 px-6 lg:grid-cols-2 lg:px-10">
          {/* Left info */}
          <div data-reveal>
            <p className="eyebrow mb-3" style={{ color: "var(--bronze)" }}>Get in Touch</p>
            <h2 className="font-serif-display text-4xl font-semibold" style={{ color: "var(--maroon)" }}>Let's Create Together</h2>
            <KolamDivider className="my-6" center={false} />
            <p className="max-w-md text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              For performance enquiries, collaborations, workshops or media interactions, please reach out. I would be delighted to connect.
            </p>
            <div className="mt-9 space-y-5">
              {contacts.map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "var(--cream)", border: "1px solid var(--gold)" }}>
                    <c.Icon size={20} style={{ color: "var(--maroon)" }} />
                  </span>
                  <div>
                    <p className="text-[11px] tracking-[0.14em] uppercase" style={{ color: "var(--bronze)" }}>{c.label}</p>
                    {c.href ? <a href={c.href} className="text-base" style={{ color: "var(--ink)" }}>{c.value}</a> : <p className="text-base" style={{ color: "var(--ink)" }}>{c.value}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              {[{ Icon: Instagram, href: SITE.socials.instagram }, { Icon: Facebook, href: SITE.socials.facebook }, { Icon: Youtube, href: SITE.socials.youtube }].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[var(--maroon)] hover:text-[var(--ivory)]" style={{ border: "1px solid var(--gold)", color: "var(--maroon)" }}>
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div data-reveal className="luxe-card rounded-2xl p-8">
            <div className="mb-6 flex items-center gap-3">
              <Lotus className="h-6 w-12" color="var(--maroon)" />
              <h3 className="font-serif-display text-2xl font-semibold" style={{ color: "var(--maroon)" }}>Send a Message</h3>
            </div>
            {sent ? (
              <div className="flex flex-col items-center gap-3 rounded-xl px-6 py-12 text-center" style={{ background: "var(--cream)" }}>
                <CheckCircle2 size={44} style={{ color: "var(--maroon)" }} />
                <p className="font-serif-display text-2xl" style={{ color: "var(--maroon)" }}>Thank you!</p>
                <p className="text-sm" style={{ color: "var(--ink-soft)" }}>Your message has been received. I'll respond soon.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" value={form.name} onChange={onChange} required />
                  <Field label="Email" type="email" name="email" value={form.email} onChange={onChange} required />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone" name="phone" value={form.phone} onChange={onChange} />
                  <Field label="Subject" name="subject" value={form.subject} onChange={onChange} required />
                </div>
                <Field label="Message" name="message" value={form.message} onChange={onChange} textarea required />
                <button type="submit" className="group inline-flex w-full items-center justify-center gap-2 px-7 py-3.5 text-[12px] font-semibold tracking-[0.18em] uppercase transition-all duration-300" style={{ background: "var(--maroon)", color: "var(--ivory)" }}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-10" style={{ background: "var(--cream)" }}>
        <div className="flex justify-center"><TempleLamp className="h-16 opacity-70" /></div>
      </section>
    </div>
  );
};

export default Connect;
