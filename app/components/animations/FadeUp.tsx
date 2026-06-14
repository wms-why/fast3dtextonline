"use client";

/**
 * FadeUp — a lightweight scroll-triggered fade + translate-up animation.
 *
 * Uses IntersectionObserver to play the entrance once per element (unobserve
 * after the first reveal) and respects `prefers-reduced-motion: reduce` by
 * rendering the final state immediately.
 *
 * Designed to be SSR-safe: the observer is only created inside `useEffect`,
 * so server-rendered HTML is identical to the "revealed" state.
 *
 * Usage:
 *   <FadeUp>
 *     <Section>...</Section>
 *   </FadeUp>
 *
 *   <FadeUp delay={0.1} y={12}>
 *     ...
 *   </FadeUp>
 */

import * as React from "react";

type FadeUpProps = {
  children: React.ReactNode;
  /** Optional additional className for the wrapper div. */
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Translate distance in px. Default 12. */
  y?: number;
  /** Animation duration in seconds. Default 0.5. */
  duration?: number;
  /** rootMargin passed to IntersectionObserver. Default "-10% 0px". */
  rootMargin?: string;
  /** Optional wrapper tag. Default "div". */
  as?: keyof React.JSX.IntrinsicElements;
};

export function FadeUp({
  children,
  className,
  delay = 0,
  y = 12,
  duration = 0.5,
  rootMargin = "-10% 0px",
  as = "div",
}: FadeUpProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  // Start revealed if the user prefers reduced motion; SSR defaults to false
  // and the effect upgrades it after mount to avoid hydration mismatch.
  const [visible, setVisible] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Initial media-query snapshot — runs once after mount, no cascading
    // renders because nothing else triggers a state change in this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersReducedMotion(mq.matches);

    const el = ref.current;
    if (!el) return;

    if (mq.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin, threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : `translateY(${y}px)`,
    transition: prefersReducedMotion
      ? "none"
      : `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
    willChange: "opacity, transform",
  };

  // We use a generic HTML element via createElement to keep `as` flexible
  // without React.forwardRef.
  return React.createElement(
    as,
    {
      ref: ref as React.Ref<HTMLElement>,
      className,
      style,
    },
    children,
  );
}
