import React from "react";
import styles from "./InputField.module.css";
import { TextField } from "@mui/material";

const InputField = ({
  label,
  errorMsg = "",
  type = "text",
  register = {},
  multiline,
  onChange,
  rows,
  moreSx,
}) => {
  return (
    <div className={styles.input_field}>
      <label>{label}</label>
      <TextField
        type={type}
        placeholder={label}
        sx={{ backgroundColor: "#fff", width: "100%", ...moreSx }}
        error={!!errorMsg}
        // helperText={errorMsg}
        {...register}
        onChange={onChange ? onChange : register.onChange}
        multiline={multiline}
        rows={rows}
      />
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
    </div>
  );
};

export default InputField;
