import { useRef, useState } from "react";
import { useStore } from "@/store/useStore";

import { Slider } from "@/components/ui/slider";
import { Button } from "./ui/button";
import { HexColorPicker } from "react-colorful";
import IconsDialog from "./icons-dialog";
import ColorPicker from "./color-picker";

import { UploadIcon, RotateCcwIcon } from "lucide-react";
import { Tooltiper } from "./tooltiper";

type ControlProps = {
  label: string;
};

type ControlGroupProps = ControlProps & {
  children: React.ReactNode;
  rester?: () => void;
};

const ControlGroup: React.FC<ControlGroupProps> = ({
  children,
  label,
  rester
}) => {
  function handleValueReset() {
    if (rester) rester();
  }

  return (
    <section className="rounded border">
      <div className="flex items-center justify-between border-b-2 p-2">
        <p className="block text-sm font-medium">{label}</p>
        {rester && (
          <Tooltiper message="Reset To Default">
            <button
              type="button"
              onClick={handleValueReset}
              className="transition-all hover:scale-105"
            >
              <RotateCcwIcon className="h-5 w-5" />
            </button>
          </Tooltiper>
        )}
      </div>
      <span className="flex flex-col gap-3 px-2 pb-3 pt-1">{children}</span>
    </section>
  );
};

type ControlSliderProps = ControlProps &
  React.ComponentPropsWithoutRef<typeof Slider>;

const ControlSlider: React.FC<ControlSliderProps> = ({ label, ...props }) => (
  <div>
    <p className="mb-1 block text-sm font-medium">{label}</p>
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
    <p className="mb-1 block text-sm font-medium">{label}</p>
    <HexColorPicker className="w-full" color={value} onChange={onChange} />
  </div>
);

export default function EditingSection() {
  const [tapName, setTapName] = useState<"icon" | "background">("icon");

  return (
    <aside className="h-full w-full space-y-3 overflow-y-auto border-b-[3px] border-r-2 p-3 md:w-[500px] md:border-b-0">
      <section className="flex">
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
      </section>
      <section className="space-y-3 md:border-b-0">
        {tapName === "icon" ? <IconControlGroup /> : <BackgroundControlGroup />}
      </section>
    </aside>
  );
}

function IconControlGroup() {
  const { svgSettings, updateSvgSetting, setCustomSvg } = useStore();

  const inputRef = useRef<HTMLInputElement>(null);

  function handleUploadIcon(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      setCustomSvg(base64);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };
  }

  return (
    <ControlGroup label="Icon Customization">
      <section className="mt-2">
        <IconsDialog />
        <Button
          onClick={() => inputRef.current?.click()}
          className="mt-1 flex h-12 w-full items-center justify-center gap-2"
        >
          <UploadIcon />
          <span>Upload Icon</span>
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/svg+xml"
          onChange={handleUploadIcon}
          className="hidden"
          style={{ display: "none" }}
        />
      </section>
      <ControlSlider
        label="Icon Opacity"
        min={0}
        max={1}
        step={0.01}
        value={[svgSettings.opacity]}
        onValueChange={(value) => updateSvgSetting("opacity", value[0])}
      />
      <section className="flex flex-col gap-[6px]">
        <ControlColor
          label="Icon Color"
          value={svgSettings.svgColor}
          onChange={(color) => updateSvgSetting("svgColor", color)}
        />
        <ColorPicker
          onChange={(color) => updateSvgSetting("svgColor", color)}
          value={svgSettings.svgColor}
        />
      </section>
      <ControlSlider
        label="Icon fill Opacity"
        min={0}
        max={1}
        step={0.01}
        value={[svgSettings.fillOpacity]}
        onValueChange={(value) => updateSvgSetting("fillOpacity", value[0])}
      />
      <section className="flex flex-col gap-[6px]">
        <ControlColor
          label="Icon Filling Color"
          value={svgSettings.fillColor}
          onChange={(color) => updateSvgSetting("fillColor", color)}
        />
        <ColorPicker
          onChange={(color) => updateSvgSetting("fillColor", color)}
          value={svgSettings.fillColor}
        />
      </section>
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
        <section className="flex flex-col gap-[6px]">
          <ControlColor
            label="Inner Shadow Color"
            value={svgSettings.innerShadowColor}
            onChange={(color) => updateSvgSetting("innerShadowColor", color)}
          />
          <ColorPicker
            onChange={(color) => updateSvgSetting("innerShadowColor", color)}
            value={svgSettings.innerShadowColor}
          />
        </section>
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
      <ControlGroup
        label="Icon Position"
        rester={() => updateSvgSetting("position", { x: 0, y: 0 })}
      >
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
      <ControlGroup
        label="Icon Skew"
        rester={() => {
          updateSvgSetting("skewX", 0);
          updateSvgSetting("skewY", 0);
        }}
      >
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
      <section className="flex flex-col gap-[6px]">
        <ControlColor
          label="Background Color"
          value={svgSettings.bgColor}
          onChange={(color) => updateSvgSetting("bgColor", color)}
        />
        <ColorPicker
          onChange={(color) => updateSvgSetting("bgColor", color)}
          value={svgSettings.bgColor}
          displayColorOnly={false}
        />
      </section>
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
        <section className="flex flex-col gap-[6px]">
          <ControlColor
            label="Background Shadow Color"
            value={svgSettings.shadowColor}
            onChange={(color) => updateSvgSetting("shadowColor", color)}
          />
          <ColorPicker
            onChange={(color) => updateSvgSetting("shadowColor", color)}
            value={svgSettings.shadowColor}
          />
        </section>
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
