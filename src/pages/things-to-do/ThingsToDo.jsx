import React from "react";
// router
import { Link, useParams, useSearchParams } from "react-router";
// fetch
import { gql, useQuery } from "@apollo/client";
import { thingsToDoQueries } from "./thingsToDoQueries";
// components
import AddIconButton from "../../components/buttons/AddIconButton";
import DataTable from "../../components/data-table/DataTable";
import StatusChip from "../../components/status-chip/StatusChip";
// mui
import { Stack, Typography } from "@mui/material";
import ThingsToDoActions from "./components/ThingsToDoActions";

const DATA_ACCESS_KEY = {
  tour_id:"tour_thing_to_dos",
  rental_id:"rental_thing_to_dos",
  event_id:"event_thing_to_dos",
  suite_id:"suite_thing_to_dos",
}

const ThingsToDo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const value = searchParams.get("value");
  const queryKey = searchParams.get("queryKey");

  const { data, loading, error } = useQuery(thingsToDoQueries[queryKey], {
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
      <Typography variant="h5">Things To Do</Typography>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <AddIconButton
          path={`/things-to-do/add?key=${key}&value=${value}&queryKey=${queryKey}`}
        />
      </Stack>
      <DataTable
        rows={data?.[DATA_ACCESS_KEY[key]] || []}
        cols={cols}
      />
    </Stack>
  );
};

export default ThingsToDo;

const cols = [
  {
    label: "ID",
    dataKey: "id",
  },
  {
    label: "Title",
    dataKey: "thing_to_dos.title",
    renderCell: (row) => <span>{row?.thing_to_do?.title}</span>,
  },
  {
    label: "Price",
    dataKey: "thing_to_dos.price",
    renderCell: (row) => <span>{row?.thing_to_do?.price}</span>,
  },
  {
    label: "Actions",
    dataKey: "actions",
    renderCell: (row) => <ThingsToDoActions thingId={row?.id} />,
  },
];
