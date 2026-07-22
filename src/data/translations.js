/**
 * Traducciones de la UI del portafolio.
 * Idioma por defecto: español. Toggle para inglés.
 */

export const translations = {
  es: {
    nav: {
      home: "Inicio",
      whatIBuild: "Qué construyo",
      about: "Sobre mí",
      projects: "Proyectos",
      howIWork: "Cómo trabajo",
      skills: "Skills",
      contact: "Contacto",
    },
    hero: {
      hi: "Hola, soy",
      contactMe: "Contacto",
      downloadCv: "Descargar CV",
      indicators: ["Aplicaciones web", "Plataformas SaaS", "Integraciones de IA", "Arquitectura en la nube"],
    },
    whatIBuild: {
      title: "Qué construyo",
      subtitle: "Esto es lo que puedo construir para ti: tres tipos de problemas que resuelvo de punta a punta.",
    },
    trust: {
      eyebrow: "En números",
      heading: "Resultados que se pueden verificar",
      subtitle: "Cifras honestas, sin inflar: esto es lo que hay hoy.",
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
    howIWork: {
      title: "Cómo trabajo",
    },
    skills: {
      title: "Experiencia técnica",
      subtitle: "Tecnologías y herramientas que domino, organizadas por área.",
    },
    contact: {
      title: "Contacto",
      subtitle: "¿Tienes un producto o sistema en la cabeza? Cuéntamelo — respondo en 24–48 horas.",
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
      navHeading: "Navegación",
      resourcesHeading: "Recursos",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      locationLabel: "Ubicación",
    },
    a11y: {
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      goTo: "Ir a",
    },
    easterEgg: {
      dismiss: "Cerrar",
    },
  },
  en: {
    nav: {
      home: "Home",
      whatIBuild: "What I build",
      about: "About me",
      projects: "Projects",
      howIWork: "How I work",
      skills: "Skills",
      contact: "Contact me",
    },
    hero: {
      hi: "Hi, I'm",
      contactMe: "Contact me",
      downloadCv: "Download CV",
      indicators: ["Web Applications", "SaaS Platforms", "AI Integrations", "Cloud Architecture"],
    },
    whatIBuild: {
      title: "What I build",
      subtitle: "Here's what I can build for you: three kinds of problems I solve end to end.",
    },
    trust: {
      eyebrow: "By the numbers",
      heading: "Results you can verify",
      subtitle: "Honest numbers, no inflation: this is what's real today.",
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
    howIWork: {
      title: "How I work",
    },
    skills: {
      title: "Technical Expertise",
      subtitle: "Technologies and tools I work with, organized by area.",
    },
    contact: {
      title: "Contact me",
      subtitle: "Got a product or system in mind? Tell me about it — I reply within 24–48 hours.",
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
      navHeading: "Navigation",
      resourcesHeading: "Resources",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      locationLabel: "Location",
    },
    a11y: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
      goTo: "Go to",
    },
    easterEgg: {
      dismiss: "Close",
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
