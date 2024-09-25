import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme/theme-toggle";

import { handleDownload } from "@/lib/download";

export default function Navbar() {
  return (
    <nav className="flex h-full w-full items-center justify-center gap-2 border-b-2 p-2">
      <Button onClick={handleDownload}>Download as PNG</Button>
      <ThemeToggle />
    </nav>
  );
}
