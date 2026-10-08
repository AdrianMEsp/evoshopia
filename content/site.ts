import type { IconName } from "@/components/icons";

export interface NavLink {
  label: string;
  href: string;
}

export interface Highlight {
  icon: IconName;
  title: string;
  text: string;
}

export interface ServiceItem {
  icon: IconName;
  title: string;
  text: string;
}

export interface EcosystemItem {
  name: string;
  text: string;
  logo: string;
  alt: string;
}

export interface ProgramItem {
  icon: IconName;
  title: string;
  text: string;
}

export interface ReasonItem {
  icon: IconName;
  title: string;
  text: string;
}

export interface PostItem {
  title: string;
  text: string;
}

export interface SolutionItem {
  name: string;
  text: string;
  logo: string;
  alt: string;
}

export const site = {
  name: "Evosistencia",
  title: "Evosistencia | Tecnología con Humanidad®",
  description:
    "Evosistencia transforma organizaciones fortaleciendo personas mediante inteligencia artificial, bienestar organizacional e innovación.",
  ogDescription:
    "Consultoría internacional en IA, bienestar, formación y transformación digital.",
  url: "https://www.evosistencia.cl",
  themeColor: "#5b22e8",
  email: "contacto@evosistencia.cl",
  location: "Santiago, Chile",
  keywords: [
    "consultoría",
    "inteligencia artificial",
    "bienestar organizacional",
    "transformación digital",
    "capacitaciones",
    "innovación",
    "Chile",
  ],
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  description:
    "Consultora de tecnología, bienestar organizacional, formación e inteligencia artificial aplicada con enfoque humano.",
  founder: {
    "@type": "Person",
    name: "Oscar Toro",
    jobTitle:
      "Licenciado en Psicología, Ingeniero Informático y fundador del ecosistema Evosistencia",
  },
};

export const navLinks: NavLink[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Ecosistema", href: "#ecosistema" },
  { label: "Servicios", href: "#servicios" },
  { label: "Talleres", href: "#programas" },
  { label: "Empresas", href: "#nosotros" },
  { label: "Blog", href: "#blog" },
  { label: "Contacto", href: "#contacto" },
];

export const hero = {
  eyebrow: "Tecnología con Humanidad®",
  title: "Transformamos organizaciones fortaleciendo personas.",
  description:
    "Integramos Inteligencia Artificial, bienestar organizacional e innovación para ayudar a empresas e instituciones educativas a construir culturas más humanas, adaptativas y preparadas para el futuro.",
  primaryCta: { label: "Solicitar consultoría", href: "#contacto" },
  secondaryCta: { label: "Conocer servicios", href: "#servicios" },
  highlights: [
    {
      icon: "diamond",
      title: "Enfoque humano",
      text: "Ética, bienestar y propósito.",
    },
    {
      icon: "pulse",
      title: "IA aplicada",
      text: "Soluciones útiles, no ruido.",
    },
    {
      icon: "trending-up",
      title: "Impacto medible",
      text: "Programas accionables.",
    },
  ] satisfies Highlight[],
};

export const founder = {
  name: "Oscar Toro",
  role: "Fundador del ecosistema Evosistencia",
  image: "/images/people/oscar-toro.jpeg",
  alt: "Oscar Toro, fundador de Evosistencia",
  credentials: [
    "Licenciado en Psicología",
    "Ingeniero Informático",
    "Speaker internacional",
    "IA aplicada al bienestar",
  ],
};

export const ecosystem = {
  eyebrow: "Nuestro ecosistema",
  title: "Cuatro iniciativas, un mismo propósito.",
  description:
    "Una arquitectura de impacto donde consultoría, fundación, tecnología educativa e innovación trabajan de forma integrada.",
  items: [
    {
      name: "Evosistencia",
      text: "Consultoría estratégica que integra tecnología, bienestar y formación para transformar culturas organizacionales.",
      logo: "/images/brand/evosistencia.png",
      alt: "Evosistencia",
    },
    {
      name: "Fundación Vive Tu Mente",
      text: "Impacto social, educación emocional, inclusión y prevención en comunidades educativas.",
      logo: "/images/logos/vive-tu-mente.jpg",
      alt: "Fundación Vive Tu Mente",
    },
    {
      name: "EduAssistant",
      text: "Asistente IA para acompañamiento estudiantil, bienestar y permanencia en instituciones educativas.",
      logo: "/images/logos/eduassistant.jpg",
      alt: "EduAssistant",
    },
    {
      name: "LabAssistant",
      text: "Laboratorio de innovación para soluciones de IA, automatización y medición de procesos humanos.",
      logo: "/images/logos/labassistant.jpg",
      alt: "LabAssistant",
    },
  ] satisfies EcosystemItem[],
};

export const services = {
  eyebrow: "Servicios",
  title: "Soluciones que generan transformación.",
  items: [
    {
      icon: "target",
      title: "Consultoría",
      text: "Diseño estratégico de programas, diagnósticos y hojas de ruta para bienestar e innovación.",
    },
    {
      icon: "ai",
      title: "Inteligencia Artificial",
      text: "Aplicación responsable de IA para acompañamiento, automatización y análisis institucional.",
    },
    {
      icon: "heart",
      title: "Bienestar organizacional",
      text: "Programas de salud mental preventiva, resiliencia, clima y autocuidado.",
    },
    {
      icon: "grid",
      title: "Capacitaciones",
      text: "Talleres, charlas y experiencias formativas para equipos, docentes y líderes.",
    },
    {
      icon: "refresh",
      title: "Transformación digital",
      text: "Adopción tecnológica con foco humano, gestión del cambio y cultura de innovación.",
    },
    {
      icon: "flag",
      title: "Liderazgo consciente",
      text: "Desarrollo de habilidades socioemocionales para liderar con claridad y sostenibilidad.",
    },
  ] satisfies ServiceItem[],
};

