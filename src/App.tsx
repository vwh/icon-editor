import { useMemo, useEffect, useState } from "react";
import { useStore } from "@/store/useStore";

import { cn } from "@/lib/utils";
import type { Icons } from "@/types";

import Navbar from "@/components/navbar";
import EditingSection from "@/components/editing-section";
import DotPattern from "@/components/magicui/dot-pattern";

import * as svgs from "lucide-react";

const App: React.FC = () => {
  const { svgSettings, selectedSvgName, customSvg } = useStore();
  const SvgComponent = svgs[selectedSvgName as Icons];

  const [customSvgContent, setCustomSvgContent] = useState<string | null>(null);
  const [customViewBox, setCustomViewBox] = useState<string | null>(null);

  useEffect(() => {
    if (customSvg) {
      // Extract the SVG content from the base64 string
      const svgContent = atob(customSvg.split(",")[1]);
      setCustomSvgContent(svgContent);
      // Extract viewBox
      const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
      if (viewBoxMatch && viewBoxMatch[1]) {
        setCustomViewBox(viewBoxMatch[1]);
      } else {
        setCustomViewBox(null);
      }
    } else {
      setCustomSvgContent(null);
      setCustomViewBox(null);
    }
  }, [customSvg]);

  const svgStyle = useMemo(
    () => ({
      position: "absolute" as const,
      transform: `rotate(${svgSettings.rotation}deg) scale(${svgSettings.scale})`,
      filter: `drop-shadow(${svgSettings.innerShadowX}px ${svgSettings.innerShadowY}px ${svgSettings.innerShadowBlur}px ${svgSettings.innerShadowColor})`
    }),
    [svgSettings]
  );

  const containerStyle = useMemo(
    () => ({
      width: "256px",
      height: "256px",
      borderRadius: `${svgSettings.radius}px`,
      background: svgSettings.bgColor,
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

  const customSvgStyle = useMemo(() => {
    if (!customViewBox) return svgStyle;

    const [, , vbWidth, vbHeight] = customViewBox.split(" ").map(Number);
    const scale = Math.min(
      svgSettings.size / vbWidth,
      svgSettings.size / vbHeight
    );

    return {
      ...svgStyle,
      transform: `${svgStyle.transform} scale(${scale})`,
      fill: svgSettings.fillColor,
      fillOpacity: svgSettings.fillOpacity,
      stroke: svgSettings.svgColor,
      strokeWidth: `${svgSettings.strokeWidth}px`,
      opacity: svgSettings.opacity
    };
  }, [customViewBox, svgSettings, svgStyle]);

  return (
    <>
      <Navbar />
      <main className="flex h-[calc(100vh-68px)] flex-col md:flex-row">
        <EditingSection />
        <section className="relative flex h-full w-full flex-grow items-center justify-center overflow-hidden bg-background md:shadow-xl">
          <div
            className="z-50 transition-all hover:scale-105"
            id="svg-container"
            style={containerStyle}
          >
            <div style={svgWrapperStyle}>
              {customSvgContent ? (
                <svg
                  width={svgSettings.size}
                  height={svgSettings.size}
                  viewBox={customViewBox || undefined}
                  style={customSvgStyle}
                  dangerouslySetInnerHTML={{ __html: customSvgContent }}
                  preserveAspectRatio="xMidYMid meet"
                />
              ) : (
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
              )}
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
