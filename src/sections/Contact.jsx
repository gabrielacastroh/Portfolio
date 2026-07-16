import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import FastMarquee from "react-fast-marquee";
import { contact, navLinks } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { useLanguage } from "../contexts/useLanguage";
import TitleReveal from "../components/TitleReveal";
import ScrollStatement from "../components/ScrollStatement";
import OrbitalText from "../components/OrbitalText";
import { fadeUp, staggerContainer, EASE } from "../lib/motion";
import { scrollToSection } from "../lib/smoothScroll";

const CLOSING_SEPARATOR = "·";

/** Slim single-row marquee bookend for the footer area — same edge-fade mask
 * and reduced-motion `play` gating as Marquee.jsx's MarqueeRow, with content
 * distinct from the top-of-page marquee. */
function ClosingMarquee({ words }) {
  const prefersReducedMotion = useReducedMotion();
  const loopWords = words.length < 6 ? [...words, ...words, ...words] : words;

  return (
    <div
      className="relative"
      style={{
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <FastMarquee direction="left" speed={20} pauseOnHover gradient={false} play={!prefersReducedMotion}>
        {loopWords.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="font-display uppercase tracking-wide whitespace-nowrap text-theme-muted-2 text-sm sm:text-base font-medium"
          >
            {word}
            <span className="mx-5 sm:mx-6 opacity-40" aria-hidden>
              {CLOSING_SEPARATOR}
            </span>
          </span>
        ))}
      </FastMarquee>
    </div>
  );
}

const formInitial = { name: "", email: "", message: "" };

const container = staggerContainer({ stagger: 0.1, delayChildren: 0.1 });

