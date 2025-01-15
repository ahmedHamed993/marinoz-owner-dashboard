import React from "react";
import DatePicker from "react-multi-date-picker";
import styles from "./InputField.module.css";
const InputMultiDate = ({ label, value, onChange, errorMsg }) => {
  return (
    <div className={styles.input_field}>
      <label>{label}</label>
      <DatePicker
        multiple
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          minWidth: "100%",
          height: "50px",
          display: "block",
          border: " 1px solid rgb(var(--light-gray))",
          color: "1px solid rgb(var(--mid-gray))",
        }}
      />
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
    </div>
  );
};

export default InputMultiDate;
