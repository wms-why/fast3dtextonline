// LocaleLayout: the I18nProvider is already mounted in `root.tsx` (so Header
// and Footer can call useTranslations). This layout just renders the Outlet
// — its main job is to host the locale layout in the future (e.g. locale-
// specific <head> tags, region overrides, etc.).

import { Outlet } from "react-router";

export default function LocaleLayout() {
  return <Outlet />;
}
