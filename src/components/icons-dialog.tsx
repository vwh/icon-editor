import React, { useMemo, useState, useCallback } from "react";
import { useStore } from "@/store/useStore";
import type { Icons } from "@/types";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  const iconButtons = useMemo(() => {
    const totalPages = Math.ceil(filteredIconNames.length / ICONS_PER_PAGE);
    return {
      buttons: filteredIconNames
        .slice(currentPage * ICONS_PER_PAGE, (currentPage + 1) * ICONS_PER_PAGE)
        .map((name) => {
          const IconComponent = svgs[name as Icons];
          return (
            <MemoizedIconButton
              key={name}
              name={name}
              icon={IconComponent}
              onClick={() => setSelectedSvgName(name as Icons)}
            />
          );
        }),
      totalPages
    };
  }, [currentPage, setSelectedSvgName, filteredIconNames]);

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
        <Button variant="gooeyRight" className="w-full">
          <SvgComponent />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <section className="mt-3 flex flex-col gap-1 text-center">
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="mb-4"
          />
          <div className="grid grid-cols-5 gap-2">{iconButtons.buttons}</div>
          <div className="mt-4 flex justify-center gap-2">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <span className="self-center">
              Page {currentPage + 1} of {iconButtons.totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(iconButtons.totalPages - 1, prev + 1)
                )
              }
              disabled={currentPage === iconButtons.totalPages - 1}
            >
              Next
            </Button>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}

const MemoizedIconButton = React.memo(
  ({
    name,
    icon: Icon,
    onClick
  }: {
    name: string;
    icon: React.ElementType;
    onClick: () => void;
  }) => (
    <DialogClose>
      <Button
        onClick={onClick}
        className="flex w-full items-center justify-center gap-2"
        title={name}
      >
        <Icon size={24} />
      </Button>
    </DialogClose>
  )
);
