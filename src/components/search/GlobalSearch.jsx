import React from "react";
// mui
import { Stack } from "@mui/material";
// styles
import styles from "./GlobalSearch.module.css";
// icons
import { RiSearchLine } from "react-icons/ri";

const GlobalSearch = () => {
  return (
    <div className={styles.global_search}>
      <RiSearchLine size={16} />
      <input type="text" />
    </div>
  );
};

export default GlobalSearch;
