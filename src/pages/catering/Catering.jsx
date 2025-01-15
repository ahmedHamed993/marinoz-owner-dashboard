import React from "react";
// router
import { Link, useParams, useSearchParams } from "react-router";
// fetch
import { gql, useQuery } from "@apollo/client";
import { cateringQueries } from "./cateringQueries";
// components
import AddIconButton from "../../components/buttons/AddIconButton";
import DataTable from "../../components/data-table/DataTable";
import StatusChip from "../../components/status-chip/StatusChip";
import CateringActions from "./components/CateringActions";
// mui
import { Stack, Typography } from "@mui/material";

const DATA_ACCESS_KEY = {
  tour_id:"tour_caterings",
  rental_id:"rental_caterings",
  event_id:"event_caterings",
  suite_id:"suite_caterings",
}

const Catering = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const value = searchParams.get("value");
  const queryKey = searchParams.get("queryKey");
  const { data, loading, error } = useQuery(cateringQueries[queryKey], {
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
      <Typography variant="h5">Caterings</Typography>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <AddIconButton
          path={`/catering/add?key=${key}&value=${value}&queryKey=${queryKey}`}
        />
      </Stack>
      <DataTable
        rows={data?.[DATA_ACCESS_KEY[key]] || []}
        cols={cols}
      />
    </Stack>
  );
};

export default Catering;

const cols = [
  {
    label: "ID",
    dataKey: "id",
  },
  {
    label: "Catring Title",
    dataKey: "catering.title",
    renderCell: (row) => <span>{row?.catering?.title || "_"}</span>,
  },
  {
    label: "Catring Price",
    dataKey: "catering.price",
    renderCell: (row) => <span>{row?.catering?.price || "_"}</span>,
  },
  {
    label: "Actions",
    dataKey: "actions",
    renderCell: (row) => <CateringActions cateringId={row?.id} />,
  },
];
