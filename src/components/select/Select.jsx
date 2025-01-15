import React from "react";
import { Select as MuiSelect, Stack } from "@mui/material";
import styles from "./Select.module.css";
const Select = (props) => {
  const { label, ...rest } = props;
  return (
    <Stack className={styles.select_container}>
      <label>{label}</label>
      <MuiSelect {...rest}>{rest.children}</MuiSelect>
      {rest?.errorMsg && <p className={styles.error}>{props.errorMsg}</p>}
    </Stack>
  );
};

export default Select;
