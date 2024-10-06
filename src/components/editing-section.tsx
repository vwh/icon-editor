import { useState } from "react";
import { useStore } from "@/store/useStore";

import { Slider } from "@/components/ui/slider";
import { Button } from "./ui/button";
import { HexColorPicker } from "react-colorful";
import IconsDialog from "./icons-dialog";
import ColorPicker from "./color-picker";

type ControlProps = {
  label: string;
};

type ControlGroupProps = ControlProps & {
  children: React.ReactNode;
};

const ControlGroup: React.FC<ControlGroupProps> = ({ children, label }) => (
  <div className="rounded border">
    <label className="block border-b-2 p-2 text-sm font-medium">{label}</label>
    <span className="flex flex-col gap-3 px-2 pb-3 pt-1">{children}</span>
  </div>
);

type ControlSliderProps = ControlProps &
  React.ComponentPropsWithoutRef<typeof Slider>;

const ControlSlider: React.FC<ControlSliderProps> = ({ label, ...props }) => (
  <div>
    <label className="mb-1 block text-sm font-medium">{label}</label>
    <Slider {...props} />
  </div>
);

type ControlColorProps = ControlProps & {
  value: string;
  onChange: (color: string) => void;
};

const ControlColor: React.FC<ControlColorProps> = ({
  value,
  onChange,
  label
}) => (
  <div>
    <label className="mb-1 block text-sm font-medium">{label}</label>
    <HexColorPicker className="w-full" color={value} onChange={onChange} />
  </div>
);

export default function EditingSection() {
  const [tapName, setTapName] = useState<"icon" | "background">("icon");

  return (
    <aside className="h-full w-full space-y-3 overflow-y-auto border-b-[3px] border-r-2 p-3 md:w-[500px] md:border-b-0">
      <div className="flex">
        <Button
          variant="gooeyLeft"
          className="w-full rounded-none rounded-bl rounded-tl border-r-2"
          onClick={() => setTapName("icon")}
          disabled={tapName === "icon"}
        >
          Icon
        </Button>
        <Button
          variant="gooeyRight"
          className="w-full rounded-none rounded-br rounded-tr"
          onClick={() => setTapName("background")}
          disabled={tapName === "background"}
        >
          Background
        </Button>
      </div>
      <div className="space-y-3 md:border-b-0">
        {tapName === "icon" ? <IconControlGroup /> : <BackgroundControlGroup />}
      </div>
    </aside>
  );
}

