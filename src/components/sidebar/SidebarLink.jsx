import React from "react";
// import { Link } from 'react-router'
import { NavLink } from "react-router";
// styles
import styles from "./Sidebar.module.css";
import { Tooltip } from "@mui/material";
const SidebarLink = ({ link }) => {
  return (
    <Tooltip title={link.label} placement="right">
    <li key={link.path}>
      <NavLink
        to={link.path}
        className={({ isActive }) =>
          isActive
            ? `${styles.sidebar_link} ${styles.sidebar_link_active}`
            : `${styles.sidebar_link}`
        }
      >
        {link.icon}
        <span>{link.label}</span>
      </NavLink>
    </li>
    </Tooltip>
  );
};

export default SidebarLink;