/** Netlify Forms requires a URL-encoded POST to "/" with the form-name field. */
function encodeFormData(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

function EmailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function LocationIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InfoCard({ icon, label, value, href, external }) {
  const iconEl = <span className="shrink-0 w-9 h-9 rounded-lg border flex items-center justify-center" style={{ borderColor: "var(--border)", color: "var(--accent)" }}>{icon}</span>;
  const content = (
    <>
      {iconEl}
      <span className="min-w-0">
        <span className="block text-xs text-theme-muted-2">{label}</span>
        <span className="block text-sm sm:text-base font-medium truncate" style={{ color: "var(--text-primary)" }}>{value}</span>
      </span>
    </>
  );
  const baseClass = "flex items-center gap-3 px-4 py-3 rounded-xl border bg-theme-card";
  const style = { borderColor: "var(--border)" };

  if (href) {
    return (
      <motion.a
        variants={fadeUp}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        whileHover={{ y: -2, scale: 1.015, borderColor: "var(--accent)" }}
        transition={{ duration: 0.2 }}
        className={`${baseClass} focus:outline-none focus:ring-2`}
        style={style}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div variants={fadeUp} className={baseClass} style={style}>
      {content}
    </motion.div>
  );
}

function Contact() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [form, setForm] = useState(formInitial);
  const [status, setStatus] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  const isEn = language === "en";
  const contactTitle = isEn && contact.titleEn ? contact.titleEn : contact.title;
  const contactSubtitle = isEn && contact.subtitleEn ? contact.subtitleEn : contact.subtitle;
  const heading = isEn && contact.headingEn ? contact.headingEn : contact.heading;
  const availabilityNote = isEn && contact.availabilityNoteEn ? contact.availabilityNoteEn : contact.availabilityNote;
  const location = isEn && contact.locationEn ? contact.locationEn : contact.location;
  const footerTagline = isEn && contact.footerTaglineEn ? contact.footerTaglineEn : contact.footerTagline;
  const ctaHeading = isEn && contact.ctaHeadingEn ? contact.ctaHeadingEn : contact.ctaHeading;
  const ctaText = isEn && contact.ctaTextEn ? contact.ctaTextEn : contact.ctaText;
  const ctaButton = isEn && contact.ctaButtonEn ? contact.ctaButtonEn : contact.ctaButton;
  const successMessage = isEn && contact.formSuccessMessageEn ? contact.formSuccessMessageEn : contact.formSuccessMessage;
  const errorMessage = isEn && contact.formErrorMessageEn ? contact.formErrorMessageEn : contact.formErrorMessage;
  const navLabel = (link) => (isEn && link.labelEn ? link.labelEn : link.label);
  const footerNavLinks = navLinks.filter((link) => link.id !== "contact");
  const closingStatement = isEn && contact.closingStatementEn ? contact.closingStatementEn : contact.closingStatement;
  const orbitalClosing = isEn && contact.orbitalClosingEn ? contact.orbitalClosingEn : contact.orbitalClosing;
  const closingMarqueeWords =
    isEn && contact.closingMarqueeWordsEn ? contact.closingMarqueeWordsEn : contact.closingMarqueeWords;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData({ "form-name": "contact", "bot-field": "", ...form }),
      });
      if (!response.ok) throw new Error(`Netlify Forms responded with ${response.status}`);
      setStatus("success");
      setForm(formInitial);
    } catch {
      setStatus("error");
    }
  };

  const handleFooterNavClick = (e, href) => {
    e.preventDefault();
    scrollToSection(href);
  };

  const infoCards = [
    { key: "email", icon: <EmailIcon className="w-4 h-4" />, label: t("footer.emailLabel"), value: contact.email, href: `mailto:${contact.email}` },
    { key: "linkedin", icon: <LinkedinIcon className="w-4 h-4" />, label: t("footer.linkedinLabel"), value: "LinkedIn", href: contact.linkedin, external: true },
    { key: "github", icon: <GithubIcon className="w-4 h-4" />, label: t("footer.githubLabel"), value: "GitHub", href: contact.github, external: true },
    { key: "location", icon: <LocationIcon className="w-4 h-4" />, label: t("footer.locationLabel"), value: location },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen px-4 sm:px-6 py-16 sm:py-24 border-t border-theme-subtle overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* LEFT — headline, positioning, contact info cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <TitleReveal
            as="h2"
            text={heading}
            highlightLastN={2}
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl leading-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          />
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-theme-muted-2 mb-2">
            {contactSubtitle}
          </motion.p>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-theme-muted mb-8">
            {availabilityNote}
          </motion.p>

          <div className="flex flex-col gap-3">
            {infoCards.map((card) => (
              <InfoCard key={card.key} icon={card.icon} label={card.label} value={card.value} href={card.href} external={card.external} />
            ))}
          </div>
        </motion.div>

        {/* RIGHT — contact form. The one "reveal" moment of the finale: a
            slightly more cinematic entrance (blur + scale on top of the
            usual fade/rise), reduced motion keeps only opacity. */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 24, scale: 0.98, filter: "blur(4px)" }
          }
          whileInView={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          }
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: prefersReducedMotion ? 0.4 : 0.7, ease: EASE }}
          className="rounded-2xl border bg-theme-card p-6 sm:p-8 backdrop-blur-sm"
          style={{ borderColor: "var(--border)" }}
        >
          <h3 className="font-display font-bold text-lg sm:text-xl mb-4 sm:mb-5" style={{ color: "var(--text-primary)" }}>
            {contactTitle}
          </h3>

          <form onSubmit={handleSubmit} name="contact" className="space-y-3 sm:space-y-4">
            {/* Honeypot field for Netlify Forms spam filtering — kept off-screen, not display:none */}
            <input
              type="text"
              name="bot-field"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute w-px h-px overflow-hidden opacity-0 -z-10"
              style={{ left: "-9999px" }}
            />
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium mb-1 text-theme-muted">
                {t("contact.nameLabel")}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-theme-card border focus:outline-none focus:ring-2 transition-[border-color,box-shadow] text-base"
                style={{ borderColor: "var(--border)", color: "var(--text-primary)", ["--tw-ring-color"]: "var(--accent)" }}
                placeholder={t("contact.placeholderName")}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium mb-1 text-theme-muted">
                {t("contact.emailLabel")}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-theme-card border focus:outline-none focus:ring-2 transition-[border-color,box-shadow] text-base"
                style={{ borderColor: "var(--border)", color: "var(--text-primary)", ["--tw-ring-color"]: "var(--accent)" }}
                placeholder={t("contact.placeholderEmail")}
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium mb-1 text-theme-muted">
                {t("contact.messageLabel")}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-theme-card border focus:outline-none focus:ring-2 transition-[border-color,box-shadow] resize-none text-base"
                style={{ borderColor: "var(--border)", color: "var(--text-primary)", ["--tw-ring-color"]: "var(--accent)" }}
                placeholder={t("contact.placeholderMessage")}
              />
            </div>
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 sm:py-4 px-6 rounded-xl font-medium text-base text-white bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] hover:from-[#6d28d9] hover:to-[#8b5cf6] focus:outline-none focus:ring-2 focus:ring-[#a78bfa]/50 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-lg shadow-[#7c3aed]/20"
            >
              {status === "sending" ? t("contact.sending") : t("contact.sendButton")}
            </motion.button>
          </form>

          {status === "success" && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-sm text-emerald-400">
              {successMessage}
            </motion.p>
          )}
          {status === "error" && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-sm text-red-400">
              {errorMessage}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Closing statement — bridges the two-column area into the footer,
          reusing ScrollStatement (no fork) with content distinct from
          About's statement. A contained, slightly stronger local glow and a
          decorative OrbitalText ring sit behind it, both aria-hidden and
          kept within this section's overflow-hidden bounds. */}
      {closingStatement && (
        <div className="relative max-w-4xl mx-auto mt-24 sm:mt-32 text-center">
          <div
            className="pointer-events-none absolute inset-0 -z-[1] blur-3xl"
            style={{
              background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(124, 58, 237, 0.12), transparent 65%)",
            }}
            aria-hidden
          />
          {orbitalClosing && (
            <div className="hidden lg:block absolute right-[4%] top-1/2 -translate-y-1/2 -z-[1]" aria-hidden>
              <OrbitalText text={orbitalClosing} size={200} direction={1} />
            </div>
          )}
          <ScrollStatement
            text={closingStatement}
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl leading-snug"
          />
        </div>
      )}

      {/* Closing marquee — slim band bookending the top-of-page Marquee,
          with content distinct from its rowOne/rowTwo. */}
      {closingMarqueeWords && closingMarqueeWords.length > 0 && (
        <div className="max-w-6xl mx-auto mt-14 sm:mt-20">
          <ClosingMarquee words={closingMarqueeWords} />
        </div>
      )}

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-14 sm:mt-16 pt-10 sm:pt-12 border-t border-theme-subtle">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div>
            <a
              href="#hero"
              onClick={(e) => handleFooterNavClick(e, "#hero")}
              className="font-display font-semibold text-lg tracking-[0.04em] transition-colors duration-200 hover:opacity-90"
              style={{ color: "var(--accent)" }}
            >
              Gabriela Castro
            </a>
            <p className="mt-3 text-sm text-theme-muted-2 leading-relaxed max-w-xs">{footerTagline}</p>
          </div>

          {/* Navegación */}
          <nav aria-label={t("footer.navHeading")}>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 text-theme-muted-2">{t("footer.navHeading")}</h4>
            <ul className="flex flex-col gap-2">
              {footerNavLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => handleFooterNavClick(e, link.href)}
                    className="text-sm text-theme-muted hover-accent transition-colors"
                  >
                    {navLabel(link)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Recursos */}
          <nav aria-label={t("footer.resourcesHeading")}>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 text-theme-muted-2">{t("footer.resourcesHeading")}</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a href={`mailto:${contact.email}`} className="text-sm text-theme-muted hover-accent transition-colors">
                  {t("footer.email")}
                </a>
              </li>
              <li>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-theme-muted hover-accent transition-colors">
                  {t("footer.linkedin")}
                </a>
              </li>
              <li>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-sm text-theme-muted hover-accent transition-colors">
                  {t("footer.github")}
                </a>
              </li>
            </ul>
          </nav>

          {/* CTA */}
          <div>
            <h4 className="font-display font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>{ctaHeading}</h4>
            <p className="text-sm text-theme-muted-2 mb-4 leading-relaxed">{ctaText}</p>
            <a
              href={`mailto:${contact.email}`}
              className="hover-lift inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border bg-theme-card text-sm font-medium focus:outline-none focus:ring-2 min-h-[44px]"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            >
              {ctaButton}
            </a>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 pt-6 border-t border-theme-subtle text-center">
          <p className="text-sm text-theme-muted-2">
            © {new Date().getFullYear()} — {t("footer.madeWith")}
          </p>
        </div>
      </footer>
    </section>
  );
}

export default Contact;