function IconControlGroup() {
  const { svgSettings, updateSvgSetting } = useStore();
  return (
    <ControlGroup label="Icon Customization">
      <div className="mt-2">
        <IconsDialog />
      </div>
      <ControlSlider
        label="Icon Opacity"
        min={0}
        max={1}
        step={0.01}
        value={[svgSettings.opacity]}
        onValueChange={(value) => updateSvgSetting("opacity", value[0])}
      />
      <div className="flex flex-col gap-[6px]">
        <ControlColor
          label="Icon Color"
          value={svgSettings.svgColor}
          onChange={(color) => updateSvgSetting("svgColor", color)}
        />
        <ColorPicker
          onChange={(color) => updateSvgSetting("svgColor", color)}
          value={svgSettings.svgColor}
          displayColorOnly={true}
        />
      </div>
      <ControlSlider
        label="Icon fill Opacity"
        min={0}
        max={1}
        step={0.01}
        value={[svgSettings.fillOpacity]}
        onValueChange={(value) => updateSvgSetting("fillOpacity", value[0])}
      />
      <div className="flex flex-col gap-[6px]">
        <ControlColor
          label="Icon Filling Color"
          value={svgSettings.fillColor}
          onChange={(color) => updateSvgSetting("fillColor", color)}
        />
        <ColorPicker
          onChange={(color) => updateSvgSetting("fillColor", color)}
          value={svgSettings.fillColor}
          displayColorOnly={true}
        />
      </div>
      <ControlSlider
        label="Icon Border Width"
        min={0.1}
        max={10}
        step={0.1}
        value={[svgSettings.strokeWidth]}
        onValueChange={(value) => updateSvgSetting("strokeWidth", value[0])}
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
        label="Icon Blur"
        min={0}
        max={20}
        step={0.1}
        value={[svgSettings.iconBlur]}
        onValueChange={(value) => updateSvgSetting("iconBlur", value[0])}
      />
      <ControlGroup label="Inner Shadow">
        <div className="flex flex-col gap-[6px]">
          <ControlColor
            label="Inner Shadow Color"
            value={svgSettings.innerShadowColor}
            onChange={(color) => updateSvgSetting("innerShadowColor", color)}
          />
          <ColorPicker
            onChange={(color) => updateSvgSetting("innerShadowColor", color)}
            value={svgSettings.innerShadowColor}
            displayColorOnly={true}
          />
        </div>
        <ControlSlider
          label="Inner Shadow Blur"
          min={0}
          max={20}
          step={1}
          value={[svgSettings.innerShadowBlur]}
          onValueChange={(value) =>
            updateSvgSetting("innerShadowBlur", value[0])
          }
        />
        <ControlSlider
          label="Inner Shadow Offset (X)"
          min={-20}
          max={20}
          step={1}
          value={[svgSettings.innerShadowX]}
          onValueChange={(value) => updateSvgSetting("innerShadowX", value[0])}
        />
        <ControlSlider
          label="Inner Shadow Offset (Y)"
          min={-20}
          max={20}
          step={1}
          value={[svgSettings.innerShadowY]}
          onValueChange={(value) => updateSvgSetting("innerShadowY", value[0])}
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
          label="Icon Position (X)"
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
          label="Icon Position (Y)"
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
      <ControlGroup label="Icon Skew">
        <ControlSlider
          label="Icon Skew (X)"
          min={-100}
          max={100}
          step={0.2}
          value={[svgSettings.skewX]}
          onValueChange={(value) => updateSvgSetting("skewX", value[0])}
        />
        <ControlSlider
          label="Icon Skew (Y)"
          min={-100}
          max={100}
          step={1}
          value={[svgSettings.skewY]}
          onValueChange={(value) => updateSvgSetting("skewY", value[0])}
        />
      </ControlGroup>
    </ControlGroup>
  );
}

function BackgroundControlGroup() {
  const { svgSettings, updateSvgSetting } = useStore();
  return (
    <ControlGroup label="Background Customization">
      <div className="flex flex-col gap-[6px]">
        <ControlColor
          label="Background Color"
          value={svgSettings.bgColor}
          onChange={(color) => updateSvgSetting("bgColor", color)}
        />
        <ColorPicker
          onChange={(color) => updateSvgSetting("bgColor", color)}
          value={svgSettings.bgColor}
        />
      </div>
      <ControlSlider
        label="Border Radius"
        min={0}
        max={128}
        step={1}
        value={[svgSettings.radius]}
        onValueChange={(value) => updateSvgSetting("radius", value[0])}
      />
      <ControlSlider
        label="Background Blur"
        min={0}
        max={20}
        step={0.1}
        value={[svgSettings.backgroundBlur]}
        onValueChange={(value) => updateSvgSetting("backgroundBlur", value[0])}
      />
      <ControlGroup label="Shadow">
        <div className="flex flex-col gap-[6px]">
          <ControlColor
            label="Background Shadow Color"
            value={svgSettings.shadowColor}
            onChange={(color) => updateSvgSetting("shadowColor", color)}
          />
          <ColorPicker
            onChange={(color) => updateSvgSetting("shadowColor", color)}
            value={svgSettings.shadowColor}
            displayColorOnly={true}
          />
        </div>
        <ControlSlider
          label="Background Shadow Blur"
          min={0}
          max={20}
          step={1}
          value={[svgSettings.shadowBlur]}
          onValueChange={(value) => updateSvgSetting("shadowBlur", value[0])}
        />
        <ControlSlider
          label="Background Shadow Offset (X)"
          min={-20}
          max={20}
          step={1}
          value={[svgSettings.shadowOffsetX]}
          onValueChange={(value) => updateSvgSetting("shadowOffsetX", value[0])}
        />
        <ControlSlider
          label="Background Shadow Offset (Y)"
          min={-20}
          max={20}
          step={1}
          value={[svgSettings.shadowOffsetY]}
          onValueChange={(value) => updateSvgSetting("shadowOffsetY", value[0])}
        />
      </ControlGroup>
    </ControlGroup>
  );
}
