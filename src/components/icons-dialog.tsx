import { useMemo, useState, useCallback } from "react";
import { useStore } from "@/store/useStore";

import { formatText } from "@/lib/formatter";
import type { Icons } from "@/types";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltiper } from "./tooltiper";

import * as svgs from "lucide-react";

const ICONS_PER_PAGE = 35;

export default function IconsDialog() {
  const { setSelectedSvgName, selectedSvgName } = useStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const SvgComponent = svgs[selectedSvgName as Icons];

  const filteredIconNames = useMemo(() => {
    return Object.keys(svgs.icons).filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const { iconButtons, totalPages } = useMemo(() => {
    const totalPages = Math.ceil(filteredIconNames.length / ICONS_PER_PAGE);
    const buttons = filteredIconNames
      .slice(currentPage * ICONS_PER_PAGE, (currentPage + 1) * ICONS_PER_PAGE)
      .map((name) => {
        const SvgComponent = svgs[name as Icons];
        return (
          <Tooltiper message={formatText(`${name}`)} key={name}>
            <DialogClose>
              <Button
                aria-label={`Select ${name} icon`}
                onClick={() => setSelectedSvgName(name as Icons)}
                className="flex h-14 w-14 items-center justify-center rounded-lg transition-all hover:opacity-80 md:h-16 md:w-16"
              >
                <SvgComponent className="h-full w-full" />
              </Button>
            </DialogClose>
          </Tooltiper>
        );
      });
    return { iconButtons: buttons, totalPages };
  }, [currentPage, setSelectedSvgName, filteredIconNames, selectedSvgName]);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      setCurrentPage(0);
    },
    []
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label="Select Icon"
          variant="shine"
          className="flex h-12 w-full items-center justify-center gap-2"
        >
          <SvgComponent />
          <span>Select Icon</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="hidden">
          <DialogTitle>Select an Icon</DialogTitle>
          <DialogDescription>
            Search for icons or select from the list below.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Search Icons..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full"
          />
          <div className="flex flex-wrap items-center justify-center gap-1 p-2">
            {iconButtons}
          </div>
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              variant="outline"
            >
              <svgs.ChevronLeft />
            </Button>
            <span>
              Page {currentPage + 1} of {totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
              }
              disabled={currentPage === totalPages - 1}
              variant="outline"
            >
              <svgs.ChevronRight />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
