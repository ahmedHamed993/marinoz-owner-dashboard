import { useState } from "react";
// mui
import { IconButton, Menu, MenuItem } from "@mui/material";
// icons
import { HiDotsHorizontal } from "react-icons/hi";

const ButtonMenuActions = ({
  editAction,
  deleteAction,
  disabled,
  children,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        id="positioned-button"
        aria-controls={open ? "positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        // disabled={disabled}
      >
        <HiDotsHorizontal />
      </IconButton>
      <Menu
        id="positioned-menu"
        aria-labelledby="positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          color: "primary.main",
        }}
      >
        <MenuItem
          onClick={() => {
            editAction();
            handleClose();
          }}
          disabled={disabled}
          sx={{ color: "rgba(var(--primary-color), 1)" }}
        >
          Edit {disabled}
        </MenuItem>
        {children}
        <MenuItem
          onClick={() => {
            deleteAction();
            handleClose();
          }}
          sx={{ color: "rgba(var(--alert), 1)" }}
          disabled={disabled}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default ButtonMenuActions;
