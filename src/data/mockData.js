export const personal = {
  name: "Gabriela Castro",
  professionalTitle: "Full Stack Developer",
  tagline: "",
  taglineEn: "",
  location: "Barranquilla, Colombia",
  locationEn: "Barranquilla, Colombia",
  metaDescription: "Portafolio de Gabriela Castro Hernández — Full Stack Developer. React, Django REST Framework, Flutter.",
};

export const about = {
  title: "Sobre mí",
  titleEn: "About me",
  photo: "/photo-contact.png",

  description: `Soy Ingeniera de Sistemas con más de 3 años de experiencia desarrollando aplicaciones web y móviles enfocadas en rendimiento, claridad y escalabilidad.

Trabajo principalmente con React y Django REST Framework, construyendo sistemas completos desde la base de datos hasta la interfaz de usuario. Me interesa especialmente crear software bien estructurado que sea fácil de mantener y evolucionar con el tiempo.
He participado en el desarrollo de plataformas educativas y sistemas de gestión, automatizando procesos y mejorando la eficiencia mediante soluciones tecnológicas.

Me enfoco en:
• Arquitectura clara y mantenible
• APIs REST bien estructuradas
• Interfaces intuitivas y consistentes
• Código limpio y escalable
• Soluciones prácticas a problemas reales`,
  descriptionEn: `I am a Systems Engineer with more than 3 years of experience building web and mobile applications focused on performance, clarity and scalability.

I primarily work with React and Django REST Framework, developing complete systems from database design to user interface. I am especially interested in building well-structured software that is easy to maintain and evolve over time.
I have worked on educational platforms and management systems, helping automate processes and improve efficiency through technology.

I focus on:
• Clear and maintainable architecture
• Well-structured REST APIs
• Intuitive and consistent interfaces
• Clean and scalable code
• Practical solutions to real problems`,

  shortBio: "Ingeniera de Sistemas · React · Django REST · Flutter",
  shortBioEn: "Systems Engineer · React · Django REST · Flutter",
};

export const projects = [
  {
    id: "1",
    title: "SYNC – Tablero de colaboración en tiempo real",
    titleEn: "SYNC – Real-Time Collaboration Board",
    description:
      "Tablero colaborativo tipo Jira/Linear con drag-and-drop, simulación en tiempo real y arquitectura frontend escalable.",
    descriptionEn:
      "Collaborative board inspired by Jira and Linear with drag-and-drop, real-time simulation and scalable frontend architecture.",
    longDescription:
      "SYNC es una aplicación frontend que simula un tablero colaborativo moderno inspirado en herramientas como Linear y Notion. Permite crear tableros, columnas y tarjetas con soporte de drag-and-drop entre columnas, persistencia local y simulación de colaboración en tiempo real.\n\nEl proyecto fue diseñado para demostrar arquitectura frontend escalable usando TypeScript estricto, Zustand para manejo de estado y patrones de UI modernos. Incluye command palette, atajos de teclado, animaciones con Framer Motion y persistencia en localStorage.",
    longDescriptionEn:
      "SYNC is a frontend application that simulates a modern collaborative board inspired by tools like Linear and Notion. It allows creating boards, columns and cards with drag-and-drop support, local persistence and simulated real-time collaboration.\n\nThe project was designed to demonstrate scalable frontend architecture using strict TypeScript, Zustand for state management and modern UI patterns. It includes a command palette, keyboard shortcuts, Framer Motion animations and localStorage persistence.",
    image: "/projects/sync.png",
    tech: ["React", "TypeScript", "Zustand", "Tailwind", "Framer Motion", "dnd-kit"],
    repo: "https://github.com/gabrielacastroh/SYNC.git",
    demo: "https://phenomenal-druid-7bdfc0.netlify.app/",
  },
  {
    id: "2",
    title: "ORBIT – Plataforma de Product Operations",
    titleEn: "ORBIT – Product Operations Platform",
    description:
      "Plataforma de análisis de producto con dashboards, experimentos A/B y gestión de colaboradores.",
    descriptionEn:
      "Product analytics platform with dashboards, A/B experiments and contributor management.",
    longDescription:
      "ORBIT es una plataforma orientada a equipos de producto y crecimiento que centraliza métricas, adopción de funcionalidades y actividad del equipo en un solo lugar. Permite analizar el uso del producto, gestionar colaboradores, monitorear features y ejecutar experimentos A/B mediante una interfaz moderna y estructurada.\n\nEl proyecto fue desarrollado con React y TypeScript siguiendo una arquitectura modular escalable. Incluye dashboards analíticos, control de roles, activity feed, command palette y manejo de estado tipado con TanStack Query y Zustand.",
    longDescriptionEn:
      "ORBIT is a platform designed for product and growth teams that centralizes metrics, feature adoption and team activity in a single interface. It allows analyzing product usage, managing contributors, monitoring features and running A/B experiments through a structured and modern UI.\n\nThe project was built with React and TypeScript following a scalable modular architecture. It includes analytical dashboards, role-based access control, activity feeds, a command palette and typed state management with TanStack Query and Zustand.",
    image: "/projects/orbit.png",
    tech: ["React", "TypeScript", "Tailwind", "TanStack Query", "Zustand", "Recharts"],
    repo: "https://github.com/gabrielacastroh/ORBIT.git",
    demo: "https://gleeful-blini-93d8f5.netlify.app/",
  },
  {
    id: "3",
    title: "Momentum – Sistema de Seguimiento de Metas",
    titleEn: "Momentum – Goal Tracking System",
    description:
      "Aplicación full-stack para seguimiento de metas con métricas de progreso, estadísticas y visualización de actividad.",
    descriptionEn:
      "Full-stack goal tracking application with progress metrics, statistics and activity visualization.",
    longDescription:
      "Momentum es una aplicación full-stack enfocada en el seguimiento de metas y el progreso personal mediante métricas medibles y visualización de actividad. Permite crear objetivos con subtareas, calcular automáticamente el porcentaje de progreso y analizar la evolución mediante gráficos y estadísticas.\n\nEl sistema incluye autenticación JWT, historial de progreso, rachas de actividad y paneles de estadísticas mensuales. Fue desarrollado con React y Django REST Framework siguiendo una arquitectura modular y ejecutable mediante Docker.",
    longDescriptionEn:
      "Momentum is a full-stack application focused on tracking goals and measurable progress through activity visualization and statistics. It allows creating goals with subtasks, automatically calculating progress percentages and analyzing progress through charts and metrics.\n\nThe system includes JWT authentication, progress history, activity streak tracking and monthly statistics dashboards. It was built with React and Django REST Framework using a modular architecture and can be run with Docker.",
    image: "/projects/momentum.png",
    tech: ["React", "TypeScript", "Django REST", "PostgreSQL", "Tailwind", "Docker"],
    repo: "https://github.com/gabrielacastroh/Momentum.git",
    demo: "",
  },
];


