import type * as svgs from "lucide-react";

export type Icons = keyof typeof svgs.icons;

export type SvgSettings = {
  fillColor: string;
  fillOpacity: number;
  size: number;
  radius: number;
  bgColor: string;
  svgColor: string;
  position: {
    x: number;
    y: number;
  };
  rotation: number;
  strokeWidth: number;
  opacity: number;
  scale: number;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  skewX: number;
  skewY: number;
  iconBlur: number;
  backgroundBlur: number;
};
