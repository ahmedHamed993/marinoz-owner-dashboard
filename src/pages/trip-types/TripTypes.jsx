import React from "react";
// router
import { Link, useParams, useSearchParams } from "react-router";
// fetch
import { gql, useQuery } from "@apollo/client";
import { tripTypesQueries } from "./tripTypesQueries";
// components
import AddIconButton from "../../components/buttons/AddIconButton";
import DataTable from "../../components/data-table/DataTable";
import StatusChip from "../../components/status-chip/StatusChip";
import TripTypesActions from "./components/TripTypesActions";
// mui
import { Stack, Typography } from "@mui/material";

const DATA_ACCESS_KEY = {
  tour_id:"tour_trip_types",
  rental_id:"rental_trip_types",
  event_id:"event_trip_types",
  suite_id:"suite_trip_types",
}

const TripTypes = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const key = searchParams.get("key");
  const value = searchParams.get("value");
  const queryKey = searchParams.get("queryKey");

  const { data, loading, error } = useQuery(tripTypesQueries[queryKey], {
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
      <Typography variant="h5">Trip Types</Typography>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <AddIconButton
          path={`/trip-types/add?key=${key}&value=${value}&queryKey=${queryKey}`}
        />
      </Stack>
      <DataTable
        rows={data?.[DATA_ACCESS_KEY[key]] || []}
        cols={cols}
      />
    </Stack>
  );
};

export default TripTypes;
const cols = [
  {
    label: "ID",
    dataKey: "id",
  },
  {
    label: "Title",
    dataKey: "trip_type.title",
    renderCell: (row) => <span>{row?.trip_type?.title}</span>,
  },
  {
    label: "Catring Price",
    dataKey: "trip_type.price",
    renderCell: (row) => <span>{row?.trip_type?.price}</span>,
  },
  {
    label: "Actions",
    dataKey: "actions",
    renderCell: (row) => <TripTypesActions typeId={row?.id} />,
  },
];
