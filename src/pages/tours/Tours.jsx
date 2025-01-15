import React, { useState } from "react";
import {useSelector} from "react-redux"
// mui
import { Stack } from "@mui/material";
// components
import AddIconButton from "../../components/buttons/AddIconButton";
import DataTable from "../../components/data-table/DataTable";
import StatusChip from "../../components/status-chip/StatusChip";
import ToursActions from "./components/ToursActions";
// fetch
import { useQuery } from "@apollo/client";
import { GET_TOURS } from "./queries";
import { Link } from "react-router";
const Tours = () => {
  const userData = useSelector((state) => state?.user?.userData);

  const { data, loading, error } = useQuery(GET_TOURS,{
    variables:{
      ownerId:userData?.id
    }
  });
  if (loading) return <p>loading...</p>;
  if (error) return <p>{error?.message}</p>;

  return (
    <Stack gap="24px">
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <AddIconButton path="/tours/add" />
      </Stack>
      <DataTable rows={data?.tours} cols={cols} />
    </Stack>
  );
};

export default Tours;

const cols = [
  {
    label: "ID",
    dataKey: "id",
    width:"200px",
  },
  {
    label: "Tour Name",
    dataKey: "name",
  },
  // {
  //   label: "Description",
  //   dataKey: "description",
  // },
  {
    label: "Status",
    dataKey: "status",
    renderCell: (row) => <StatusChip value={row?.status} />,
  },
  {
    label: "Actions",
    dataKey: "actions",
    renderCell: (row) => {
      return <ToursActions tourId={row?.id} />;
    },
  },
];
