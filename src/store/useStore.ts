import { create } from "zustand";
import type { Icons, SvgSettings } from "@/types";

interface State {
  svgSettings: SvgSettings;
  selectedSvgName: Icons;
}

interface Actions {
  setSvgSettings: (svgSettings: SvgSettings) => void;
  updateSvgSetting: (key: string, value: unknown) => void;
  setSelectedSvgName: (name: Icons) => void;
}

const initialState: State = {
  selectedSvgName: "Apple",
  svgSettings: {
    fillColor: "#0A0B0B",
    fillOpacity: 0,
    size: 190,
    radius: 30,
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
    shadowOffsetY: 0,
    skewX: 0,
    skewY: 0
  }
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
  }
}));
