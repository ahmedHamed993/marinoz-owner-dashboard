import React from "react";
// router
import { Link } from "react-router";
// Buton
import { Button } from "@mui/material";
import { FiPlusCircle } from "react-icons/fi";
const AddButton = ({ label, to }) => {
  return (
    <Button
      variant="contained"
      sx={{
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        backgroundColor: "#48BCD4",
        color: "#fff",
        fontSize: "14px",
      }}
      component={Link}
      to={to}
    >
      <FiPlusCircle size={16} />
      {label}
    </Button>
  );
};

export default AddButton;
