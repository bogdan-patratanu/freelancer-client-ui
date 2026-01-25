import { LoadingIndicator, LocalesMenuButton } from "react-admin";
import { TasksCount } from "./TasksCount";

import { ThemeSwapper } from "../themes/ThemeSwapper";

const AppBarToolbar = () => (
  <>
    <TasksCount />
    <LocalesMenuButton />
    <ThemeSwapper />
    <LoadingIndicator />
  </>
);

export default AppBarToolbar;
