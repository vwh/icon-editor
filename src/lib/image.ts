import { toPng, toJpeg } from "html-to-image";

const OPTIONS = {
  cacheBust: true,
  skipFonts: true
};

export async function handleDownload(type: "png" | "jpg") {
  const container = document.getElementById("svg-container");
  if (!container) return;
  try {
    const dataUrl = await (type === "png"
      ? toPng(container, OPTIONS)
      : toJpeg(container, OPTIONS));

    const link = document.createElement("a");
    link.download = `icon.${type}`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Error generating image:", error);
  }
}

export async function handleCopyImage() {
  const container = document.getElementById("svg-container");
  if (!container) return;
  try {
    const dataUrl = await toPng(container, OPTIONS);
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    const clipboardItem = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([clipboardItem]).catch((err) => {
      console.error("Failed to copy the image: ", err);
    });
  } catch (error) {
    console.error("Error generating image:", error);
  }
}
