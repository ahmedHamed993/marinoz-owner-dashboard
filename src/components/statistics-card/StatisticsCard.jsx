import { Stack, Typography } from "@mui/material";
import React from "react";

const StatisticsCard = ({ label, value, hint, icon }) => {
  return (
    <Stack
      sx={{ backgroundColor: "#fff", borderRadius: "20px", minWidth: "210px" }}
      direction="row"
      alignItems="center"
      padding="16px"
      gap="16px"
      flex="1"
    >
      {icon ? (
        <Stack
          sx={{
            backgroundColor: "rgba(var(--primary-color),.09)",
            color: "rgb(var(--primary-color))",
            width: "56px",
            height: "56px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
          }}
        >
          {icon}
        </Stack>
      ) : null}
      <Stack>
        <Typography fontSize="14px" color="#a3aed0">
          {label}
        </Typography>
        <Typography fontSize="24px" color="#2B3674" fontWeight="bold">
          {value}
        </Typography>
        {hint ? hint : null}
      </Stack>
    </Stack>
  );
};

export default StatisticsCard;
