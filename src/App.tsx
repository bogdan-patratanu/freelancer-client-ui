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
import NewProjectsPage from './pages/projects/new';
import Layout from "./layout/Layout";
import Login from "./layout/Login";
import EndingProjectsPage from "./pages/projects/ending";

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
      {/* <Resource
        icon={ArticleIcon}
        name="posts"
        list={PostList}
        show={PostShow}
        edit={PostEdit}
        create={PostCreate}
      />
      <Resource
        icon={Person}
        name="users"
        list={UserList}
        show={ShowGuesser}
        edit={EditGuesser}
      /> */}
      <CustomRoutes>
        <Route path="/projects/new" element={<NewProjectsPage />} />
        <Route path="/projects/ending" element={<EndingProjectsPage />} />
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