export const aiSolutions = {
  eyebrow: "IA para organizaciones",
  title: "Soluciones especializadas para educación, bienestar e innovación.",
  description:
    "EduAssistant y LabAssistant son líneas tecnológicas del ecosistema que permiten convertir el acompañamiento humano en sistemas escalables, medibles y responsables.",
  items: [
    {
      name: "EduAssistant",
      text: "IA para bienestar, permanencia y acompañamiento estudiantil.",
      logo: "/images/logos/eduassistant.jpg",
      alt: "EduAssistant",
    },
    {
      name: "LabAssistant",
      text: "IA, automatización y experimentación aplicada a procesos organizacionales.",
      logo: "/images/logos/labassistant.jpg",
      alt: "LabAssistant",
    },
  ] satisfies SolutionItem[],
};

export const programs = {
  eyebrow: "Programas destacados",
  title: "Experiencias formativas con impacto práctico.",
  items: [
    {
      icon: "sparkles",
      title: "Tu Factor Invisible",
      text: "Bienestar, resiliencia, autoestima, propósito y habilidades socioemocionales para comunidades educativas y equipos.",
    },
    {
      icon: "exchange",
      title: "Negociación Estratégica",
      text: "Entrenamiento en escucha activa, método SPIN, comunicación y acuerdos sostenibles.",
    },
    {
      icon: "hexagon",
      title: "IA Responsable",
      text: "Formación para usar IA con criterio ético, productividad y enfoque humano.",
    },
  ] satisfies ProgramItem[],
};

export const reasons = {
  eyebrow: "Por qué Evosistencia",
  title: "Una consultora construida desde disciplinas complementarias.",
  items: [
    {
      icon: "gear",
      title: "Ingeniería",
      text: "Capacidad técnica para diseñar soluciones reales.",
    },
    {
      icon: "brain",
      title: "Psicología",
      text: "Comprensión del comportamiento humano y bienestar.",
    },
    {
      icon: "ai",
      title: "IA",
      text: "Automatización y analítica aplicada con responsabilidad.",
    },
    {
      icon: "heart",
      title: "Bienestar",
      text: "Prevención, autocuidado y salud emocional.",
    },
    {
      icon: "lightbulb",
      title: "Innovación",
      text: "Diseño de experiencias con visión de futuro.",
    },
  ] satisfies ReasonItem[],
};

export const about = {
  eyebrow: "Nosotros",
  title: "Tecnología con propósito humano.",
  description:
    "Evosistencia nace para cerrar la brecha entre el avance tecnológico y la estabilidad emocional de las personas. Combinamos experiencia en tecnología, psicología, educación y emprendimiento para crear programas y soluciones que fortalecen organizaciones desde dentro.",
  bullets: [
    "Diseño de programas para empresas e instituciones educativas.",
    "IA aplicada a bienestar, formación y transformación digital.",
    "Charlas y talleres con enfoque práctico, ético y medible.",
  ],
  cta: { label: "Conocer trayectoria", href: "#casos" },
};

export const successCases = {
  eyebrow: "Casos de éxito",
  title: "Espacio preparado para evidencia, pilotos y resultados.",
  description:
    "Esta sección queda diseñada para incorporar casos verificables, indicadores de impacto, testimonios autorizados y aprendizajes de implementación.",
  highlight: "Próximamente:",
  text: "pilotos, alianzas formales y resultados documentados del ecosistema Evosistencia.",
};

export const blog = {
  eyebrow: "Blog",
  title: "Ideas para organizaciones más humanas e inteligentes.",
  posts: [
    {
      title: "IA responsable en educación",
      text: "Cómo integrar tecnología sin perder criterio humano.",
    },
    {
      title: "Bienestar organizacional medible",
      text: "Del discurso a programas con seguimiento real.",
    },
    {
      title: "Transformación digital consciente",
      text: "Innovar sin quemar a los equipos en el intento.",
    },
  ] satisfies PostItem[],
};

export const cta = {
  title: "Agenda una reunión estratégica.",
  text: "Conversemos cómo Evosistencia puede ayudar a tu organización a integrar tecnología, bienestar e innovación.",
  button: {
    label: "Agendar reunión",
    href: "mailto:contacto@evosistencia.cl?subject=Agendar%20reuni%C3%B3n%20estrat%C3%A9gica",
  },
};

export const footer = {
  description:
    "Consultoría en tecnología, bienestar organizacional, formación e inteligencia artificial aplicada con enfoque humano.",
  columns: [
    {
      title: "Mapa",
      links: [
        { label: "Servicios", href: "#servicios" },
        { label: "Ecosistema", href: "#ecosistema" },
        { label: "Empresas", href: "#nosotros" },
      ],
    },
    {
      title: "Programas",
      links: [
        { label: "Tu Factor Invisible", href: "#programas" },
        { label: "Negociación Estratégica", href: "#programas" },
        { label: "IA Responsable", href: "#programas" },
      ],
    },
    {
      title: "Contacto",
      links: [
        { label: site.location, href: "#contacto" },
        { label: site.email, href: `mailto:${site.email}` },
        { label: "Formulario de contacto", href: "#contacto" },
      ],
    },
  ],
  legal: "Privacidad · Términos · Accesibilidad",
  copyright: "© 2026 Evosistencia. Todos los derechos reservados.",
};
