import { contact } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { useLanguage } from "../contexts/LanguageContext";

function Footer() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  return (
    <footer className="border-t border-theme-subtle py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-theme-muted-2">
          © {new Date().getFullYear()} — {t("footer.madeWith")}
        </p>
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${contact.email}`}
            className="text-sm text-theme-muted-2 hover-accent transition-colors"
          >
            {t("footer.email")}
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-theme-muted-2 hover-accent transition-colors"
          >
            {t("footer.linkedin")}
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-theme-muted-2 hover-accent transition-colors"
          >
            {t("footer.github")}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
