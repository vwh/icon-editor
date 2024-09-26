import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Paintbrush } from "lucide-react";
import { gradients } from "@/lib/values";

export function GradientPicker({
  value,
  onChange,
  displayColorOnly
}: {
  value: string;
  onChange: (background: string) => void;
  displayColorOnly?: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <div className="flex w-full items-center gap-2">
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
                ? value && value.startsWith("#")
                  ? value
                  : "Color Picker"
                : value && !value.startsWith("#")
                  ? value
                  : "Gradient Picker"}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        {!displayColorOnly && (
          <div className="mb-2 flex max-h-24 flex-wrap gap-1 overflow-auto">
            {gradients.map((s, index) => (
              <button
                type="button"
                key={index}
                style={{ background: s }}
                className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
                onClick={() => onChange(s)}
              />
            ))}
          </div>
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
