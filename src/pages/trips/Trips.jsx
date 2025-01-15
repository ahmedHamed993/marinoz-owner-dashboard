import React, { useState } from "react";
// mui
import { MenuItem, Select, Stack } from "@mui/material";
// components
import StatisticsCard from "../../components/statistics-card/StatisticsCard";
import TabsFilter from "../../components/tabs-filter/TabsFilter";
import AddIconButton from "../../components/buttons/AddIconButton";
import TripActions from "./components/TripActions";
import DataTable from "../../components/data-table/DataTable";
import StatusChip from "../../components/status-chip/StatusChip";
// icons
import { HiChartBar } from "react-icons/hi2";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Trips = () => {
  const [activeTab, setActiveTab] = useState("all");
  return (
    <Stack gap="24px">
      {/* stats  */}
      <Stack direction="row" gap="16px" flexWrap="wrap">
        <StatisticsCard
          label="Tours of the day"
          value="650"
          icon={<HiChartBar size={24} />}
        />
        <StatisticsCard
          label="Total Tours"
          value="$642"
          icon={<BsCurrencyDollar size={24} />}
        />
        <StatisticsCard
          label="Earnings"
          value={`$1000`}
          hint={<p style={{ fontSize: "12px" }}>23% since last month</p>}
        />
        <StatisticsCard label="Earning of last tour" value={"1000"} />
        <StatisticsCard
          label="Total Requests"
          value={"1938"}
          icon={<IoMdCheckmarkCircleOutline size={24} />}
        />
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TabsFilter
          tabs={[
            { label: "All", value: "all" },
            { label: "Pending", value: "pending" },
            { label: "Approved", value: "approved" },
            { label: "Rejected", value: "rejected" },
          ]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <AddIconButton path="/trips/add" />
      </Stack>
      <DataTable rows={rows} cols={cols} />
    </Stack>
  );
};

export default Trips;

const rows = [
  {
    id: "1123",
    tour_title: "title title",
    destination: "destination destination",
    tour_date: "2/2/2023",
    tour_status: "pending",
    guests_number: "3",
    activities: "2",
    total_price: "2345",
    payment_status: "paid",
  },
];

const cols = [
  {
    label: "ID",
    dataKey: "id",
  },
  {
    label: "Tour Title",
    dataKey: "tour_title",
  },
  {
    label: "Destination",
    dataKey: "destination",
  },
  {
    label: "Tour Date",
    dataKey: "tour_date",
  },
  {
    label: "Tour Status",
    dataKey: "tour_status",
    renderCell: (row) => <StatusChip value={row?.tour_status} />,
  },
  {
    label: "No. Of Guests",
    dataKey: "guests_number",
  },
  {
    label: "Activities",
    dataKey: "activities",
  },
  {
    label: "Total Price",
    dataKey: "total_price",
  },
  {
    label: "Actions",
    dataKey: "actions",
    renderCell: (row) => {
      return <TripActions tripId={row?.id} />;
    },
  },
];
