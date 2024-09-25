import { useStore } from "@/store/useStore";
import type { Icons } from "@/types";

import * as svgs from "lucide-react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function App() {
  const { svgSettings, selectedSvgName } = useStore();
  const SvgComponent = svgs[selectedSvgName as Icons];

  return (
    <>
      <Navbar />
      <main className="flex h-screen">
        <Sidebar />
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
