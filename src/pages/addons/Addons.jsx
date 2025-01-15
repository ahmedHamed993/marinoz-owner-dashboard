import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams, useSearchParams } from "react-router";
import AddIconButton from "../../components/buttons/AddIconButton";
import { Stack, Typography } from "@mui/material";
import DataTable from "../../components/data-table/DataTable";
import AddonActions from "./components/AddonActions";
import { addonsQueries } from "./addonsQueries";

const DATA_ACCESS_KEY = {
  tour_id:"addons",
  rental_id:"rental_addons",
  event_id:"event_addons",
  suite_id:"suite_addons",
}
const Addons = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const availabilityId = searchParams.get("availabilityId");
  const key = searchParams.get("key");
  const value = searchParams.get("value");
  const queryKey = searchParams.get("queryKey");
  const { data, loading, error } = useQuery(addonsQueries[queryKey], {
    variables: { id: availabilityId },
  });
  if (loading) return <p>loading...</p>;
  if (loading) return <p>P{error?.message}</p>;

  return (
    <Stack gap="24px">
      <Typography variant="h5"> Addons</Typography>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <AddIconButton
          path={`/addons/add?availabilityId=${availabilityId}&key=${key}&value=${value}`}
        />
      </Stack>
      <DataTable rows={data?.[DATA_ACCESS_KEY[key]]  || []} cols={cols} />
    </Stack>
  );
};

export default Addons;

const cols = [
  {
    label: "ID",
    dataKey: "id",
  },
  {
    label: "Title",
    dataKey: "title",
  },
  {
    label: "Price",
    dataKey: "price",
  },
  {
    label: "Actions",
    dataKey: "actions",
    renderCell: (row) => {
      return <AddonActions addonId={row?.id} />;
    },
  },
];
