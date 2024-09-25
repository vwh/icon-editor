import { useStore } from "@/store/useStore";
import { variations } from "@/lib/preview";
import type { Icons } from "@/types";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import * as svgs from "lucide-react";

import { handleDownload } from "@/lib/download";

export default function Navbar() {
  const { selectedSvgName, setSvgSettings } = useStore();
  const SvgComponent = svgs[selectedSvgName as Icons];
  return (
    <nav className="flex h-full w-full items-center justify-between gap-2 border-b-2 p-2">
      <span className="hidden text-xl font-bold md:block">Icon Editor</span>
      <div className="flex gap-1">
        {variations.map((svgSettings, index) => (
          <button
            key={index}
            type="button"
            onClick={() =>
              setSvgSettings({
                ...svgSettings,
                size: 190,
                radius: 30
              })
            }
          >
            <div
              className="z-50"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: `${svgSettings.radius}px`,
                backgroundColor: svgSettings.bgColor,
                position: "relative",
                overflow: "hidden",
                boxShadow: `${svgSettings.shadowOffsetX}px ${svgSettings.shadowOffsetY}px ${svgSettings.shadowBlur}px ${svgSettings.shadowColor}`
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: `${25 + svgSettings.position.y - svgSettings.size / 2}px`,
                  left: `${25 + svgSettings.position.x - svgSettings.size / 2}px`,
                  opacity: svgSettings.opacity
                }}
              >
                <SvgComponent
                  fill={svgSettings.fillColor}
                  fillOpacity={svgSettings.fillOpacity}
                  stroke={svgSettings.svgColor}
                  strokeWidth={svgSettings.strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width={svgSettings.size}
                  height={svgSettings.size}
                  style={{
                    position: "absolute",
                    transform: `rotate(${svgSettings.rotation}deg) scale(${svgSettings.scale})`
                  }}
                />
              </div>
            </div>
          </button>
        ))}
      </div>
      <Button onClick={handleDownload}>
        <DownloadIcon />
        <span className="ml-2 md:text-lg">Download</span>
      </Button>
    </nav>
  );
}
