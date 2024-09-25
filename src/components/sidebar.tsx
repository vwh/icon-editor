import { useStore } from "@/store/useStore";

import { Slider } from "@/components/ui/slider";
import { Input, type InputProps } from "@/components/ui/input";
import IconsDialog from "./icons-dialog";
import { HexColorPicker } from "react-colorful";

export default function Sidebar() {
  const { svgSettings, updateSvgSetting } = useStore();

  return (
    <aside className="w-full space-y-3 overflow-y-auto border-b-[3px] border-r-2 p-3 pt-4 md:w-[500px] md:border-b-0">
      <IconsDialog />
      <ControlGroup label="Background">
        <ControlColor
          label="Background Color"
          value={svgSettings.bgColor}
          onChange={(color) => updateSvgSetting("bgColor", color)}
        />
        <ControlSlider
          label="Border Radius"
          min={0}
          max={128}
          step={1}
          value={[svgSettings.radius]}
          onValueChange={(value) => updateSvgSetting("radius", value[0])}
        />
      </ControlGroup>
      <ControlGroup label="Icon Dimensions">
        <ControlSlider
          label="Icon Size"
          min={32}
          max={256}
          step={1}
          value={[svgSettings.size]}
          onValueChange={(value) => updateSvgSetting("size", value[0])}
        />
        <ControlSlider
          label="Icon Scale"
          min={0.1}
          max={2}
          step={0.1}
          value={[svgSettings.scale]}
          onValueChange={(value) => updateSvgSetting("scale", value[0])}
        />
      </ControlGroup>
      <ControlGroup label="Icon Position">
        <ControlSlider
          label="Icon Position X"
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
          label="Icon Position Y"
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
      </ControlGroup>
      <ControlGroup label="Icon">
        <ControlColor
          label="Icon Color"
          value={svgSettings.svgColor}
          onChange={(color) => updateSvgSetting("svgColor", color)}
        />
        <ControlSlider
          label="Icon Rotation"
          min={0}
          max={360}
          step={1}
          value={[svgSettings.rotation]}
          onValueChange={(value) => updateSvgSetting("rotation", value[0])}
        />
        <ControlSlider
          label="Icon Border Width"
          min={0.1}
          max={10}
          step={0.1}
          value={[svgSettings.strokeWidth]}
          onValueChange={(value) => updateSvgSetting("strokeWidth", value[0])}
        />
        <ControlSlider
          label="Icon Opacity"
          min={0}
          max={1}
          step={0.01}
          value={[svgSettings.opacity]}
          onValueChange={(value) => updateSvgSetting("opacity", value[0])}
        />
      </ControlGroup>
      <ControlGroup label="Filling">
        <ControlColor
          label="Fill Color"
          value={svgSettings.fillColor}
          onChange={(color) => updateSvgSetting("fillColor", color)}
        />
        <ControlSlider
          label="Fill Opacity"
          min={0}
          max={1}
          step={0.01}
          value={[svgSettings.fillOpacity]}
          onValueChange={(value) => updateSvgSetting("fillOpacity", value[0])}
        />
      </ControlGroup>
      <ControlGroup label="Icon Skew">
        <ControlSlider
          label="Icon Skew X"
          min={-100}
          max={100}
          step={0.2}
          value={[svgSettings.skewX]}
          onValueChange={(value) => updateSvgSetting("skewX", value[0])}
        />
        <ControlSlider
          label="Icon Skew Y"
          min={-100}
          max={100}
          step={1}
          value={[svgSettings.skewY]}
          onValueChange={(value) => updateSvgSetting("skewY", value[0])}
        />
      </ControlGroup>
      <ControlGroup label="Shadow">
        <ControlColor
          label="Shadow Color"
          value={svgSettings.shadowColor}
          onChange={(color) => updateSvgSetting("shadowColor", color)}
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
      </ControlGroup>
    </aside>
  );
}

const ControlGroup = ({
  children,
  label
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <div className="rounded border">
      <label className="block border-b-2 p-2 text-sm font-medium">
        {label}
      </label>
      <span className="flex flex-col gap-2 px-2 pb-3 pt-1">{children}</span>
    </div>
  );
};

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

const ControlColor = ({
  value,
  onChange,
  label
}: {
  value: string;
  onChange: (color: string) => void;
  label: string;
}) => (
  <div>
    <label className="mb-1 block text-sm font-medium">{label}</label>
    <HexColorPicker className="w-full" color={value} onChange={onChange} />
  </div>
);
