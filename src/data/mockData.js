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
    screenshots: ["/projects/sync.png"],
    tech: ["React", "TypeScript", "Zustand", "Tailwind", "Framer Motion", "dnd-kit"],
    highlights: [
      "Drag-and-drop entre columnas con soporte multi-tablero y persistencia local",
      "Simulación de colaboración en tiempo real con presencia de usuarios",
      "Command palette con búsqueda global y atajos de teclado globales",
      "Arquitectura modular escalable con Zustand y TypeScript estricto",
      "Animaciones fluidas con Framer Motion y transiciones suaves",
    ],
    highlightsEn: [
      "Drag-and-drop across columns with multi-board support and local persistence",
      "Real-time collaboration simulation with user presence indicators",
      "Command palette with global search and keyboard shortcuts",
      "Scalable modular architecture with Zustand and strict TypeScript",
      "Fluid animations with Framer Motion and smooth transitions",
    ],
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
    screenshots: ["/projects/orbit.png"],
    tech: ["React", "TypeScript", "Tailwind", "TanStack Query", "Zustand", "Recharts"],
    highlights: [
      "Dashboards analíticos con métricas de adopción de features y KPIs del producto",
      "Gestión completa de experimentos A/B con análisis de resultados",
      "Control de roles y permisos para colaboradores del equipo",
      "Activity feed centralizado con historial de eventos del producto",
      "State management tipado con TanStack Query y Zustand",
    ],
    highlightsEn: [
      "Analytical dashboards with feature adoption metrics and product KPIs",
      "Full A/B experiment management with results analysis",
      "Role-based access control and permissions for team contributors",
      "Centralized activity feed with product event history",
      "Typed state management with TanStack Query and Zustand",
    ],
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
    screenshots: ["/projects/momentum.png"],
    tech: ["React", "TypeScript", "Django REST", "PostgreSQL", "Tailwind", "Docker"],
    highlights: [
      "Autenticación JWT con sesiones seguras y manejo de tokens",
      "Metas con subtareas y cálculo automático de porcentaje de progreso",
      "Rachas de actividad y estadísticas de rendimiento mensual",
      "Gráficos de evolución temporal con historial de progreso completo",
      "Arquitectura full-stack modular dockerizada para despliegue fácil",
    ],
    highlightsEn: [
      "JWT authentication with secure sessions and token management",
      "Goals with subtasks and automatic progress percentage calculation",
      "Activity streaks and monthly performance statistics",
      "Time-based evolution charts with complete progress history",
      "Modular full-stack architecture containerized with Docker",
    ],
    repo: "https://github.com/gabrielacastroh/Momentum.git",
    demo: "",
  },
  {
    id: "4",
    title: "QA Intelligence Platform — Auditor Web con IA",
    titleEn: "QA Intelligence Platform — AI-Powered Web QA Auditor",
    description:
      "Plataforma de QA con IA que audita URLs públicas con Playwright, axe-core y LLMs para generar análisis técnicos, reportes de accesibilidad y diagnósticos de navegador.",
    descriptionEn:
      "AI-powered QA auditing platform using Playwright, FastAPI and LLMs to generate automated technical reviews, accessibility reports and browser diagnostics.",
    longDescription:
      "QA Intelligence Platform es una plataforma de auditoría web impulsada por IA que analiza URLs públicas de forma automatizada. Utiliza Playwright para capturar screenshots y diagnosticar errores de consola, axe-core para análisis de accesibilidad, métricas de rendimiento del navegador y LLMs (vía Groq API) para generar revisiones técnicas detalladas en lenguaje natural.\n\nEl backend está construido con FastAPI y Python, dockerizado para facilitar el despliegue. El frontend en React y TypeScript ofrece una interfaz tipo dashboard con resultados en tiempo real.",
    longDescriptionEn:
      "QA Intelligence Platform is an AI-powered web auditing platform that automatically analyzes public URLs. It uses Playwright for full-page screenshots and console error monitoring, axe-core for accessibility analysis, browser performance metrics, and LLMs (via Groq API) to generate detailed technical reviews in natural language.\n\nThe backend is built with FastAPI and Python, containerized with Docker for easy deployment. The React + TypeScript frontend delivers a dashboard-style interface with real-time audit results.",
    image: "/projects/qa-intelligence.png",
    screenshots: ["/projects/qa-intelligence.png"],
    tech: ["React", "TypeScript", "FastAPI", "Python", "Playwright", "Docker", "Groq API", "axe-core", "Tailwind CSS"],
    highlights: [
      "Auditoría automática con Playwright: screenshots completos y monitoreo de errores de consola",
      "Análisis de accesibilidad WCAG en tiempo real con axe-core",
      "Revisiones técnicas en lenguaje natural generadas por LLMs vía Groq API",
      "Métricas de rendimiento del navegador y diagnósticos detallados",
      "Backend FastAPI dockerizado con despliegue escalable en Vercel",
    ],
    highlightsEn: [
      "Automated auditing with Playwright: full-page screenshots and console error monitoring",
      "Real-time WCAG accessibility analysis with axe-core",
      "Natural language technical reviews generated by LLMs via Groq API",
      "Browser performance metrics and detailed diagnostics",
      "Dockerized FastAPI backend with scalable Vercel deployment",
    ],
    repo: "https://github.com/gabrielacastroh/qa-intelligence-platform",
    demo: "https://qa-intelligence-vercel.vercel.app/run-test",
  },
  {
    id: "5",
    title: "LUMET CRM — Plataforma de Operaciones Empresariales",
    titleEn: "LUMET CRM — Business Operations Platform",
    description:
      "Plataforma CRM full-stack para gestión de clientes, productos y operaciones empresariales con autenticación segura, reportes automatizados e infraestructura cloud escalable.",
    descriptionEn:
      "Full-stack CRM platform for managing clients, products and business operations with secure authentication, automated reports and scalable cloud infrastructure.",
    longDescription:
      "LUMET CRM es una plataforma empresarial full-stack diseñada para centralizar la gestión de clientes, productos y operaciones de negocio. Incluye autenticación JWT con control de acceso basado en roles (RBAC), generación automatizada de reportes en PDF y Excel, y despliegue en infraestructura cloud sobre AWS.\n\nEl backend está construido con Django REST Framework y PostgreSQL, containerizado con Docker y ejecutado sobre Linux. El frontend en React ofrece dashboards analíticos, paneles de métricas y flujos de administración propios de un sistema CRM empresarial.",
    longDescriptionEn:
      "LUMET CRM is a full-stack enterprise platform designed to centralize client, product and business operations management. It features JWT authentication with role-based access control (RBAC), automated PDF and Excel report generation, and cloud deployment on AWS infrastructure.\n\nThe backend is built with Django REST Framework and PostgreSQL, containerized with Docker and running on Linux. The React frontend delivers analytical dashboards, metrics panels and administration workflows typical of an enterprise CRM system.",
    image: "/projects/lumet-crm.png",
    screenshots: ["/projects/lumet-crm.png"],
    tech: ["React", "JavaScript", "Django REST", "PostgreSQL", "JWT", "AWS", "Docker", "Linux", "RBAC", "REST APIs"],
    highlights: [
      "Autenticación JWT con control de acceso basado en roles (RBAC) granular",
      "Generación automatizada de reportes en PDF y Excel bajo demanda",
      "Gestión centralizada de clientes, productos y operaciones empresariales",
      "Infraestructura cloud escalable desplegada sobre AWS",
      "Containerización completa con Docker ejecutado sobre servidores Linux",
    ],
    highlightsEn: [
      "JWT authentication with granular role-based access control (RBAC)",
      "Automated on-demand report generation in PDF and Excel formats",
      "Centralized management of clients, products and business operations",
      "Scalable cloud infrastructure deployed on AWS",
      "Full containerization with Docker running on Linux servers",
    ],
    repo: "",
    demo: "",
  },
];


