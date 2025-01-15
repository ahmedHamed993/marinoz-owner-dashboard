import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, useParams, useSearchParams } from "react-router";
import AddIconButton from "../../components/buttons/AddIconButton";
import { Stack, Typography } from "@mui/material";
import DataTable from "../../components/data-table/DataTable";
import StatusChip from "../../components/status-chip/StatusChip";
import { availabilityQueries } from "./availabilityQueries";
import RentalAvailabilitiesActions from "./components/RentalAvailabilitiesActions";
const RentalAvailabilities = () => {
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
  return (
    <Stack gap="24px">
      <Typography variant="h5">Availabilities</Typography>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <AddIconButton
          path={`/rental-availabilities/add?key=${key}&value=${value}&queryKey=GET_RENTAL_AVAILABILITY_ADDONS`}
        />
      </Stack>
      {data?.rental_availabilities && (
        <DataTable rows={data?.rental_availabilities} cols={cols} />
      )}
    </Stack>
  );
};

export default RentalAvailabilities;

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
      return <RentalAvailabilitiesActions availabilityId={row?.id} />;
    },
  },
];
