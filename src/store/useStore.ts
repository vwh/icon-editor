import { create } from "zustand";
import type { Icons, SvgSettings } from "@/types";

interface State {
  svgSettings: SvgSettings;
  selectedSvgName: Icons;
  customSvg: string | null;
}

interface Actions {
  setSvgSettings: (svgSettings: SvgSettings) => void;
  updateSvgSetting: (key: string, value: unknown) => void;
  setSelectedSvgName: (name: Icons) => void;
  setCustomSvg: (customSvg: string | null) => void;
}

export const defaultSvgSettings: SvgSettings = {
  fillColor: "#0A0B0B",
  fillOpacity: 0,
  size: 190,
  radius: 30,
  bgColor: "#D4E7F7",
  svgColor: "#0A0B0B",
  position: { x: 0, y: 0 },
  rotation: 0,
  strokeWidth: 2,
  opacity: 1,
  scale: 1,
  shadowColor: "#0A0B0B",
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  skewX: 0,
  skewY: 0,
  iconBlur: 0,
  backgroundBlur: 0,
  innerShadowColor: "#0A0B0B",
  innerShadowBlur: 3,
  innerShadowX: 2,
  innerShadowY: 3
};

const initialState: State = {
  selectedSvgName: "Paintbrush",
  svgSettings: defaultSvgSettings,
  customSvg: null
};

export const useStore = create<State & Actions>((set) => ({
  ...initialState,

  setSvgSettings: (svgSettings: SvgSettings) => {
    set((state) => ({ ...state, svgSettings }));
  },

  updateSvgSetting: (key: string, value: unknown) => {
    set((state) => ({
      ...state,
      svgSettings: { ...state.svgSettings, [key]: value }
    }));
  },

  setSelectedSvgName: (name: Icons) => {
    set({ selectedSvgName: name });
  },

  setCustomSvg: (customSvg: string | null) => {
    set({ customSvg });
  }
}));
