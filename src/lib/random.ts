import type { Icons } from "@/types";
import { gradients } from "@/lib/values";

import * as svgs from "lucide-react";

const iconNames = Object.keys(svgs.icons);

export function randomIconName(): Icons {
  return iconNames[Math.floor(Math.random() * iconNames.length)] as Icons;
}

function randomGradient(): string {
  return gradients[Math.floor(Math.random() * gradients.length)];
}

function randomHexColor(): string {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

function hexToRgb(hex: string): [number, number, number] {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function generateSimilarColor(baseColor: string, variationRange = 30): string {
  const [r, g, b] = hexToRgb(baseColor);
  const newR = Math.min(
    255,
    Math.max(
      0,
      r + Math.floor(Math.random() * variationRange * 2) - variationRange
    )
  );
  const newG = Math.min(
    255,
    Math.max(
      0,
      g + Math.floor(Math.random() * variationRange * 2) - variationRange
    )
  );
  const newB = Math.min(
    255,
    Math.max(
      0,
      b + Math.floor(Math.random() * variationRange * 2) - variationRange
    )
  );
  return rgbToHex(newR, newG, newB);
}

function extractColorFromGradient(gradient: string): string {
  const colors = gradient.match(/#[a-fA-F0-9]{6}/g);
  return colors
    ? colors[Math.floor(Math.random() * colors.length)]
    : randomHexColor();
}

export function randomSimilarColorScheme(): {
  background: string;
  icon: string;
} {
  const isColor = Math.random() > 0.5;

  if (isColor) {
    const background = randomHexColor();
    const icon = generateSimilarColor(background);
    return { background, icon };
  }

  const gradient = randomGradient();
  const baseColor = extractColorFromGradient(gradient);
  const icon = generateSimilarColor(baseColor);
  return { background: gradient, icon };
}
