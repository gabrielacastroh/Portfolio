export const personal = {
  name: "Gabriela Castro",
  professionalTitle: "Ingeniera de software · Construyo productos y sistemas completos",
  professionalTitleEn: "Software engineer · I build complete products and systems",
  tagline:
    "Del modelo de datos a la interfaz: diseño y construyo sistemas empresariales, productos SaaS y herramientas con IA que resuelven problemas reales.",
  taglineEn:
    "From the data model to the interface: I design and build business systems, SaaS products and AI-powered tools that solve real problems.",
  location: "Barranquilla, Colombia",
  locationEn: "Barranquilla, Colombia",
  metaDescription:
    "Portafolio de Gabriela Castro — Ingeniera de software. Construyo sistemas empresariales, productos SaaS y herramientas con IA, del modelo de datos a la interfaz.",
  rotatingPrefix: "Construyo",
  rotatingPrefixEn: "I build",
  rotatingWords: ["sistemas empresariales", "productos SaaS", "herramientas con IA", "experiencias web"],
  rotatingWordsEn: ["business systems", "SaaS products", "AI-powered tools", "web experiences"],
};

/** Marquee band between Hero and WhatIBuild — brand/keyword terms, largely
 * identical across ES/EN since they're industry-standard terms. Row 2 has a
 * natural translation. */
export const marquee = {
  rowOne: ["SaaS", "Systems", "AI", "Product Engineering", "Automation", "Backend", "APIs"],
  rowOneEn: ["SaaS", "Systems", "AI", "Product Engineering", "Automation", "Backend", "APIs"],
  rowTwo: ["Construyendo productos", "Resolviendo problemas", "Diseñando sistemas", "Construyendo software"],
  rowTwoEn: ["Building products", "Solving problems", "Designing systems", "Shipping software"],
};

/** Compact monochrome tech-logo band between About and Skills. `slug` maps
 * to a Simple Icons slug via src/lib/skillIcons.js; entries without a valid
 * icon (e.g. DRF) render as a small text pill instead. */
export const techMarquee = [
  { slug: "react", name: "React" },
  { slug: "typescript", name: "TypeScript" },
  { slug: "javascript", name: "JavaScript" },
  { slug: "django", name: "Django" },
  { slug: "drf", name: "DRF" },
  { slug: "fastapi", name: "FastAPI" },
  { slug: "postgresql", name: "PostgreSQL" },
  { slug: "amazonaws", name: "AWS" },
  { slug: "docker", name: "Docker" },
  { slug: "git", name: "Git" },
  { slug: "tailwindcss", name: "Tailwind" },
  { slug: "flutter", name: "Flutter" },
];

export const stats = [
  {
    id: "experience",
    value: 3,
    suffix: "+",
    label: "años de experiencia",
    labelEn: "years of experience",
  },
  {
    id: "products",
    value: 5,
    suffix: "",
    label: "productos construidos",
    labelEn: "products built",
  },
  {
    id: "production",
    value: 1,
    suffix: "",
    label: "sistema en producción",
    labelEn: "system in production",
  },
];

export const easterEgg = {
  message:
    "¡Hola! Gracias por curiosear hasta acá. Si llegaste escribiendo 'hola', ya tenemos algo en común: atención al detalle. — Gabriela",
  messageEn:
    "Hi! Thanks for poking around. If you got here by typing 'hola', we already have something in common: attention to detail. — Gabriela",
};

export const about = {
  title: "Sobre mí",
  titleEn: "About me",
  photo: "/photo-contact.png",

  description: `Construyo software porque me gusta que las cosas funcionen bien, no solo que funcionen. Me importa que un sistema sea fácil de entender un año después de escribirlo, no solo el día que se entrega.

Soy Ingeniera de Sistemas de Barranquilla, Colombia. Lo que más me mueve es tomar un problema real —de un negocio, de un equipo, de un usuario— y llevarlo hasta convertirse en un producto que alguien usa todos los días.

Si tienes un producto o un sistema en la cabeza, probablemente pueda ayudarte a construirlo.`,
  descriptionEn: `I build software because I care about things working well, not just working. I want a system to still make sense a year after I wrote it, not only on the day it ships.

I'm a Systems Engineer from Barranquilla, Colombia. What drives me most is taking a real problem —from a business, a team, a user— and turning it into a product people actually use every day.

If you have a product or a system in mind, I can probably help you build it.`,

  exploring: "Actualmente aprendiendo: AWS",
  exploringEn: "Currently learning: AWS",

  shortBio: "Ingeniera de Sistemas · React · Django REST · Flutter",
  shortBioEn: "Systems Engineer · React · Django REST · Flutter",

  statement: "Construyo software que resuelve problemas reales.",
  statementEn: "I build software that solves real problems.",

  orbitalBuilding:
    "Actualmente construyendo · sistemas empresariales · productos SaaS · IA aplicada · herramientas internas · ",
  orbitalBuildingEn:
    "Currently building · business systems · SaaS products · applied AI · internal tools · ",
};

