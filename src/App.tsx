import { useMemo } from "react";
import { useStore } from "@/store/useStore";
import type { Icons } from "@/types";
import { cn } from "@/lib/utils";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import DotPattern from "@/components/magicui/dot-pattern";
import * as svgs from "lucide-react";

const App: React.FC = () => {
  const { svgSettings, selectedSvgName } = useStore();
  const SvgComponent = svgs[selectedSvgName as Icons];

  const containerStyle = useMemo(
    () => ({
      width: "256px",
      height: "256px",
      borderRadius: `${svgSettings.radius}px`,
      backgroundColor: svgSettings.bgColor,
      position: "relative" as const,
      overflow: "hidden",
      boxShadow: `${svgSettings.shadowOffsetX}px ${svgSettings.shadowOffsetY}px ${svgSettings.shadowBlur}px ${svgSettings.shadowColor}`,
      filter: `blur(${svgSettings.backgroundBlur}px)`
    }),
    [svgSettings]
  );

  const svgWrapperStyle = useMemo(
    () => ({
      position: "absolute" as const,
      top: `${128 + svgSettings.position.y - svgSettings.size / 2}px`,
      left: `${128 + svgSettings.position.x - svgSettings.size / 2}px`,
      transform: `skew(${svgSettings.skewX}deg, ${svgSettings.skewY}deg)`,
      opacity: svgSettings.opacity,
      filter: `blur(${svgSettings.iconBlur}px)`
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
    <>
      <Navbar />
      <main className="flex flex-col md:h-[calc(100vh-68px)] md:flex-row">
        <Sidebar />
        <section className="relative flex h-[300px] w-full flex-grow items-center justify-center overflow-hidden bg-background md:h-full md:shadow-xl">
          <div className="z-50" id="svg-container" style={containerStyle}>
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
          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
            )}
          />
        </section>
      </main>
    </>
  );
};

export default App;
