/**
 * Traducciones de la UI del portafolio.
 * Idioma por defecto: español. Toggle para inglés.
 */

export const translations = {
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      projects: "Proyectos",
      skills: "Skills",
      contact: "Contacto",
    },
    hero: {
      hi: "Hola, soy",
      contactMe: "Contacto",
      downloadCv: "Descargar CV",
    },
    about: {
      title: "Sobre mí",
    },
    projects: {
      title: "Proyectos",
      subtitle: "Algunos de los trabajos recientes en los que he participado.",
      viewProject: "Ver proyecto",
      project: "Proyecto",
      repository: "Repositorio",
      demo: "Demo",
      details: "Detalles",
      close: "Cerrar",
    },
    skills: {
      title: "Skills",
      subtitle: "Tecnologías y herramientas con las que trabajo a diario.",
    },
    contact: {
      title: "Contacto",
      subtitle: "¿Tienes un proyecto en mente? Escríbeme.",
      nameLabel: "Nombre",
      emailLabel: "Email",
      messageLabel: "Mensaje",
      sendButton: "Enviar mensaje",
      sending: "Enviando...",
      placeholderName: "Tu nombre",
      placeholderEmail: "tu@email.com",
      placeholderMessage: "Cuéntame sobre tu proyecto...",
      successMessage: "Mensaje enviado. Te responderé pronto.",
      errorMessage: "Algo falló. Intenta de nuevo o escríbeme a mi email.",
    },
    footer: {
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      madeWith: "Todos los derechos reservados",
    },
    a11y: {
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      goTo: "Ir a",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About me",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact me",
    },
    hero: {
      hi: "Hi, I'm",
      contactMe: "Contact me",
      downloadCv: "Download CV",
    },
    about: {
      title: "About me",
    },
    projects: {
      title: "Projects",
      subtitle: "Some of the recent work I've been part of.",
      viewProject: "View project",
      project: "Project",
      repository: "Repository",
      demo: "Demo",
      details: "Details",
      close: "Close",
    },
    skills: {
      title: "Skills",
      subtitle: "Technologies and tools I work with every day.",
    },
    contact: {
      title: "Contact me",
      subtitle: "Have a project in mind? Get in touch.",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      sendButton: "Send message",
      sending: "Sending...",
      placeholderName: "Your name",
      placeholderEmail: "you@email.com",
      placeholderMessage: "Tell me about your project...",
      successMessage: "Message sent. I'll get back to you soon.",
      errorMessage: "Something went wrong. Try again or email me directly.",
    },
    footer: {
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      madeWith: "All rights reserved",
    },
    a11y: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
      goTo: "Go to",
    },
  },
};

/** Obtiene el texto traducido por clave (ej: 'nav.home') */
export function getTranslation(lang, key) {
  const keys = key.split(".");
  let value = translations[lang] ?? translations.es;
  for (const k of keys) {
    value = value?.[k];
  }
  return value ?? key;
}
