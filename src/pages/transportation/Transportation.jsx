import React from "react";
// router
import { Link, useParams, useSearchParams } from "react-router";
// fetch
import { gql, useQuery } from "@apollo/client";
import { transportationQueries } from "./transportationQueries";
// components
import AddIconButton from "../../components/buttons/AddIconButton";
import DataTable from "../../components/data-table/DataTable";
// mui
import { Stack, Typography } from "@mui/material";
import TransportationActions from "./components/TransportationActions";

const DATA_ACCESS_KEY = {
  tour_id:"tour_transportations",
  rental_id:"rental_transportations",
  event_id:"event_transportations",
  suite_id:"suite_transportations",
}

const Transportation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const value = searchParams.get("value");
  const queryKey = searchParams.get("queryKey");
  const { data, loading, error } = useQuery(transportationQueries[queryKey], {
    variables: {
      id: value,
    },
  });
  if (!key || !value || !queryKey) {
    return <p>Invalid URL</p>;
  }
  if (loading) return <p>loading...</p>;
  if (error) return <p>{error?.message}</p>;
  return (
    <Stack gap="24px">
      <Typography variant="h5">Transportion</Typography>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <AddIconButton
          path={`/transportation/add?key=${key}&value=${value}&queryKey=${queryKey}`}
        />
      </Stack>
      <DataTable
        rows={data?.[DATA_ACCESS_KEY[key]] || []}
        cols={cols}
      />
    </Stack>
  );
};

export default Transportation;

const cols = [
  {
    label: "ID",
    dataKey: "id",
  },
  {
    label: "Catring Title",
    dataKey: "transportation.title",
    renderCell: (row) => <span>{row?.transportation?.title}</span>,
  },
  {
    label: "Catring Price",
    dataKey: "transportation.price",
    renderCell: (row) => <span>{row?.transportation?.price}</span>,
  },
  {
    label: "Actions",
    dataKey: "actions",
    renderCell: (row) => <TransportationActions transportationId={row?.id} />,
  },
];
