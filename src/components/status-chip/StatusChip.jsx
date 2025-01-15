import React from "react";
import { Stack, Typography } from "@mui/material";
const StatusChip = ({ value }) => {
  const Chip = ({ color }) => (
    <Stack
      direction="row"
      gap="4px"
      alignItems="center"
      sx={{
        backgroundColor: `rgba(var(--${color}), .1)`,
        width: "fit-content",
        padding: " 12px",
        borderRadius: "16px",
      }}
    >
      <Stack
        width="8px"
        height="8px"
        sx={{
          backgroundColor: `rgba(var(--${color}), 1)`,
          borderRadius: "50%",
        }}
      />
      <Typography
        fontSize="14px"
        sx={{ color: `rgba(var(--${color}), 1)`, textTransform: "capitalize" }}
      >
        {value}
      </Typography>
    </Stack>
  );
  switch (value?.toLowerCase()) {
    case "pending":
      return <Chip color={"pending"} />;
    case "paid":
      return <Chip color={"success"} />;
    case "done":
      return <Chip color={"primary-color"} />;
    case "on_progress":
      return <Chip color={"success"} />;
    default:
      return <Chip color="primary-color" />;
      break;
  }
};

export default StatusChip;