export const whatIBuild = [
  {
    id: "business-systems",
    icon: "systems",
    title: "Sistemas empresariales",
    titleEn: "Business systems",
    description:
      "CRMs, gestión y operaciones: sistemas a medida que ordenan el día a día de un negocio, con roles, permisos y reportes.",
    descriptionEn:
      "CRMs, management and operations: custom systems that organize a business's daily work, with roles, permissions and reporting.",
  },
  {
    id: "saas-products",
    icon: "saas",
    title: "Productos SaaS",
    titleEn: "SaaS products",
    description:
      "Aplicaciones web completas con experiencia de usuario cuidada: del modelo de datos a la última animación.",
    descriptionEn:
      "Complete web applications with a polished user experience: from the data model to the last animation.",
  },
  {
    id: "applied-ai",
    icon: "ai",
    title: "IA aplicada",
    titleEn: "Applied AI",
    description:
      "Herramientas que usan LLMs para resolver problemas concretos, como auditorías automáticas de calidad y accesibilidad.",
    descriptionEn:
      "Tools that use LLMs to solve concrete problems, like automated quality and accessibility audits.",
  },
];

export const howIWork = [
  {
    id: "understand",
    step: "01",
    title: "Entender el problema",
    titleEn: "Understand the problem",
    description: "Antes de escribir código: qué necesitas, para quién y por qué.",
    descriptionEn: "Before writing code: what you need, for whom, and why.",
  },
  {
    id: "propose",
    step: "02",
    title: "Proponer con claridad",
    titleEn: "Propose with clarity",
    description: "Alcance, tiempos y decisiones técnicas explicadas sin jerga.",
    descriptionEn: "Scope, timeline and technical decisions explained without jargon.",
  },
  {
    id: "build",
    step: "03",
    title: "Construir con entregas visibles",
    titleEn: "Build with visible progress",
    description: "Avances funcionando que puedes probar, no promesas.",
    descriptionEn: "Working increments you can try, not promises.",
  },
  {
    id: "deliver",
    step: "04",
    title: "Entregar y acompañar",
    titleEn: "Deliver and support",
    description: "Documentación, despliegue y soporte para que el sistema viva sin mí.",
    descriptionEn: "Documentation, deployment and support so the system lives on without me.",
  },
];

