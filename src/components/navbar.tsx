import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme/theme-toggle";
import { DownloadIcon } from "lucide-react";

import { handleDownload } from "@/lib/download";

export default function Navbar() {
  return (
    <nav className="flex h-full w-full items-center justify-between gap-2 border-b-2 p-2">
      <span className="text-xl font-bold">Icon Editor</span>
      <Button onClick={handleDownload}>
        <DownloadIcon />
        <span className="ml-2 text-lg">Download</span>
      </Button>
      <ThemeToggle />
    </nav>
  );
}
