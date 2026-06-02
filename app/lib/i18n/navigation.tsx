// Locale-aware <Link>, useLocaleNavigate(), useLocalePathname().
// These wrap react-router's primitives and prepend the active locale's URL
// prefix when needed. They are the only place that knows about the `/zh` URL
// segment — every other module imports from `@/lib/i18n/navigation` instead
// of `react-router` directly when locale awareness is required.

import { useMemo, useCallback, type AnchorHTMLAttributes } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  type LinkProps,
  type NavigateOptions,
} from "react-router";
import { useLocale } from "./use-locale";
import { parseLocaleFromPathname, type Locale } from "./config";

/** Add `/zh` prefix when the active locale is `zh` and the path is not already prefixed. */
export function withLocalePrefix(path: string, locale: Locale): string {
  if (locale !== "zh") return path;
  if (path.startsWith("/zh")) return path;
  if (path === "/") return "/zh";
  return `/zh${path.startsWith("/") ? path : `/${path}`}`;
}

/** Strip a leading `/zh` segment if present, for displaying "logical" paths. */
export function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(/^\/zh(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped || "/";
}

/**
 * Drop-in replacement for `<Link to>` that auto-prefixes the active locale.
 * Pass `locale` to force a specific locale's URL regardless of the active one
 * (used by the language switcher).
 */
export function LocaleLink({
  to,
  locale: forcedLocale,
  ...rest
}: LinkProps & { locale?: Locale } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>) {
  const active = useLocale();
  const target = withLocalePrefix(typeof to === "string" ? to : to.pathname ?? "/", forcedLocale ?? active);
  return <Link to={target} {...rest} />;
}

/** Locale-aware wrapper around react-router's `useNavigate`. */
export function useLocaleNavigate() {
  const navigate = useNavigate();
  const active = useLocale();
  return useCallback(
    (to: string, options?: NavigateOptions & { locale?: Locale }) => {
      const target = withLocalePrefix(to, options?.locale ?? active);
      return navigate(target, options);
    },
    [navigate, active],
  );
}

/** Returns the pathname with the active locale prefix stripped (the "logical" path). */
export function useLocalePathname(): string {
  const { pathname } = useLocation();
  return useMemo(() => stripLocalePrefix(pathname), [pathname]);
}

/** Returns the active locale parsed from the current URL (client-only). */
export function useActiveLocale(): Locale {
  const { pathname } = useLocation();
  return parseLocaleFromPathname(pathname);
}
