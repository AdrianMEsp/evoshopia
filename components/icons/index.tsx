import type { ReactElement, ReactNode, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

function Glyph({
  children,
  ...props
}: IconProps & { children: ReactNode }): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function DiamondIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <path d="M12 3 21 12l-9 9-9-9 9-9Z" />
    </Glyph>
  );
}

export function PulseIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <path d="M3 12h3.5L9 6l4 12 2.5-6H21" />
    </Glyph>
  );
}

export function TrendingUpIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <path d="M4 17 10 11l4 4 6-6" />
      <path d="M14 9h6v6" />
    </Glyph>
  );
}

export function TargetIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.2" />
    </Glyph>
  );
}

export function AiIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <rect x="7" y="7" width="10" height="10" rx="2.5" />
      <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
    </Glyph>
  );
}

export function HeartIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <path d="M20.8 5.1a5.2 5.2 0 0 0-7.4 0L12 6.5l-1.4-1.4a5.2 5.2 0 1 0-7.4 7.4l.7.7L12 21.2l8.1-8 .7-.7a5.2 5.2 0 0 0 0-7.4Z" />
    </Glyph>
  );
}

export function GridIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3.5" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" />
    </Glyph>
  );
}

export function RefreshIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8" />
      <path d="M20 4v4h-4" />
      <path d="M20 12a8 8 0 0 1-13.7 5.6L4 16" />
      <path d="M4 20v-4h4" />
    </Glyph>
  );
}

export function FlagIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <path d="M5.5 21V4" />
      <path d="M5.5 5h11l-2.2 3.5 2.2 3.5h-11" />
    </Glyph>
  );
}

export function SparklesIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <path d="m11 3 1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9L11 3Z" />
      <path d="m18.5 15.5.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z" />
    </Glyph>
  );
}

export function ExchangeIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <path d="M4 8.5h13l-3.2-3.2" />
      <path d="M20 15.5H7l3.2 3.2" />
    </Glyph>
  );
}

export function HexagonIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <path d="M12 3.2 19.3 7.4v9.2L12 20.8l-7.3-4.2V7.4L12 3.2Z" />
      <path d="m12 8.8 3.2 3.2L12 15.2l-3.2-3.2L12 8.8Z" />
    </Glyph>
  );
}

export function GearIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.8v3M12 18.2v3M21.2 12h-3M5.8 12h-3M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1M18.5 18.5l-2.1-2.1M7.6 7.6 5.5 5.5" />
    </Glyph>
  );
}

export function BrainIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <path d="M6 4v6a6 6 0 0 0 12 0V4" />
      <path d="M12 4v17" />
      <path d="M8.5 21h7" />
    </Glyph>
  );
}

export function LightbulbIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <path d="M9.5 18.5h5" />
      <path d="M10.5 21.2h3" />
      <path d="M12 3a6 6 0 0 0-3.4 10.9c.6.4 1 1.1 1.1 1.9h4.6c.1-.8.5-1.5 1.1-1.9A6 6 0 0 0 12 3Z" />
    </Glyph>
  );
}

export function CheckIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <path d="m4.5 12.5 5 5 10-10.5" />
    </Glyph>
  );
}

export function ArrowRightIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </Glyph>
  );
}

export function ArrowDownIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <path d="M12 4.5v15" />
      <path d="m5.5 13 6.5 6.5L18.5 13" />
    </Glyph>
  );
}

export function MenuIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Glyph>
  );
}

export function CloseIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Glyph>
  );
}

export function PlayIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <path d="M9 5.8 18.2 12 9 18.2V5.8Z" />
    </Glyph>
  );
}

export function ClockIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.2V12l3.2 2" />
    </Glyph>
  );
}

export function MailIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.8 7.2 8.2 5.7 8.2-5.7" />
    </Glyph>
  );
}

export function MapPinIcon(props: IconProps): ReactElement {
  return (
    <Glyph {...props}>
      <path d="M12 21.2s7-5.8 7-11.2a7 7 0 1 0-14 0c0 5.4 7 11.2 7 11.2Z" />
      <circle cx="12" cy="9.8" r="2.6" />
    </Glyph>
  );
}

export const iconMap = {
  diamond: DiamondIcon,
  pulse: PulseIcon,
  "trending-up": TrendingUpIcon,
  target: TargetIcon,
  ai: AiIcon,
  heart: HeartIcon,
  grid: GridIcon,
  refresh: RefreshIcon,
  flag: FlagIcon,
  sparkles: SparklesIcon,
  exchange: ExchangeIcon,
  hexagon: HexagonIcon,
  gear: GearIcon,
  brain: BrainIcon,
  lightbulb: LightbulbIcon,
  check: CheckIcon,
  "arrow-right": ArrowRightIcon,
  "arrow-down": ArrowDownIcon,
  menu: MenuIcon,
  close: CloseIcon,
  play: PlayIcon,
  clock: ClockIcon,
  mail: MailIcon,
  "map-pin": MapPinIcon,
} satisfies Record<string, (props: IconProps) => ReactElement>;

export type IconName = keyof typeof iconMap;
