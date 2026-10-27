import type { IconName } from "@/components/icons";

export interface DashboardNavItem {
  label: string;
  icon: IconName;
  count?: number;
}

export interface StatItem {
  label: string;
  value: string;
  hint: string;
  icon: IconName;
}

export interface CourseItem {
  title: string;
  text: string;
  category: string;
  lessons: number;
  progress: number;
  duration: string;
  icon: IconName;
}

export type VideoTheme = "violet" | "orange" | "navy" | "teal";

export interface VideoItem {
  title: string;
  text: string;
  duration: string;
  category: string;
  views: string;
  author: string;
  theme: VideoTheme;
}

export const dashboardUser = {
  name: "Camila Rojas",
  role: "Participante · Tu Factor Invisible",
  initials: "CR",
  plan: "Programa 2026",
};

export const dashboardGreeting = {
  eyebrow: "Mi espacio de formación",
  title: "Hola, Camila.",
  text: "Continúa donde quedaste: tienes 2 cursos activos y 3 videos nuevos de tu programa esta semana.",
  primaryCta: { label: "Continuar curso", href: "#cursos" },
  secondaryCta: { label: "Ver videos", href: "#videos" },
};

export const dashboardNav: DashboardNavItem[] = [
  { label: "Mi inicio", icon: "grid" },
  { label: "Cursos", icon: "hexagon", count: 3 },
  { label: "Videos", icon: "play", count: 6 },
  { label: "Progreso", icon: "trending-up" },
  { label: "Certificados", icon: "flag", count: 2 },
];

export const dashboardCourses: CourseItem[] = [
  {
    title: "Tu Factor Invisible",
    text: "Bienestar, resiliencia, autoestima y habilidades socioemocionales para comunidades educativas y equipos.",
    category: "Bienestar",
    lessons: 8,
    progress: 62,
    duration: "4 h 20 min",
    icon: "heart",
  },
  {
    title: "IA Responsable",
    text: "Usa inteligencia artificial con criterio ético, productividad y enfoque humano dentro de tu organización.",
    category: "IA",
    lessons: 6,
    progress: 35,
    duration: "3 h 10 min",
    icon: "ai",
  },
  {
    title: "Negociación Estratégica",
    text: "Escucha activa, método SPIN, comunicación asertiva y acuerdos sostenibles en contextos complejos.",
    category: "Liderazgo",
    lessons: 7,
    progress: 0,
    duration: "3 h 45 min",
    icon: "exchange",
  },
];

export const dashboardVideos: VideoItem[] = [
  {
    title: "Introducción a la IA generativa",
    text: "Qué son los modelos generativos y cómo aplicarlos de forma útil en el trabajo diario.",
    duration: "12:40",
    category: "IA",
    views: "1.240 reproducciones",
    author: "Oscar Toro",
    theme: "violet",
  },
  {
    title: "Autocuidado en equipos distribuidos",
    text: "Rutinas simples de bienestar para equipos híbridos y remotos.",
    duration: "09:15",
    category: "Bienestar",
    views: "980 reproducciones",
    author: "Paula Fuentes",
    theme: "teal",
  },
  {
    title: "Liderar con inteligencia emocional",
    text: "Cómo regular emociones al liderar decisiones difíciles.",
    duration: "14:02",
    category: "Liderazgo",
    views: "1.512 reproducciones",
    author: "Oscar Toro",
    theme: "orange",
  },
  {
    title: "Ética de la IA en educación",
    text: "Criterios para integrar IA en instituciones educativas sin perder el enfoque humano.",
    duration: "18:27",
    category: "IA",
    views: "2.034 reproducciones",
    author: "Camila Rojas",
    theme: "navy",
  },
  {
    title: "Resiliencia ante el cambio",
    text: "Herramientas prácticas para atravesar procesos de transformación digital.",
    duration: "11:48",
    category: "Bienestar",
    views: "860 reproducciones",
    author: "Paula Fuentes",
    theme: "violet",
  },
  {
    title: "Cultura de innovación sostenible",
    text: "Cómo sostener la innovación sin agotar a los equipos.",
    duration: "16:33",
    category: "Liderazgo",
    views: "1.105 reproducciones",
    author: "Oscar Toro",
    theme: "teal",
  },
];

export const dashboardNotice =
  "Vista preliminar con datos de ejemplo. Los contenidos reales se conectarán más adelante.";
