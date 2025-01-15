import React, { useState } from "react";
import {useSelector} from "react-redux";
// mui
import { MenuItem, Select, Stack } from "@mui/material";
// components
import StatisticsCard from "../../components/statistics-card/StatisticsCard";
import TabsFilter from "../../components/tabs-filter/TabsFilter";
import AddIconButton from "../../components/buttons/AddIconButton";
import RentalActions from "./components/RentalActions";
import DataTable from "../../components/data-table/DataTable";
import StatusChip from "../../components/status-chip/StatusChip";
// fetch
import { GET_RENTALS } from "./rentalQueries";
import { useQuery } from "@apollo/client";

const Rental = () => {
  const userData = useSelector((state) => state?.user?.userData);
  const { data, loading, error } = useQuery(GET_RENTALS,{
    variables:{
      ownerId:userData?.id
    }
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error?.message}</p>;
  return (
    <Stack gap="24px">
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <AddIconButton path="/rental/add" />
      </Stack>
      <DataTable rows={data?.rentals} cols={cols} />
    </Stack>
  );
};

export default Rental;

const cols = [
  {
    label: "ID",
    dataKey: "id",
    // width:"200px",
  },
  {
    label: "Tour Name",
    dataKey: "name",
    // width:"400px",
  },
  {
    label: "Description",
    dataKey: "description",
    width:"400px",
  },
  {
    label: "Status",
    dataKey: "status",
    renderCell: (row) => <StatusChip value={row?.status} />,
    // width:"200px",
  },
  {
    label: "Actions",
    dataKey: "actions",
    renderCell: (row) => {
      return <RentalActions rentalId={row?.id} />;
    },
  },
];
