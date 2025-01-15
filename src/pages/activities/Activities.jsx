import React from "react";
// router
import { Link, useParams, useSearchParams } from "react-router";
// fetch
import { gql, useQuery } from "@apollo/client";
import { activitiesQueries } from "./activitiesQueries";
// components
import AddIconButton from "../../components/buttons/AddIconButton";
import DataTable from "../../components/data-table/DataTable";
import ActivityActions from "./components/ActivityActions";
// mui
import { Stack, Typography } from "@mui/material";

const DATA_ACCESS_KEY = {
  tour_id:"tour_activities",
  rental_id:"rental_activities",
  event_id:"event_activities",
  suite_id:"suite_activities",
}

const Activities = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const value = searchParams.get("value");
  const queryKey = searchParams.get("queryKey");
  const { data, loading, error } = useQuery(activitiesQueries[queryKey], {
    variables: {
      id: value,
    },
  });
  if (!key || !value || !queryKey) {
    return <p>Invalid URL</p>;
  }
  if (loading) return <p>loading...</p>;
  if (error) return <p>{error?.message}</p>;
  console.log("data", data);
  return (
    <Stack gap="24px">
      <Typography variant="h5">Activities</Typography>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <AddIconButton
          path={`/activities/add?key=${key}&value=${value}&queryKey=${queryKey}`}
        />
      </Stack>
      <DataTable
        rows={data?.[DATA_ACCESS_KEY[key]] || []}
        cols={cols}
      />
    </Stack>
  );
};

export default Activities;

const cols = [
  {
    label: "ID",
    dataKey: "id",
  },
  {
    label: "Activity Title",
    dataKey: "activity.title",
    renderCell: (row) => <span>{row?.activity?.title}</span>,
  },
  {
    label: "Activity Price",
    dataKey: "activity.price",
    renderCell: (row) => <span>{row?.activity?.price}</span>,
  },
  {
    label: "Actions",
    dataKey: "actions",
    renderCell: (row) => <ActivityActions activityId={row?.id} />,
  },
];
