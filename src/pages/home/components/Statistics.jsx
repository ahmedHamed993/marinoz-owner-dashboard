import React from "react";
// componetns
import StatisticsCard from "../../../components/statistics-card/StatisticsCard";
// mui
import { Stack } from "@mui/material";
// icons
import { HiChartBar } from "react-icons/hi2";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdFileCopy } from "react-icons/md";

const Statistics = () => {
  const stats = {
    total_users: 1333,
    total_requests: 360,
    earnings: 1573.29,
    balance: 1000,
    new_requests: 154,
    total_trips: 234,
  };
  return (
    <Stack direction="row" gap="14px" flexWrap="wrap">
      <StatisticsCard
        label="No. of Users"
        value={stats.total_users}
        icon={<HiChartBar size={24} />}
      />
      <StatisticsCard
        label="Total Requests"
        value={stats.total_requests}
        icon={<BsCurrencyDollar size={24} />}
      />
      <StatisticsCard
        label="Earnings"
        value={`$${stats.earnings}`}
        hint={<p style={{ fontSize: "12px" }}>23% since last month</p>}
      />
      <StatisticsCard label="You Balance" value={stats.balance} />
      <StatisticsCard
        label="New Requests"
        value={stats.new_requests}
        icon={<IoMdCheckmarkCircleOutline size={24} />}
      />
      <StatisticsCard
        label="Total Trips"
        value={stats.total_trips}
        icon={<MdFileCopy size={24} />}
      />
    </Stack>
  );
};

export default Statistics;
