// Step 1 scaffold: minimal layout that just renders the outlet.
// Step 2 will wrap children in <I18nProvider>.

import { Outlet } from "react-router";

export default function LocaleLayout() {
  return <Outlet />;
}
