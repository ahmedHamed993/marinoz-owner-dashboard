import React, { useState } from "react";
// mui
import { Stack, Typography } from "@mui/material";
// components
import AddIconButton from "../../components/buttons/AddIconButton";
import DataTable from "../../components/data-table/DataTable";
import StatusChip from "../../components/status-chip/StatusChip";
// import ToursActions from "./components/ToursActions";
// fetch
import { useQuery } from "@apollo/client";
import { Link, useSearchParams } from "react-router";
import { GET_YACHT_RESALES } from './queries'
import YachtResaleActions from "./components/YachtResaleActions";

const YachtResales = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const yachtId = searchParams.get("yachtId")
  const { data, loading, error } = useQuery(GET_YACHT_RESALES,{
    variables:{
      id:yachtId
    }
  });
  if (loading) return <p>loading...</p>;
  if (error) return <p>{error?.message}</p>;
  console.log("yacht resales data",data)
  return (
    <Stack gap="24px">
      <Typography variant='h5'>Yacht Resale</Typography>

      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <AddIconButton path={`/yacht-resales/add?yachtId=${yachtId}`} />
      </Stack>
        <DataTable rows={data?.resales} cols={cols} />
    </Stack>
  );
}

export default YachtResales;

const cols = [
  {
    label: "ID",
    dataKey: "id",
  },
  {
    label:"Selling Price",
    dataKey:"selling_price"
  },
  {
    label:"Speed",
    dataKey:"speed"
  },
  {
    label:"Max Speed",
    dataKey:"max_speed"
  },
  {
    label:"Fuel Tank",
    dataKey:"fuel_tank"
  },
  {
    label:"Fuel Consumption",
    dataKey:"fuel_consumption"
  },
  {
    label: "Actions",
    dataKey: "actions",
    renderCell: (row) => {
      return <YachtResaleActions resaleId={row?.id} />;
    },
  },
];
