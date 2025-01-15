import React, { useState } from "react";
import {useSelector} from "react-redux";
// mui
import { MenuItem, Select, Stack } from "@mui/material";
// components
import AddIconButton from "../../components/buttons/AddIconButton";
import DataTable from "../../components/data-table/DataTable";
import StatusChip from "../../components/status-chip/StatusChip";
import EventActions from "./components/EventActions";
// fetch
// import { GET_RENTALS } from "./rentalQueries";
import { GET_EVENTS } from "./eventQueries";
import { useQuery } from "@apollo/client";

const Events = () => {
  const userData = useSelector((state) => state?.user?.userData);

  const { data, loading, error } = useQuery(GET_EVENTS,{
    variables:{
      ownerId:userData?.id
    }
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error?.message}</p>;
  return (
    <Stack gap="24px">
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <AddIconButton path="/events/add" />
      </Stack>

      <DataTable rows={data?.events ?? []} cols={cols} />
    </Stack>
  );
};

export default Events;

const cols = [
  {
    label: "ID",
    dataKey: "id",
    width:'300px'
  },
  {
    label: "Event Name",
    dataKey: "name",
    width:'300px'
  },
  {
    label: "Description",
    dataKey: "description",
    width:'300px'
  },
  {
    label: "Status",
    dataKey: "status",
    renderCell: (row) => <StatusChip value={row?.status} />,
  },
  {
    label: "Actions",
    dataKey: "actions",
    renderCell: (row) => {
      return <EventActions eventId={row?.id} />;
    },
  },
];
