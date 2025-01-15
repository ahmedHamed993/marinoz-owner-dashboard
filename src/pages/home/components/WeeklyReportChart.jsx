import React from "react";
// mui
import { Stack, Typography } from "@mui/material";
import { BarChart, BarPlot } from "@mui/x-charts/BarChart";
import { ChartContainer } from "@mui/x-charts";

const WeeklyReportChart = () => {
  return (
    <Stack
      sx={{
        backgroundColor: "#fff",
        p: "1rem",
        borderRadius: "12px",
        flex: "1",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography variant="body2" sx={{ color: "rgb(var(--mid-gray))" }}>
            Weekly Report
          </Typography>
          <Typography
            variant="body2"
            fontSize="26px"
            fontWeight="bold"
            sx={{ color: "#2B3674" }}
          >
            2579{" "}
            <span
              style={{
                color: "rgb(var(--mig-gray))",
                fontWeight: "lighter",
                fontSize: "14px",
              }}
            >
              visitors
            </span>
          </Typography>
        </Stack>
        <Typography variant="body2" color="success">
          +2.5%
        </Typography>
      </Stack>
      <BarChart
        series={[{ data: [4, 3, 5, 9, 12, 1, 9] }]}
        height={200}
      ></BarChart>
    </Stack>
  );
};

export default WeeklyReportChart;
