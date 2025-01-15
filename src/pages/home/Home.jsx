import React from "react";
// componetns
import Statistics from "./components/Statistics";
// mui
import { Stack } from "@mui/material";
import OfferTable from "./components/OfferTable";
import WeeklyReportChart from "./components/WeeklyReportChart";
import RequestsChart from "./components/RequestsChart";
import ToursRequestsTable from "./components/ToursRequestsTable";

const Home = () => {
  return (
    <Stack gap="32px">
      <Statistics />
      <Stack direction="row" gap="16px">
        <OfferTable />
        <WeeklyReportChart />
        {/* <RequestsChart /> */}
      </Stack>
      <ToursRequestsTable />
    </Stack>
  );
};

export default Home;
