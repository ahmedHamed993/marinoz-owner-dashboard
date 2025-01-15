import React from "react";
// mui
import { Stack, Button } from "@mui/material";

const TabsFilter = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <Stack
      direction="row"
      gap="8px"
      sx={{
        backgroundColor: "rgba(var(--primary-color),.1)",
        width: "fit-content",
        padding: "12px",
        borderRadius: "12px",
      }}
    >
      {tabs.map((tab) => (
        <Button
          variant={activeTab === tab.value ? "contained" : "text"}
          sx={{
            color: activeTab === tab.value ? "#fff" : "rgb(var(--primary))",
          }}
          onClick={() => setActiveTab(tab.value)}
          disableElevation
          disabledRipple
          disableTouchRipple
          disableFocusRipple
        >
          {tab.label}
        </Button>
      ))}
    </Stack>
  );
};

export default TabsFilter;
