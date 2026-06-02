// LocaleLayout: wraps every route in <I18nProvider> with the locale
// resolved from the current URL. The locale is parsed from `window.location`
// at hydration time (no server runtime to ask). Prerendered HTML has the
// correct locale baked in by the build-time walk.
//
// Step 4 will move the header/footer into here too. For now we just wire
// the provider so the rest of the app can call useTranslations / useLocale.

import { Outlet, useLocation } from "react-router";
import { I18nProvider } from "@/lib/i18n/provider";
import { parseLocaleFromPathname } from "@/lib/i18n/config";

export default function LocaleLayout() {
  const { pathname } = useLocation();
  const locale = parseLocaleFromPathname(pathname);
  return (
    <I18nProvider locale={locale}>
      <Outlet />
    </I18nProvider>
  );
}