// Optional per-project hover preview: set `previewVideo` to a muted looping clip
// at "/projects/<id>-preview.webm" (or .mp4) to enable the crossfade-on-hover
// effect in Projects.jsx. Omit the field to keep the current static-image behavior.
export const projects = [
  {
    id: "5",
    title: "LUMET CRM — Plataforma de Operaciones Empresariales",
    titleEn: "LUMET CRM — Business Operations Platform",
    type: "client",
    typeLabel: "Proyecto real · Cliente",
    typeLabelEn: "Client project",
    description:
      "Un negocio necesitaba dejar de operar en hojas de cálculo. Construí el CRM que hoy centraliza su operación diaria.",
    descriptionEn:
      "A business needed to stop running on spreadsheets. I built the CRM that now centralizes its daily operations.",
    longDescription:
      "Un negocio necesitaba dejar de operar en hojas de cálculo. Construí un CRM a medida: gestión de clientes, productos y operaciones con roles y permisos (JWT + RBAC), reportes en PDF/Excel y despliegue en AWS. Hoy centraliza la operación diaria del equipo.",
    longDescriptionEn:
      "A business needed to stop running its operations on spreadsheets. I built a custom CRM: client, product and operations management with roles and permissions (JWT + RBAC), PDF/Excel reporting and deployment on AWS. Today it centralizes the team's daily operations.",
    image: "/projects/lumet-crm.png",
    screenshots: ["/projects/lumet-crm.png"],
    tech: ["React", "JavaScript", "Django REST", "PostgreSQL", "JWT", "AWS", "Docker", "Linux", "RBAC", "REST APIs"],
    highlights: [
      "Roles y permisos (JWT + RBAC) para que cada perfil del equipo solo vea y haga lo que le corresponde",
      "Reportes en PDF y Excel generados bajo demanda, sin depender de exportar manualmente desde la base de datos",
      "Backend en Django REST Framework con PostgreSQL, containerizado con Docker y desplegado en AWS para escalar sin fricción",
      "Gestión centralizada de clientes, productos y operaciones en un solo sistema, reemplazando las hojas de cálculo",
      "Arquitectura pensada para que el equipo opere el día a día sin depender de soporte técnico constante",
    ],
    highlightsEn: [
      "Roles and permissions (JWT + RBAC) so each team profile only sees and does what it's meant to",
      "PDF and Excel reports generated on demand, instead of manual database exports",
      "Django REST Framework backend with PostgreSQL, containerized with Docker and deployed on AWS to scale without friction",
      "Centralized management of clients, products and operations in a single system, replacing spreadsheets",
      "Architecture designed so the team can run day-to-day operations without constant technical support",
    ],
    repo: "",
    demo: "",
  },
  {
    id: "4",
    title: "QA Intelligence Platform — Auditor Web con IA",
    titleEn: "QA Intelligence Platform — AI-Powered Web QA Auditor",
    type: "personal",
    typeLabel: "Producto propio",
    typeLabelEn: "Personal product",
    description:
      "Auditar accesibilidad y calidad de un sitio a mano es lento y subjetivo. Construí una plataforma que lo hace en minutos con IA.",
    descriptionEn:
      "Manually auditing a site's accessibility and quality is slow and subjective. I built a platform that does it in minutes with AI.",
    longDescription:
      "Producto propio construido para explorar cómo la IA puede acelerar el trabajo de QA. Auditar accesibilidad, errores de consola y rendimiento de un sitio a mano toma horas y depende del criterio de quien lo revisa. Construí una plataforma que automatiza ese proceso: usa Playwright para capturar el sitio y monitorear errores, axe-core para accesibilidad WCAG y un LLM (vía Groq API) para redactar la revisión técnica en lenguaje natural. Hoy genera un reporte completo de cualquier URL pública en minutos.",
    longDescriptionEn:
      "Personal product built to explore how AI can speed up QA work. Manually auditing a site's accessibility, console errors and performance takes hours and depends on the reviewer's judgment. I built a platform that automates that process: it uses Playwright to capture the site and monitor errors, axe-core for WCAG accessibility analysis, and an LLM (via Groq API) to write the technical review in natural language. Today it generates a full report for any public URL in minutes.",
    image: "/projects/qa-intelligence.png",
    screenshots: ["/projects/qa-intelligence.png"],
    tech: ["React", "TypeScript", "FastAPI", "Python", "Playwright", "Docker", "Groq API", "axe-core", "Tailwind CSS"],
    highlights: [
      "Playwright para capturar el sitio completo y monitorear errores de consola en tiempo real",
      "axe-core para el análisis de accesibilidad WCAG, sin depender de una revisión manual",
      "LLM vía Groq API para traducir los hallazgos técnicos en una revisión legible, no solo una lista de errores",
      "Backend en FastAPI dockerizado para que la auditoría corra igual en local y en producción",
      "Frontend en React con resultados en tiempo real, pensado para que el reporte se entienda de un vistazo",
    ],
    highlightsEn: [
      "Playwright captures the full site and monitors console errors in real time",
      "axe-core handles WCAG accessibility analysis without a manual review pass",
      "An LLM via Groq API turns technical findings into a readable review, not just an error list",
      "Dockerized FastAPI backend so the audit runs the same locally and in production",
      "React frontend with real-time results, designed so the report reads at a glance",
    ],
    repo: "https://github.com/gabrielacastroh/qa-intelligence-platform",
    demo: "https://qa-intelligence-vercel.vercel.app/run-test",
  },
  {
    id: "1",
    title: "SYNC – Tablero de colaboración en tiempo real",
    titleEn: "SYNC – Real-Time Collaboration Board",
    type: "personal",
    typeLabel: "Producto propio",
    typeLabelEn: "Personal product",
    description:
      "Herramientas como Linear son rápidas de usar pero difíciles de replicar bien. Construí mi propio tablero colaborativo para entender por qué.",
    descriptionEn:
      "Tools like Linear feel fast but are hard to replicate well. I built my own collaborative board to understand why.",
    longDescription:
      "Producto propio construido para dominar arquitectura frontend a nivel de producto, no de tutorial. SYNC simula un tablero colaborativo moderno inspirado en Linear y Notion: tableros, columnas y tarjetas con drag-and-drop, persistencia local y simulación de colaboración en tiempo real. Hoy funciona como una demo completa de command palette, atajos de teclado y estado tipado a escala.",
    longDescriptionEn:
      "Personal product built to master frontend architecture at product level, not tutorial level. SYNC simulates a modern collaborative board inspired by Linear and Notion: boards, columns and cards with drag-and-drop, local persistence and simulated real-time collaboration. Today it works as a full demo of a command palette, keyboard shortcuts and typed state at scale.",
    image: "/projects/sync.png",
    screenshots: ["/projects/sync.png"],
    tech: ["React", "TypeScript", "Zustand", "Tailwind", "Framer Motion", "dnd-kit"],
    highlights: [
      "TypeScript estricto y Zustand para mantener el estado predecible a medida que crece la app",
      "Drag-and-drop entre columnas con soporte multi-tablero, sin sacrificar rendimiento",
      "Command palette con búsqueda global, pensado para no depender del mouse",
      "Persistencia en localStorage como decisión deliberada: cero backend, cien por ciento frontend",
      "Animaciones con Framer Motion ajustadas para que se sientan rápidas, no decorativas",
    ],
    highlightsEn: [
      "Strict TypeScript and Zustand to keep state predictable as the app grows",
      "Drag-and-drop across columns with multi-board support, without sacrificing performance",
      "Command palette with global search, designed to work without touching the mouse",
      "localStorage persistence as a deliberate choice: zero backend, one hundred percent frontend",
      "Framer Motion animations tuned to feel fast, not decorative",
    ],
    repo: "https://github.com/gabrielacastroh/SYNC.git",
    demo: "https://phenomenal-druid-7bdfc0.netlify.app/",
  },
  {
    id: "2",
    title: "ORBIT – Plataforma de Product Operations",
    titleEn: "ORBIT – Product Operations Platform",
    type: "personal",
    typeLabel: "Producto propio",
    typeLabelEn: "Personal product",
    description:
      "Los equipos de producto necesitan ver adopción, experimentos y actividad en un solo lugar. Construí esa plataforma.",
    descriptionEn:
      "Product teams need to see adoption, experiments and activity in one place. I built that platform.",
    longDescription:
      "Producto propio construido para explorar cómo se ve una plataforma de product operations real, no una maqueta. ORBIT centraliza métricas de producto, adopción de funcionalidades y actividad del equipo, y permite gestionar colaboradores y correr experimentos A/B desde una sola interfaz. Hoy funciona con dashboards analíticos, control de roles y un command palette propios de una herramienta interna real.",
    longDescriptionEn:
      "Personal product built to explore what a real product operations platform looks like, not a mockup. ORBIT centralizes product metrics, feature adoption and team activity, and lets you manage contributors and run A/B experiments from a single interface. Today it runs with analytical dashboards, role-based access and a command palette typical of a real internal tool.",
    image: "/projects/orbit.png",
    screenshots: ["/projects/orbit.png"],
    tech: ["React", "TypeScript", "Tailwind", "TanStack Query", "Zustand", "Recharts"],
    highlights: [
      "TanStack Query y Zustand para separar estado del servidor y estado de UI sin mezclar responsabilidades",
      "Dashboards con métricas de adopción y KPIs, pensados para responder '¿esto está funcionando?' rápido",
      "Gestión de experimentos A/B con análisis de resultados, no solo creación de experimentos",
      "Control de roles y permisos para reflejar cómo se organiza un equipo de producto real",
      "Activity feed centralizado como fuente única de verdad del historial del producto",
    ],
    highlightsEn: [
      "TanStack Query and Zustand to separate server state from UI state without mixing responsibilities",
      "Adoption and KPI dashboards designed to answer 'is this working?' quickly",
      "A/B experiment management with results analysis, not just experiment creation",
      "Role-based access control that mirrors how a real product team is organized",
      "Centralized activity feed as the single source of truth for product history",
    ],
    repo: "https://github.com/gabrielacastroh/ORBIT.git",
    demo: "https://gleeful-blini-93d8f5.netlify.app/",
  },
  {
    id: "3",
    title: "Momentum – Sistema de Seguimiento de Metas",
    titleEn: "Momentum – Goal Tracking System",
    type: "personal",
    typeLabel: "Producto propio",
    typeLabelEn: "Personal product",
    description:
      "Llevar el progreso de metas en notas sueltas no escala. Construí un sistema full-stack para medirlo de verdad.",
    descriptionEn:
      "Tracking goal progress in scattered notes doesn't scale. I built a full-stack system to actually measure it.",
    longDescription:
      "Producto propio construido para practicar un ciclo full-stack completo, de la base de datos a la interfaz. Momentum permite crear metas con subtareas, calcula automáticamente el porcentaje de progreso y visualiza la evolución con gráficos y rachas de actividad. El backend usa Django REST Framework con autenticación JWT y el sistema corre completo con Docker, listo para desplegarse sin configuración manual.",
    longDescriptionEn:
      "Personal product built to practice a complete full-stack cycle, from the database to the interface. Momentum lets you create goals with subtasks, automatically calculates progress percentage and visualizes evolution through charts and activity streaks. The backend uses Django REST Framework with JWT authentication, and the whole system runs on Docker, ready to deploy without manual setup.",
    image: "/projects/momentum.png",
    screenshots: ["/projects/momentum.png"],
    tech: ["React", "TypeScript", "Django REST", "PostgreSQL", "Tailwind", "Docker"],
    highlights: [
      "Cálculo automático de progreso a partir de subtareas, en vez de que el usuario lo actualice a mano",
      "Autenticación JWT con sesiones seguras, pensada desde el inicio y no añadida después",
      "Rachas de actividad y estadísticas mensuales para dar contexto al progreso, no solo un número",
      "Arquitectura dockerizada para que el proyecto se levante igual en cualquier máquina",
      "Gráficos de evolución temporal que muestran el historial completo, no solo el estado actual",
    ],
    highlightsEn: [
      "Automatic progress calculation from subtasks, instead of manual updates from the user",
      "JWT authentication with secure sessions, designed from the start rather than bolted on later",
      "Activity streaks and monthly stats to give progress context, not just a number",
      "Dockerized architecture so the project runs the same on any machine",
      "Time-based evolution charts showing full history, not just the current state",
    ],
    repo: "https://github.com/gabrielacastroh/Momentum.git",
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
  subtitle: "¿Tienes un producto o sistema en la cabeza? Cuéntamelo.",
  subtitleEn: "Got a product or system in mind? Tell me about it.",
  heading: "Hablemos sobre tu próxima idea.",
  headingEn: "Let's talk about your next idea.",
  availabilityNote: "Abierta a colaboraciones y proyectos remotos.",
  availabilityNoteEn: "Open to collaborations and remote projects.",
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
  footerTagline: "Construyo software que resuelve problemas reales.",
  footerTaglineEn: "I build software that solves real problems.",
  ctaHeading: "¿Listo para construir algo juntos?",
  ctaHeadingEn: "Ready to build something together?",
  ctaText: "Cuéntame tu idea y te respondo en 24–48 horas.",
  ctaTextEn: "Tell me your idea and I'll reply within 24–48 hours.",
  ctaButton: "Hablemos",
  ctaButtonEn: "Let's talk",

  closingStatement: "Construyamos algo juntos.",
  closingStatementEn: "Let's build something together.",

  orbitalClosing: "Construyamos algo juntos · Construyamos algo juntos · ",
  orbitalClosingEn: "Let's build together · Let's build together · ",

  // Echoes the "Cómo trabajo" step titles as a closing rhythm — distinct in
  // register (process verbs, not domain nouns) from the opening Marquee's
  // rowOne/rowTwo, and a deliberate narrative callback rather than new copy.
  closingMarqueeWords: ["Entender el problema", "Proponer con claridad", "Construir con entregas visibles", "Entregar y acompañar"],
  closingMarqueeWordsEn: ["Understand the problem", "Propose with clarity", "Build with visible progress", "Deliver and support"],
};

export const navLinks = [
  { id: "hero", label: "Inicio", labelEn: "Home", href: "#hero" },
  { id: "what-i-build", label: "Qué construyo", labelEn: "What I build", href: "#what-i-build" },
  { id: "projects", label: "Proyectos", labelEn: "Projects", href: "#projects" },
  { id: "how-i-work", label: "Cómo trabajo", labelEn: "How I work", href: "#how-i-work" },
  { id: "about", label: "Sobre mí", labelEn: "About me", href: "#about" },
  { id: "skills", label: "Skills", labelEn: "Skills", href: "#skills" },
  { id: "contact", label: "Contacto", labelEn: "Contact me", href: "#contact" },
];
