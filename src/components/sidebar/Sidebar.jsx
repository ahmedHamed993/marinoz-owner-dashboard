import React from "react";
// styles
import styles from "./Sidebar.module.css";
import SidebarLogo from "./SidebarLogo";
import SidebarLinks from "./SidebarLinks";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <SidebarLogo />
      <SidebarLinks />
    </div>
  );
};

export default Sidebar;
