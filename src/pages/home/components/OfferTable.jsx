import React from "react";
// components
import DataTable from "../../../components/data-table/DataTable";
// mui
import { Stack, Typography } from "@mui/material";
// cols
import { offerManagementCols } from "../offerManagementCols";

const OfferTable = () => {
  return (
    <Stack
      sx={{
        backgroundColor: "#fff",
        p: "1rem",
        borderRadius: "12px",
        flex: "2",
      }}
    >
      <Typography fontSize="24px" color="#2B3674" fontWeight="600">
        Offer Management
      </Typography>
      <DataTable cols={offerManagementCols} rows={rows} />
    </Stack>
  );
};

export default OfferTable;

const rows = [
  {
    id: "1",
    trip_name: "first trip",
    offer_percentage: "22",
    guests_number: "9",
    created_at: "1/1/2020",
  },
  {
    id: "12",
    trip_name: "second trip",
    offer_percentage: "32",
    guests_number: "9",
    created_at: "1/1/2020",
  },
  {
    id: "13",
    trip_name: "third trip",
    offer_percentage: "22",
    guests_number: "9",
    created_at: "1/1/2020",
  },
  {
    id: "213",
    trip_name: "third trip",
    offer_percentage: "22",
    guests_number: "9",
    created_at: "1/1/2020",
  },
  {
    id: "143",
    trip_name: "third trip",
    offer_percentage: "22",
    guests_number: "9",
    created_at: "1/1/2020",
  },
];
