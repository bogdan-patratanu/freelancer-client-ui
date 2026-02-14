import {
  Admin,
  Resource,
  ShowGuesser,
  EditGuesser,
  StoreContextProvider,
  localStorageStore,
  useStore,
  CustomRoutes
} from "react-admin";
import { Route } from "react-router-dom";
import { dataProvider } from "./dataProvider";
import HomePage from "./pages/homePage";
import authProvider from "./authProvider";
import polyglotI18nProvider from "ra-i18n-polyglot";
import customEnglishMessages from "./translations/en";

import { themes, ThemeName } from "./themes/themes";
import Layout from "./layout/Layout";
import Login from "./layout/Login";
import EndingProjectsPage from "./pages/projects/ending";
import NotificationsPage from "./pages/notifications/page";
import AnalyticsPage from "./pages/analytics/page";

const localStorage = localStorageStore(undefined, "freelance-client");

const i18nProvider = polyglotI18nProvider(
  (locale) => {
    if (locale === "ro") {
      return import("./translations/ro").then((messages) => messages.default);
    }

    // Always fallback on english
    return customEnglishMessages;
  },
  "en",
  [
    { locale: "en", name: "English" },
    { locale: "ro", name: "Romana" },
  ],
);

const App = () => {
  const [themeName] = useStore<ThemeName>("themeName", "soft");
  const singleTheme = themes.find((theme) => theme.name === themeName)?.single;
  const lightTheme = themes.find((theme) => theme.name === themeName)?.light;
  const darkTheme = themes.find((theme) => theme.name === themeName)?.dark;

  return (
    <Admin
      title="Freelance projects"
      i18nProvider={i18nProvider}
      layout={Layout}
      dataProvider={dataProvider}
      dashboard={HomePage}
      authProvider={authProvider}
      theme={singleTheme}
      lightTheme={lightTheme}
      darkTheme={darkTheme}
      defaultTheme="light"
      loginPage={Login}
      disableTelemetry
    >
      <Resource name="projects" />
      <Resource name="notifications" />
      <Resource name="analytics" />
      <CustomRoutes>
        <Route path="/projects" element={<EndingProjectsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </CustomRoutes>
    </Admin>
  );
};

const AppWrapper = () => (
  <StoreContextProvider value={localStorage}>
    <App />
  </StoreContextProvider>
);

export default AppWrapper;
