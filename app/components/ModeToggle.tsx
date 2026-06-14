"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@radix-ui/themes";
import { motion } from "motion/react";

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

const spring = { type: "spring" as const, stiffness: 380, damping: 30 };

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
      className="relative"
    >
      <motion.span
        initial={false}
        animate={{ rotate: isDark ? 90 : 0, scale: isDark ? 0 : 1 }}
        transition={spring}
        whileTap={{ scale: 0.9 }}
        className="inline-flex h-[1.2rem] w-[1.2rem] items-center justify-center"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </motion.span>
      <motion.span
        initial={false}
        animate={{ rotate: isDark ? 0 : -90, scale: isDark ? 1 : 0 }}
        transition={spring}
        whileTap={{ scale: 0.9 }}
        className="absolute inset-0 inline-flex items-center justify-center"
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </motion.span>
    </Button>
  );
}
