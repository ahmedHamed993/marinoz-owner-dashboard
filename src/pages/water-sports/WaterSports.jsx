import React from "react";
// router
import { Link, useParams, useSearchParams } from "react-router";
// fetch
import { gql, useQuery } from "@apollo/client";
import { waterSportsQueries } from "./waterSportsQueries";
// components
import AddIconButton from "../../components/buttons/AddIconButton";
import DataTable from "../../components/data-table/DataTable";
import WaterSportsActions from "./components/WaterSportsActions";
// mui
import { Stack, Typography } from "@mui/material";

const DATA_ACCESS_KEY = {
  tour_id:"tour_water_sports",
  rental_id:"rental_water_sports",
  event_id:"event_water_sports",
  suite_id:"suite_water_sports",
}

const WaterSports = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const value = searchParams.get("value");
  const queryKey = searchParams.get("queryKey");
  const { data, loading, error } = useQuery(waterSportsQueries[queryKey], {
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
      <Typography variant="h5">Water Sports</Typography>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <AddIconButton
          path={`/water-sports/add?key=${key}&value=${value}&queryKey=${queryKey}`}
        />
      </Stack>
      <DataTable
        rows={data?.[DATA_ACCESS_KEY[key]] || []}
        cols={cols}
      />
    </Stack>
  );
};

export default WaterSports;
const cols = [
  {
    label: "ID",
    dataKey: "id",
  },
  {
    label: "Title",
    dataKey: "water_sport.title",
    renderCell: (row) => <span>{row?.water_sport?.title}</span>,
  },
  {
    label: "Catring Price",
    dataKey: "water_sport.price",
    renderCell: (row) => <span>{row?.water_sport?.price}</span>,
  },
  {
    label: "Actions",
    dataKey: "actions",
    renderCell: (row) => <WaterSportsActions sportId={row?.id} />,
  },
];
