import React from "react";
import styles from "./Sidebar.module.css";
const SidebarLogo = () => {
  return (
    <img
      src="/images/logo.svg"
      style={{ margin: "auto", display: "block", marginBottom: "32px" }}
      className={styles?.sidebar__logo}
    />
  );
};

export default SidebarLogo;