export const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    labelEn: "Frontend",
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Material UI", icon: "mui" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    labelEn: "Backend",
    skills: [
      { name: "FastAPI", icon: "fastapi" },
      { name: "Django REST", icon: "django" },
      { name: "Flask", icon: "flask" },
      { name: "GraphQL", icon: "graphql" },
      { name: "REST APIs", icon: "swagger" },
      { name: "JWT", icon: "jsonwebtokens" },
      { name: "OAuth", icon: "openid" },
    ],
  },
  {
    id: "state-data",
    label: "State & Data",
    labelEn: "State & Data",
    skills: [
      { name: "Zustand", icon: "zustand" },
      { name: "Redux Toolkit", icon: "redux" },
      { name: "TanStack Query", icon: "reactquery" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "SQL Server", icon: "microsoftsqlserver" },
    ],
  },
  {
    id: "cloud-devops",
    label: "Cloud & DevOps",
    labelEn: "Cloud & DevOps",
    skills: [
      { name: "Docker", icon: "docker" },
      { name: "AWS", icon: "amazonaws" },
      { name: "Linux", icon: "linux" },
      { name: "Git", icon: "git" },
    ],
  },
  {
    id: "testing-ai",
    label: "Testing & AI",
    labelEn: "Testing & AI",
    skills: [
      { name: "Playwright", icon: "playwright" },
      { name: "axe-core", icon: "axecore" },
      { name: "LLMs", icon: "openai" },
      { name: "Groq API", icon: "groq" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    labelEn: "Mobile",
    skills: [
      { name: "Flutter", icon: "flutter" },
      { name: "Dart", icon: "dart" },
    ],
  },
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
  /** CV PDF en /public según idioma del sitio (_E = español, _I = inglés). */
  cvUrlEs: "/Gabriela_Castro_CV_E.pdf",
  cvUrlEn: "/Gabriela_Castro_CV_I.pdf",
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
