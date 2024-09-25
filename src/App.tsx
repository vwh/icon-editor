import { useStore } from "@/store/useStore";
import type { Icons } from "@/types";

import { cn } from "@/lib/utils";
import * as svgs from "lucide-react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import DotPattern from "@/components/magicui/dot-pattern";

export default function App() {
  const { svgSettings, selectedSvgName } = useStore();
  const SvgComponent = svgs[selectedSvgName as Icons];

  return (
    <>
      <Navbar />
      <main className="flex h-[calc(100vh-68px)] flex-col md:flex-row">
        <Sidebar />
        <section className="relative flex h-full w-full items-center justify-center overflow-hidden bg-background md:shadow-xl">
          <div
            className="z-50"
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
          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
            )}
          />
        </section>
      </main>
    </>
  );
}
