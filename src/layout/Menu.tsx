import * as React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import BidsIcon from "@mui/icons-material/Adb";
import ProjectsIcon from "@mui/icons-material/FactCheck";
import NewProjectsIcon from "@mui/icons-material/PendingActions";
import EndingProjectsIcon from "@mui/icons-material/Surfing";
import {
  useTranslate,
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useSidebarState,
} from "react-admin";
import clsx from "clsx";

import SubMenu from "./SubMenu";

type MenuName = "menuProjects" | "menuInTheFuture";

const Menu = ({ dense = false }: MenuProps) => {
  const [state, setState] = useState({
    menuProjects: true,
    menuInTheFuture: true,
  });
  const translate = useTranslate();
  const [open] = useSidebarState();

  const handleToggle = (menu: MenuName) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <Box
      sx={{
        width: open ? 200 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
      className={clsx({
        "RaMenu-open": open,
        "RaMenu-closed": !open,
      })}
    >
      <DashboardMenuItem />
      {/* <SubMenu
        handleToggle={() => handleToggle("menuProjects")}
        isOpen={state.menuProjects}
        name="resources.projects.name"
        icon={<ProjectsIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/projects/ending"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.projects.ending`, {
            smart_count: 2,
          })}
          leftIcon={<EndingProjectsIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/projects/new"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.projects.new`, {
            smart_count: 2,
          })}
          leftIcon={<NewProjectsIcon />}
          dense={dense}
        />
      </SubMenu> */}

      <MenuItemLink
        to="/projects"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.projects.name`, {
          smart_count: 2,
        })}
        leftIcon={<ProjectsIcon />}
        dense={dense}
      />
      <MenuItemLink
        to="/notifications"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.notifications.name`, {
          smart_count: 2,
        })}
        leftIcon={<BidsIcon />}
        dense={dense}
      />
    </Box>
  );
};

export default Menu;
