import React from "react";
// router
import { Link, useParams, useSearchParams } from "react-router";
// fetch
import { gql, useQuery } from "@apollo/client";
import { marineAttractionsQueries } from "./marineAttractionsQueries";
// components
import AddIconButton from "../../components/buttons/AddIconButton";
import DataTable from "../../components/data-table/DataTable";
// mui
import { Stack, Typography } from "@mui/material";
import MarineAttractionsActions from "./components/MarineAttractionsActions";
const DATA_ACCESS_KEY = {
  tour_id:"tour_marine_attractions",
  rental_id:"rental_marine_attractions",
  event_id:"event_marine_attractions",
  suite_id:"suite_marine_attractions",
}

const MarineAttractions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const value = searchParams.get("value");
  const queryKey = searchParams.get("queryKey");
  const { data, loading, error } = useQuery(
    marineAttractionsQueries[queryKey],
    {
      variables: {
        id: value,
      },
    },
  );
  if (!key || !value || !queryKey) {
    return <p>Invalid URL</p>;
  }
  if (loading) return <p>loading...</p>;
  if (error) return <p>{error?.message}</p>;
  return (
    <Stack gap="24px">
      <Typography variant="h5">Marine Attractions</Typography>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <AddIconButton
          path={`/marine-attractions/add?key=${key}&value=${value}&queryKey=${queryKey}`}
        />
      </Stack>
      <DataTable rows={ data?.[DATA_ACCESS_KEY[key]] || [] } cols={cols} />
    </Stack>
  );
};

export default MarineAttractions;
const cols = [
  {
    label: "ID",
    dataKey: "id",
  },
  {
    label: "Title",
    dataKey: "marine_attraction.title",
    renderCell: (row) => <span>{row?.marine_attraction?.title}</span>,
  },
  {
    label: "Catring Price",
    dataKey: "marine_attraction.price",
    renderCell: (row) => <span>{row?.marine_attraction?.price}</span>,
  },
  {
    label: "Actions",
    dataKey: "actions",
    renderCell: (row) => <MarineAttractionsActions attractionId={row?.id} />,
  },
];
