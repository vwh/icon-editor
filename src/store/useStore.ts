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
  selectedSvgName: "Atom",
  svgSettings: {
    size: 64,
    radius: 0,
    bgColor: "#ff0000",
    svgColor: "#000000",
    position: { x: 0, y: 0 },
    rotation: 0,
    strokeWidth: 2,
    opacity: 1,
    scale: 1,
    shadowColor: "#000000",
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0
  }
};

export const useStore = create<State & Actions>((set, get) => ({
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
