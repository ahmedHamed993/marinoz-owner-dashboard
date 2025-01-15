import React from "react";
import DataTable from "../../../components/data-table/DataTable";
import { Stack, Typography } from "@mui/material";
import RequestTourAction from "./RequestTourAction";
import StatusChip from "../../../components/status-chip/StatusChip";

const ToursRequestsTable = () => {
  return (
    <Stack sx={{ backgroundColor: "#fff", padding: "24px" }}>
      <Typography fontSize="24px" color="#2B3674" fontWeight="600" mb="16px">
        Tours Requests List
      </Typography>
      <DataTable rows={rows} cols={cols} />
    </Stack>
  );
};

export default ToursRequestsTable;

const cols = [
  {
    label: "No",
    dataKey: "tour_number",
  },
  {
    label: "ID",
    dataKey: "id",
  },
  {
    label: "Date",
    dataKey: "created_at",
  },
  {
    label: "Customer Name",
    dataKey: "customer_name",
  },
  {
    label: "Location",
    dataKey: "location",
  },
  {
    label: "Amount",
    dataKey: "amount",
  },
  {
    label: "Request Status",
    dataKey: "request_status",
    renderCell: (row) => <StatusChip value={row?.request_status} />,
  },
  {
    label: "Actions",
    dataKey: "actions",
    renderCell: (row) => <RequestTourAction requestId={row?.id} />,
  },
];

const rows = [
  {
    tour_number: "1",
    id: "123",
    created_at: "1/1/2020",
    customer_name: "Customer Name",
    location: "9 maadi, cairo",
    amount: "2999",
    request_status: "confirmed",
  },
];
