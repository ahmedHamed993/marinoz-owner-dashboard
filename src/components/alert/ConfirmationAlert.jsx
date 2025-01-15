import React from "react";
// mui
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";
const ConfirmationAlert = ({
  open,
  setOpen,
  dialogTitle,
  dialgoMessage,
  confirmFn,
}) => {
  const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <Divider flexItem />
      <DialogContent sx={{ minWidth: "500px" }}>{dialgoMessage}</DialogContent>
      <Divider flexItem />
      <DialogActions>
        <Button
          variant="contained"
          sx={{
            color: "white",
            "&:hover": { backgroundColor: "primary.main" },
          }}
          onClick={confirmFn}
        >
          Yes
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationAlert;
