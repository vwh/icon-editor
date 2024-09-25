import React, { useMemo, useState, useCallback } from "react";
import type { Icons } from "@/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as svgs from "lucide-react";

const ICONS_PER_PAGE = 20;

interface IconButtonProps {
  setSelectedSvgName: React.Dispatch<React.SetStateAction<Icons>>;
}

export default function IconsDialog({ setSelectedSvgName }: IconButtonProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // const SvgComponent = svgs[selectedSvgName as Icons];

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
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <section className="flex flex-col gap-2 text-center">
          <h2 className="mb-2 text-xl font-bold">Select an Icon</h2>
          <Input
            type="text"
            placeholder="Search icons..."
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
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
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
    <Button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2"
      title={name}
    >
      <Icon size={24} />
    </Button>
  )
);
