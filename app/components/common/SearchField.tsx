"use client";

/**
 * SearchField — a controlled search input with a clear button.
 *
 * Uses Radix TextField as the base so it inherits the design system's
 * sizing, focus ring, and disabled styles. Clear button appears only
 * when the field is non-empty. The component is presentation-only —
 * filtering logic lives in the consumer (each list page handles its
 * own matching rules).
 */

import { Search, X } from "lucide-react";
import { TextField, IconButton } from "@radix-ui/themes";

type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
  /** Accessible label — falls back to placeholder if omitted. */
  "aria-label"?: string;
};

export function SearchField({
  value,
  onChange,
  placeholder,
  className,
  "aria-label": ariaLabel,
}: SearchFieldProps) {
  return (
    <div className={className}>
      <TextField.Root
        size="3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        className="w-full"
      >
        <TextField.Slot>
          <Search className="h-4 w-4 text-text-3" />
        </TextField.Slot>
        {value.length > 0 && (
          <TextField.Slot>
            <IconButton
              size="1"
              variant="ghost"
              color="gray"
              aria-label="Clear search"
              onClick={() => onChange("")}
            >
              <X className="h-3.5 w-3.5" />
            </IconButton>
          </TextField.Slot>
        )}
      </TextField.Root>
    </div>
  );
}
