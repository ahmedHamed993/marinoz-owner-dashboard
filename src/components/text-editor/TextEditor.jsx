import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ label, value, onChange, errorMsg }) => {
  return (
    <Stack
      sx={{
        backgoroundColor: "#fff",
        color: "rgb(var(--primary-color))",
        fontSize: "14px",
        display: "block",
        textTransform: "capitalize",
        fontWeight: "700",
        marginBottom: "8px",
      }}
    >
      <Typography variant="h6">{label}</Typography>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        style={{ backgroundColor: "#fff", borderRadius: "8px" }}
      />
      <Typography sx={{ fontSize: "12px" }} color="error">
        {errorMsg}
      </Typography>
    </Stack>
  );
};

export default TextEditor;
