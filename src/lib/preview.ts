const base = {
  fillColor: "#0A0B0B",
  fillOpacity: 0,
  size: 30,
  radius: 10,
  bgColor: "#BECEDC",
  svgColor: "#0A0B0B",
  position: { x: 0, y: 0 },
  rotation: 0,
  strokeWidth: 2,
  opacity: 1,
  scale: 1,
  shadowColor: "#0A0B0B",
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0
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
