import React, { useMemo } from "react";
import { useStore } from "@/store/useStore";

import {
  randomIconColor,
  randomIconName,
  randomGradientOrColor
} from "@/lib/random";
import { variations } from "@/lib/values";
import { handleDownload } from "@/lib/download";
import type { Icons, SvgSettings } from "@/types";

import { Tooltiper } from "./tooltiper";
import { Button } from "@/components/ui/button";

import { DownloadIcon } from "lucide-react";
import * as svgs from "lucide-react";

interface VariationButtonProps {
  svgSettings: SvgSettings;
  onClick: () => void;
  SvgComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const VariationButton: React.FC<VariationButtonProps> = React.memo(
  ({ svgSettings, onClick, SvgComponent }) => {
    const containerStyle = useMemo(
      () => ({
        width: "50px",
        height: "50px",
        borderRadius: `${svgSettings.radius}px`,
        backgroundColor: svgSettings.bgColor,
        position: "relative" as const,
        overflow: "hidden",
        boxShadow: `${svgSettings.shadowOffsetX}px ${svgSettings.shadowOffsetY}px ${svgSettings.shadowBlur}px ${svgSettings.shadowColor}`
      }),
      [svgSettings]
    );

    const svgWrapperStyle = useMemo(
      () => ({
        position: "absolute" as const,
        top: `${25 + svgSettings.position.y - svgSettings.size / 2}px`,
        left: `${25 + svgSettings.position.x - svgSettings.size / 2}px`,
        opacity: svgSettings.opacity
      }),
      [svgSettings]
    );

    const svgStyle = useMemo(
      () => ({
        position: "absolute" as const,
        transform: `rotate(${svgSettings.rotation}deg) scale(${svgSettings.scale})`
      }),
      [svgSettings]
    );

    return (
      <Tooltiper message="Select Template">
        <button
          className="transition-all hover:scale-105 hover:opacity-80"
          aria-label="Select Template"
          type="button"
          onClick={onClick}
        >
          <div className="z-50" style={containerStyle}>
            <div style={svgWrapperStyle}>
              <SvgComponent
                fill={svgSettings.fillColor}
                fillOpacity={svgSettings.fillOpacity}
                fillRule="evenodd"
                stroke={svgSettings.svgColor}
                strokeWidth={svgSettings.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                width={svgSettings.size}
                height={svgSettings.size}
                style={svgStyle}
              />
            </div>
          </div>
        </button>
      </Tooltiper>
    );
  }
);

const Navbar: React.FC = () => {
  const {
    selectedSvgName,
    setSelectedSvgName,
    setSvgSettings,
    svgSettings,
    setCustomSvg
  } = useStore();
  const SvgComponent = svgs[selectedSvgName as Icons];

  const handleVariationClick = (svgSettings: SvgSettings) => {
    setCustomSvg(null);
    setSvgSettings({
      ...svgSettings,
      size: 190,
      radius: 30
    });
  };

  const handleRandomClick = () => {
    setCustomSvg(null);
    setSelectedSvgName(randomIconName());
    setSvgSettings({
      ...svgSettings,
      bgColor: randomGradientOrColor(),
      svgColor: randomIconColor(),
      fillColor: randomIconColor(),
      fillOpacity: Math.random() > 0.5 ? 1 : 0,
      innerShadowColor: "#0A0B0B",
      innerShadowBlur: Math.floor(Math.random() * 4),
      innerShadowX: 2,
      innerShadowY: 3
    });
  };

  return (
    <nav className="flex h-full w-full items-center justify-between gap-2 border-b-2 p-2">
      <Tooltiper message="View Source Code">
        <a
          aria-label="View source code"
          href="https://github.com/vwh/icon-editor"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 text-xl font-bold hover:animate-pulse md:flex"
        >
          <img
            src="./logo.webp"
            aria-label="Icon editor logo"
            className="h-10 w-auto"
            alt="Logo"
          />
          <span>Icon Editor</span>
        </a>
      </Tooltiper>
      <div className="flex gap-1">
        <Tooltiper message="Random Variation">
          <button
            className="mx-2 items-center justify-center rounded-lg"
            type="button"
            aria-label="Random Variation"
            onClick={handleRandomClick}
          >
            <svgs.Dices className="h-[25px] w-[25px]" />
          </button>
        </Tooltiper>
        {variations.map((svgSettings, index) => (
          <VariationButton
            key={index}
            svgSettings={svgSettings}
            onClick={() => handleVariationClick(svgSettings)}
            SvgComponent={SvgComponent}
          />
        ))}
      </div>
      <Tooltiper message="Download as PNG">
        <Button aria-label="Download as PNG" onClick={handleDownload}>
          <DownloadIcon className="h-6 w-6" />
          <span className="ml-2 font-semibold">Download</span>
        </Button>
      </Tooltiper>
    </nav>
  );
};

export default Navbar;
