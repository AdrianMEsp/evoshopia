import type { IconName } from "@/components/icons";

export interface DashboardNavItem {
  label: string;
  icon: IconName;
}

export const dashboardNav: DashboardNavItem[] = [
  { label: "Mi inicio", icon: "grid" },
  { label: "Cursos", icon: "hexagon" },
  { label: "Lecciones", icon: "play" },
];
