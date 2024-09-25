import { useState } from "react";
import type { SvgSettings, Icons } from "@/types";

import * as svgs from "lucide-react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function App() {
  const [svgSettings, setSvgSettings] = useState<SvgSettings>({
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
  });

  const [selectedSvgName, setSelectedSvgName] = useState<Icons>("Atom");
  const SvgComponent = svgs[selectedSvgName as Icons];
  return (
    <>
      <Navbar />
      <main className="flex h-screen">
        <Sidebar
          setSvgSettings={setSvgSettings}
          setSelectedSvgName={setSelectedSvgName}
          svgSettings={svgSettings}
        />
        <section className="flex h-full w-full items-center justify-center">
          <div
            id="svg-container"
            style={{
              width: "256px",
              height: "256px",
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
                top: `${128 + svgSettings.position.y - svgSettings.size / 2}px`,
                left: `${128 + svgSettings.position.x - svgSettings.size / 2}px`,
                opacity: svgSettings.opacity
              }}
            >
              <SvgComponent
                fill="none"
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
        </section>
      </main>
    </>
  );
}
