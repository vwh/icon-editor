import { toPng } from "html-to-image";

export async function handleDownload() {
  const container = document.getElementById("svg-container");
  if (!container) return;
  try {
    const dataUrl = await toPng(container, {
      cacheBust: true,
      skipFonts: true
    });
    const link = document.createElement("a");
    link.download = "icon.png";
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Error generating image:", error);
  }
}