export const skills = [
  // Frontend: bases → lenguajes → framework
  { name: "HTML", icon: "html5" },
  { name: "CSS", icon: "css" },
  { name: "JavaScript", icon: "javascript" },
  { name: "TypeScript", icon: "typescript" },
  { name: "React", icon: "react" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "Material UI", icon: "mui" },
  { name: "Responsive Design", icon: "css" },
  // Backend
  { name: "Python", icon: "python" },
  { name: "Django REST Framework", icon: "django" },
  { name: "APIs REST", icon: "swagger" },
  // Mobile
  { name: "Flutter", icon: "flutter" },
  // Base de datos
  { name: "SQL", icon: "sqlite" },
  { name: "PostgreSQL", icon: "postgresql" },
  // Herramientas
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
  { name: "Postman", icon: "postman" },
  { name: "Figma", icon: "figma" },
];

export const contact = {
  title: "Contacto",
  titleEn: "Contact me",
  subtitle: "¿Tienes un proyecto en mente? Escríbeme.",
  subtitleEn: "Have a project in mind? Get in touch.",
  email: "gabrielacastroh99@gmail.com",
  location: "Barranquilla, Colombia",
  locationEn: "Barranquilla, Colombia",
  linkedin: "https://www.linkedin.com/in/gabriela-castro-hernandez-gch",
  github: "https://github.com/gabrielacastroh",
  cvUrl: "/CV-2025-E.pdf",
  formSuccessMessage: "Mensaje enviado. Te responderé pronto.",
  formSuccessMessageEn: "Message sent. I'll get back to you soon.",
  formErrorMessage: "Algo falló. Intenta de nuevo o escríbeme a mi email.",
  formErrorMessageEn: "Something went wrong. Try again or email me directly.",
};

export const navLinks = [
  { id: "hero", label: "Inicio", labelEn: "Home", href: "#hero" },
  { id: "about", label: "Sobre mí", labelEn: "About me", href: "#about" },
  { id: "projects", label: "Proyectos", labelEn: "Projects", href: "#projects" },
  { id: "skills", label: "Skills", labelEn: "Skills", href: "#skills" },
  { id: "contact", label: "Contacto", labelEn: "Contact me", href: "#contact" },
];
