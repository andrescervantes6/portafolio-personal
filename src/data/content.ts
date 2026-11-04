export interface NavItem {
  label: string;
  href: string;
}

export interface QuickFact {
  id: string;
  type: "countup" | "text";
  value?: number;
  suffix?: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface Passion {
  id: string;
  title: string;
  description: string;
  icon: "code" | "bot" | "trending-up" | "sparkles";
  tag: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  title: string;
  badge: string;
  description: string;
  urlPath: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  images: ProjectImage[];
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  isFeatured?: boolean;
}

export interface TimelineMilestone {
  id: string;
  phase: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "upcoming";
  badge: string;
}

export interface Principle {
  id: string;
  title: string;
  description: string;
  icon: "compass" | "shield-check" | "repeat" | "book-open";
}

export interface ContactLink {
  id: string;
  name: string;
  href: string;
  icon: "mail" | "github" | "instagram" | "whatsapp" | "linkedin";
  label: string;
  isExternal: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const portfolioContent = {
  meta: {
    title: "Andrés Mauricio Cervantes | Portafolio Personal",
    description: "Construyo tecnología que resuelve problemas reales. Software, IA y Trading.",
    author: "Andrés Mauricio Cervantes",
    url: "https://andrescervantes.dev",
    ogImage: "/og-image.png",
    locale: "es",
  },

  navigation: [
    { label: "Inicio", href: "#inicio" },
    { label: "Lo que me mueve", href: "#lo-que-me-mueve" },
    { label: "Cultivus", href: "#cultivus" },
    { label: "Proceso", href: "#proceso" },
    { label: "Contacto", href: "#contacto" },
  ] as NavItem[],

  hero: {
    photo: {
      src: "/foto.png",
      alt: "Foto de perfil de Andrés Mauricio Cervantes",
      width: 1086,
      height: 1448,
    },
    name: "Andrés Mauricio Cervantes",
    animatedPhrase: "Construyo tecnología que resuelve problemas reales",
    rotatingWords: [
      "Software de alto impacto",
      "Agentes de Inteligencia Artificial",
      "Estrategias de Trading de Futuros",
    ],
    chips: ["Software", "IA", "Trading"],
    ctaPrimary: {
      label: "Mis proyectos",
      href: "#cultivus",
    },
    ctaSecondary: {
      label: "Hablemos",
      href: "#contacto",
    },
    scrollIndicatorText: "Explora mi trabajo",
  },

  quickFacts: [
    {
      id: "age",
      type: "countup",
      value: 20,
      suffix: " años",
      title: "20 años",
      subtitle: "Enfoque, energía y disciplina diaria",
      icon: "calendar",
    },
    {
      id: "education",
      type: "text",
      title: "Desarrollo de Software",
      subtitle: "Tecnológico Comfenalco",
      icon: "graduation-cap",
    },
    {
      id: "location",
      type: "text",
      title: "Cartagena, Colombia",
      subtitle: "Creando impacto global desde el Caribe",
      icon: "map-pin",
    },
  ] as QuickFact[],

  passionsSection: {
    id: "lo-que-me-mueve",
    badge: "Propósito",
    title: "Lo que me mueve",
    subtitle: "Los cuatro pilares que orientan mi curiosidad y esfuerzo cotidiano.",
    items: [
      {
        id: "software",
        title: "Desarrollo de software",
        description: "Crear soluciones digitales que resuelven problemas reales.",
        icon: "code",
        tag: "Arquitectura & Código",
      },
      {
        id: "ai",
        title: "IA y automatización",
        description: "Agentes de IA para reducir tareas repetitivas.",
        icon: "bot",
        tag: "Automatización Inteligente",
      },
      {
        id: "trading",
        title: "Trading de futuros",
        description: "Aprendizaje constante y disciplina.",
        icon: "trending-up",
        tag: "Gestión de Riesgo & Datos",
      },
      {
        id: "brand",
        title: "Marca personal",
        description: "Documentar mi proceso de forma auténtica.",
        icon: "sparkles",
        tag: "Transparencia & Construcción",
      },
    ] as Passion[],
  },

  featuredProjectSection: {
    id: "cultivus",
    badge: "Proyecto Destacado",
    title: "Cultivus",
    subtitle: "Conectando el campo con la ciudad de manera directa, transparente y sin intermediarios.",
    projects: [
      {
        id: "cultivus",
        title: "Cultivus",
        tagline: "Ecosistema integral para el agro colombiano",
        description:
          "Plataforma web que conecta campesinos y pequeños productores directamente con consumidores, incluyendo el transporte, sin intermediarios.",
        images: [
          {
            src: "/cultivus/cultivus-1.png",
            alt: "Cultivus - Vista del Mercado Campesino y compras directas",
            title: "Mercado Campesino",
            badge: "Consumidor",
            description: "Catálogo de cosechas frescas directas de las fincas con envíos garantizados.",
            urlPath: "cultivus-co.onrender.com/mercado",
          },
          {
            src: "/cultivus/cultivus-2.png",
            alt: "Cultivus - Panel de Vendedor para Campesinos y Fincas",
            title: "Panel de Productor",
            badge: "Campesino",
            description: "Gestión de cultivos, inventario, pedidos por alistar y billetera digital.",
            urlPath: "cultivus-co.onrender.com/vendedor/finca",
          },
          {
            src: "/cultivus/cultivus-3.png",
            alt: "Cultivus - Centro Logístico y Gestión de Rutas de Transporte",
            title: "Centro Logístico",
            badge: "Transporte",
            description: "Consolidación inteligente de fletes y recolecciones programadas en zonas rurales.",
            urlPath: "cultivus-co.onrender.com/logistica/rutas",
          },
        ],
        technologies: ["Java", "Spring Boot", "MySQL", "MongoDB"],
        liveUrl: "https://cultivus-co.onrender.com/",
        githubUrl: "https://github.com/andrescervantes6",
        isFeatured: true,
      },
    ] as Project[],
  },

  tradingJourneySection: {
    id: "proceso",
    badge: "Camino & Visión",
    title: "Trading Journey",
    motto: "Documento el proceso, no solo los resultados.",
    milestones: [
      {
        id: "formation",
        phase: "Fase 01",
        title: "Formación",
        description: "Dominio de la acción del precio, gestión del riesgo y psicología de trading.",
        status: "completed",
        badge: "Completado",
      },
      {
        id: "funding-eval",
        phase: "Fase 02",
        title: "Primera prueba de fondeo",
        description: "Ejecución de plan sistemático con estricta gestión de pérdidas y consistencia.",
        status: "in-progress",
        badge: "En progreso",
      },
      {
        id: "withdrawal",
        phase: "Fase 03",
        title: "Primer retiro",
        description: "Consolidación de cuenta fondeada y primer payout sostenible en el tiempo.",
        status: "upcoming",
        badge: "Meta",
      },
    ] as TimelineMilestone[],
  },

  principlesSection: {
    badge: "Filosofía",
    title: "Principios",
    subtitle: "Valores no negociables sobre los que construyo cada proyecto y hábito.",
    items: [
      {
        id: "curiosity",
        title: "Curiosidad",
        description: "Preguntarse siempre el porqué profundo de las cosas e innovar sin miedo a experimentar.",
        icon: "compass",
      },
      {
        id: "discipline",
        title: "Disciplina",
        description: "Hacer lo que se debe hacer con estándares de excelencia, incluso cuando la motivación fluctúa.",
        icon: "shield-check",
      },
      {
        id: "consistency",
        title: "Constancia",
        description: "El interés compuesto aplicado al trabajo diario: pequeños avances que generan grandes saltos.",
        icon: "repeat",
      },
      {
        id: "continuous-learning",
        title: "Aprendizaje continuo",
        description: "Mentalidad de principiante permanente frente a nuevas tecnologías y mercados dinámicos.",
        icon: "book-open",
      },
    ] as Principle[],
  },

  contactSection: {
    id: "contacto",
    badge: "Conectemos",
    title: "Hablemos",
    description: "¿Tienes una idea, un proyecto o quieres conversar sobre software, IA o mercados? Siempre abierto a colaborar.",
    links: [
      {
        id: "email",
        name: "Correo Electrónico",
        href: "mailto:andresmauriciocervantes8@gmail.com",
        icon: "mail",
        label: "andresmauriciocervantes8@gmail.com",
        isExternal: false,
      },
      {
        id: "github",
        name: "GitHub",
        href: "https://github.com/andrescervantes6",
        icon: "github",
        label: "@andrescervantes6",
        isExternal: true,
      },
      {
        id: "instagram",
        name: "Instagram",
        href: "https://www.instagram.com/andrescervantes_",
        icon: "instagram",
        label: "@andrescervantes_",
        isExternal: true,
      },
    ] as ContactLink[],
  },

  footer: {
    name: "Andrés Mauricio Cervantes",
    year: 2026,
    copyright: "Todos los derechos reservados.",
    tagline: "Diseñado con atención al detalle y enfoque Apple minimalista.",
  },

  servicesSection: {
    id: "servicios",
    enabled: false,
    badge: "Servicios",
    title: "Soluciones que ofrezco",
    subtitle: "Desarrollo a medida, automatización e infraestructura tecnológica moderna.",
    items: [
      {
        id: "custom-software",
        title: "Desarrollo de Software a Medida",
        description: "Aplicaciones web modernas, APIs escalables y sistemas integrados de alta velocidad.",
        deliverables: ["Next.js & React", "APIs RESTful", "Bases de datos relacionales & NoSQL"],
      },
      {
        id: "ai-automation",
        title: "Agentes de IA & Automatización",
        description: "Automatización de flujos operativos complejos mediante modelos de lenguaje y bots.",
        deliverables: ["Agentes autónomos", "Pipelines de datos", "Integraciones con CRM & APIs"],
      },
    ] as ServiceItem[],
  },
};
