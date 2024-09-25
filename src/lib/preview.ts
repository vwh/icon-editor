import { defaultSvgSettings } from "@/store/useStore";

const base = {
  ...defaultSvgSettings,
  size: 30,
  radius: 10
};

const variation0 = {
  ...base,
  fillColor: "#000000",
  fillOpacity: 0,
  bgColor: "#FFFFFF",
  svgColor: "#000000",
  shadowColor: "#000000"
};

const variation1 = {
  ...base,
  bgColor: "#FFEDA0",
  fillOpacity: 1,
  fillColor: "#FFF",
  strokeWidth: 2
};

const variation2 = {
  ...base,
  bgColor: "#A0D2FF",
  fillColor: "#F0F0F0",
  fillOpacity: 1,
  strokeWidth: 1.8
};

export const variations = [variation0, variation1, variation2];
