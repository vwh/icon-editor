import React, { useMemo } from "react";
import { useStore } from "@/store/useStore";
import { variations } from "@/lib/preview";
import type { Icons, SvgSettings } from "@/types";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import * as svgs from "lucide-react";
import { handleDownload } from "@/lib/download";

interface VariationButtonProps {
  svgSettings: SvgSettings;
  onClick: () => void;
  SvgComponent: React.ComponentType<any>;
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
      <button
        className="transition-all hover:scale-105 hover:opacity-80"
        title="Select template"
        type="button"
        onClick={onClick}
      >
        <div className="z-50" style={containerStyle}>
          <div style={svgWrapperStyle}>
            <SvgComponent
              fill={svgSettings.fillColor}
              fillOpacity={svgSettings.fillOpacity}
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
    );
  }
);

const Navbar: React.FC = () => {
  const { selectedSvgName, setSvgSettings } = useStore();
  const SvgComponent = svgs[selectedSvgName as Icons];

  const handleVariationClick = (svgSettings: SvgSettings) => {
    setSvgSettings({
      ...svgSettings,
      size: 190,
      radius: 30
    });
  };

  return (
    <nav className="flex h-full w-full items-center justify-between gap-2 border-b-2 p-2">
      <a
        href="https://github.com/vwh/icon-editor"
        target="_blank"
        rel="noreferrer"
        className="hidden items-center gap-2 text-xl font-bold hover:animate-pulse md:flex"
      >
        <img
          src="./logo.webp"
          title="Icons editor logo"
          className="h-10 w-auto"
          alt="Logo"
        />
        <span>Icons Editor</span>
      </a>
      <div className="flex gap-1">
        {variations.map((svgSettings, index) => (
          <VariationButton
            key={index}
            svgSettings={svgSettings}
            onClick={() => handleVariationClick(svgSettings)}
            SvgComponent={SvgComponent}
          />
        ))}
      </div>
      <Button title="Download as PNG" onClick={handleDownload}>
        <DownloadIcon />
        <span className="ml-2 md:text-lg">Download</span>
      </Button>
    </nav>
  );
};

export default Navbar;
