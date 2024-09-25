import { useCallback } from "react";
import type { SvgSettings, Icons } from "@/types";

import { Slider } from "@/components/ui/slider";
import { Input, type InputProps } from "@/components/ui/input";
import IconsDialog from "./icons-dialog";

interface SidebarProps {
  setSvgSettings: React.Dispatch<React.SetStateAction<SvgSettings>>;
  setSelectedSvgName: React.Dispatch<React.SetStateAction<Icons>>;
  svgSettings: SvgSettings;
}

export default function Sidebar({
  setSvgSettings,
  svgSettings,
  setSelectedSvgName
}: SidebarProps) {
  const updateSvgSetting = useCallback(
    (key: string, value: unknown) => {
      setSvgSettings((prev) => ({ ...prev, [key]: value }));
    },
    [setSvgSettings]
  );

  return (
    <aside className="h-full w-[300px] flex-grow space-y-4 border-r-2 p-4">
      <IconsDialog setSelectedSvgName={setSelectedSvgName} />
      <ControlSlider
        label="Border Radius"
        min={0}
        max={128}
        step={1}
        value={[svgSettings.radius]}
        onValueChange={(value) => updateSvgSetting("radius", value[0])}
      />
      <ControlSlider
        label="SVG Size"
        min={32}
        max={256}
        step={1}
        value={[svgSettings.size]}
        onValueChange={(value) => updateSvgSetting("size", value[0])}
      />
      <ControlSlider
        label="SVG Position X"
        min={-100}
        max={100}
        step={1}
        value={[svgSettings.position.x]}
        onValueChange={(value) =>
          updateSvgSetting("position", {
            ...svgSettings.position,
            x: value[0]
          })
        }
      />
      <ControlSlider
        label="SVG Position Y"
        min={-100}
        max={100}
        step={1}
        value={[svgSettings.position.y]}
        onValueChange={(value) =>
          updateSvgSetting("position", {
            ...svgSettings.position,
            y: value[0]
          })
        }
      />
      <ControlInput
        label="Background Color"
        type="color"
        value={svgSettings.bgColor}
        onChange={(e) => updateSvgSetting("bgColor", e.target.value)}
      />
      <ControlInput
        label="SVG Color"
        type="color"
        value={svgSettings.svgColor}
        onChange={(e) => updateSvgSetting("svgColor", e.target.value)}
      />
      <ControlSlider
        label="Rotation"
        min={0}
        max={360}
        step={1}
        value={[svgSettings.rotation]}
        onValueChange={(value) => updateSvgSetting("rotation", value[0])}
      />
      <ControlSlider
        label="Stroke Width"
        min={1}
        max={10}
        step={1}
        value={[svgSettings.strokeWidth]}
        onValueChange={(value) => updateSvgSetting("strokeWidth", value[0])}
      />
      <ControlSlider
        label="Opacity"
        min={0}
        max={1}
        step={0.01}
        value={[svgSettings.opacity]}
        onValueChange={(value) => updateSvgSetting("opacity", value[0])}
      />
      <ControlSlider
        label="Scale"
        min={0.1}
        max={2}
        step={0.1}
        value={[svgSettings.scale]}
        onValueChange={(value) => updateSvgSetting("scale", value[0])}
      />
      <ControlInput
        label="Shadow Color"
        type="color"
        value={svgSettings.shadowColor}
        onChange={(e) => updateSvgSetting("shadowColor", e.target.value)}
      />
      <ControlSlider
        label="Shadow Blur"
        min={0}
        max={20}
        step={1}
        value={[svgSettings.shadowBlur]}
        onValueChange={(value) => updateSvgSetting("shadowBlur", value[0])}
      />
      <ControlSlider
        label="Shadow Offset X"
        min={-20}
        max={20}
        step={1}
        value={[svgSettings.shadowOffsetX]}
        onValueChange={(value) => updateSvgSetting("shadowOffsetX", value[0])}
      />
      <ControlSlider
        label="Shadow Offset Y"
        min={-20}
        max={20}
        step={1}
        value={[svgSettings.shadowOffsetY]}
        onValueChange={(value) => updateSvgSetting("shadowOffsetY", value[0])}
      />
    </aside>
  );
}

type SliderProps = React.ComponentPropsWithoutRef<typeof Slider>;

type ControlSliderProps = {
  label: string;
} & SliderProps;

type ControlInputProps = {
  label: string;
} & InputProps;

const ControlSlider = ({ label, ...props }: ControlSliderProps) => (
  <div>
    <label className="mb-1 block text-sm font-medium">{label}</label>
    <Slider {...props} />
  </div>
);

const ControlInput = ({ label, ...props }: ControlInputProps) => (
  <div>
    <label className="mb-1 block text-sm font-medium">{label}</label>
    <Input {...props} className="h-10 w-full" />
  </div>
);
