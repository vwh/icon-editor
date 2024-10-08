import { cn } from "@/lib/utils";
import { gradients } from "@/lib/values";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import { Paintbrush } from "lucide-react";

function ColorPicker({
  value,
  onChange,
  displayColorOnly = true
}: {
  value: string;
  onChange: (background: string) => void;
  displayColorOnly?: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <section className="flex w-full items-center gap-2">
            {value ? (
              <div
                className="h-4 w-4 rounded !bg-cover !bg-center transition-all"
                style={{ background: value }}
              />
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="w-full flex-1 truncate">
              {displayColorOnly
                ? value?.startsWith("#")
                  ? value
                  : "Color Picker"
                : value && !value?.startsWith("#")
                  ? value
                  : "Gradient Picker"}
            </div>
          </section>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        {!displayColorOnly && (
          <section className="mb-2 flex max-h-24 flex-wrap gap-1 overflow-auto">
            {gradients.map((s) => (
              <button
                type="button"
                key={s}
                style={{ background: s }}
                className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
                onClick={() => onChange(s)}
              />
            ))}
          </section>
        )}
        <Input
          id="custom"
          value={value}
          className="col-span-2 h-8"
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  );
}

export default ColorPicker;
