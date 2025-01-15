import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, useParams, useSearchParams } from "react-router";
import AddIconButton from "../../components/buttons/AddIconButton";
import { Stack, Typography } from "@mui/material";
import DataTable from "../../components/data-table/DataTable";
import StatusChip from "../../components/status-chip/StatusChip";
import AvailabilityActions from "./components/AvailabilityActions";
import { availabilityQueries } from "./availabilityQueries";
const DATA_ACCESS_KEY = {
  tour_id:"availabilities",
  event_id:"event_availabilities",
  suite_id:"suite_availabilities",
}

const Availabilities = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const value = searchParams.get("value");
  const queryKey = searchParams.get("queryKey");
  const { data, loading, error } = useQuery(availabilityQueries[queryKey], {
    variables: {
      id: value,
    },
  });
  if (loading) return <p>loading...</p>;
  if (error) return <p>{error?.message}</p>;
  console.log("data", data);
  return (
    <Stack gap="24px">
      <Typography variant="h5">Availabilities</Typography>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <AddIconButton
          path={`/availabilities/add?key=${key}&value=${value}&queryKey=${queryKey}`}
        />
      </Stack>
      <DataTable
        rows={data?.[DATA_ACCESS_KEY[key]] || []}
        cols={cols}
      />
    </Stack>
  );
};

export default Availabilities;

const cols = [
  {
    label: "ID",
    dataKey: "id",
  },
  {
    label: "From",
    dataKey: "from",
  },
  {
    label: "To",
    dataKey: "to",
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
      return <AvailabilityActions availabilityId={row?.id} />;
    },
  },
];
