import React from "react";
// styles
import styles from "./Sidebar.module.css";
// utils
import { adminLinks } from "./links.jsx";
// components
import SidebarLink from "./SidebarLink";
import LogoutButton from "../buttons/LogoutButton.jsx";

const SidebarLinks = () => {
  return (
    <ul className={styles.sidebar_links}>
      {adminLinks.map((link) => (
        <SidebarLink link={link} key={link.path} />
      ))}
      <LogoutButton />
    </ul>
  );
};

export default SidebarLinks;
