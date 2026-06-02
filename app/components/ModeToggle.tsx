"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@radix-ui/themes";

/**
 * Light/dark mode toggle. Uses useSyncExternalStore to detect when the
 * component is hydrated on the client (avoids SSR/hydration mismatch from
 * `useTheme()` returning `undefined` server-side). The lint rule
 * `react-hooks/set-state-in-effect` would flag the more obvious
 * `useEffect(() => setMounted(true), [])` pattern.
 */
function useIsHydrated(): boolean {
  return React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ModeToggle() {
  const hydrated = useIsHydrated();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = hydrated && resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="1"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all ${
          isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
        }`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
          isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"
        }`}
      />
    </Button>
  );
}
