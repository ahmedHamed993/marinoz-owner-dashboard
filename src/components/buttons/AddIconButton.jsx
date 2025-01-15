import React from "react";
import { Link } from "react-router";
import { IconButton } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
const AddIconButton = ({ path }) => {
  return (
    <IconButton
      component={Link}
      to={path}
      sx={{
        borderRadius: "8px",
        width: "40px",
        height: "40px",
        backgroundColor: "rgb(var(--primary-color))",
        color: "#fff",
      }}
    >
      <FaPlus size={24} />
    </IconButton>
  );
};

export default AddIconButton;
