import { useState } from "react";
import { motion } from "framer-motion";
import { contact } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { useLanguage } from "../contexts/LanguageContext";

const formInitial = { name: "", email: "", message: "" };

function Contact() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [form, setForm] = useState(formInitial);
  const [status, setStatus] = useState(null);
  const isEn = language === "en";
  const contactTitle = isEn && contact.titleEn ? contact.titleEn : contact.title;
  const contactSubtitle = isEn && contact.subtitleEn ? contact.subtitleEn : contact.subtitle;
  const successMessage = isEn && contact.formSuccessMessageEn ? contact.formSuccessMessageEn : contact.formSuccessMessage;
  const errorMessage = isEn && contact.formErrorMessageEn ? contact.formErrorMessageEn : contact.formErrorMessage;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 800));
    console.log("Form submitted:", form);
    setStatus("success");
    setForm(formInitial);
  };

  return (
    <section
      id="contact"
      className="relative h-[100dvh] min-h-[100dvh] max-h-[100dvh] flex flex-col overflow-hidden border-t border-theme-subtle"
    >
      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center justify-center px-4 sm:px-6 py-4 sm:py-6">
        <div className="max-w-3xl w-full mx-auto my-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border bg-theme-card p-6 sm:p-8 backdrop-blur-sm"
            style={{ borderColor: "var(--border)" }}
          >
            <h2 className="font-display font-bold text-xl sm:text-2xl mb-1 sm:mb-2" style={{ color: "var(--text-primary)" }}>
              {contactTitle}
            </h2>
            <p className="text-sm sm:text-base text-theme-muted-2 mb-4 sm:mb-5">{contactSubtitle}</p>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
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
                      className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-theme-card border focus:outline-none focus:ring-2 transition-all text-base"
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
                      className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-theme-card border focus:outline-none focus:ring-2 transition-all text-base"
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
                      className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-theme-card border focus:outline-none focus:ring-2 transition-all resize-none text-base"
                      style={{ borderColor: "var(--border)", color: "var(--text-primary)", ["--tw-ring-color"]: "var(--accent)" }}
                  placeholder={t("contact.placeholderMessage")}
                />
              </div>
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 sm:py-4 px-6 rounded-xl font-medium text-base text-white bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] hover:from-[#6d28d9] hover:to-[#8b5cf6] focus:outline-none focus:ring-2 focus:ring-[#a78bfa]/50 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#7c3aed]/20"
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
      </div>

      <footer className="shrink-0 flex-shrink-0 min-h-[4.5rem] sm:min-h-[5rem] border-t border-theme-subtle py-5 sm:py-6 px-4 sm:px-6 safe-x safe-bottom bg-theme-base">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-between gap-3 text-center sm:text-left">
          <p className="text-sm sm:text-base text-theme-muted-2 whitespace-normal">
            © {new Date().getFullYear()} — {t("footer.madeWith")}
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 shrink-0" aria-label="Enlaces">
            <a href={`mailto:${contact.email}`} className="text-sm sm:text-base text-theme-muted-2 hover-accent transition-colors whitespace-nowrap">
              {t("footer.email")}
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base text-theme-muted-2 hover-accent transition-colors whitespace-nowrap">
              {t("footer.linkedin")}
            </a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base text-theme-muted-2 hover-accent transition-colors whitespace-nowrap">
              {t("footer.github")}
            </a>
          </nav>
        </div>
      </footer>
    </section>
  );
}

export default Contact;
