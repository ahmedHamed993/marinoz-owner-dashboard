import React from "react";
// router
import { Link, useParams, useSearchParams } from "react-router";
// fetch
import { gql, useQuery } from "@apollo/client";
import { fishingEquipmentQueries } from "./fishingEquipmentsQueries";
// components
import AddIconButton from "../../components/buttons/AddIconButton";
import DataTable from "../../components/data-table/DataTable";
import FishingEquipmentsActions from "./components/FishingEquipmentsActions";
// mui
import { Stack, Typography } from "@mui/material";
const DATA_ACCESS_KEY = {
  tour_id:"tour_fishing_equipment",
  rental_id:"rental_fishing_equipment",
  event_id:"event_fishing_equipment",
  suite_id:"suite_fishing_equipment",
}

const FishingEquipments = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const value = searchParams.get("value");
  const queryKey = searchParams.get("queryKey");
  const { data, loading, error } = useQuery(fishingEquipmentQueries[queryKey], {
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
      <Typography variant="h5">Fishing Equipments</Typography>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <AddIconButton
          path={`/fishing-equipments/add?key=${key}&value=${value}&queryKey=${queryKey}`}
        />
      </Stack>
      <DataTable
        rows={
          data?.[DATA_ACCESS_KEY[key]] || []
        }
        cols={cols}
      />
    </Stack>
  );
};

export default FishingEquipments;

const cols = [
  {
    label: "ID",
    dataKey: "id",
  },
  {
    label: "Fishing Equipments Title",
    dataKey: "fishing_equipment.title",
    renderCell: (row) => <span>{row?.fishing_equipment?.title}</span>,
  },
  {
    label: "Fishing Equipments  Price",
    dataKey: "fishing_equipment.price",
    renderCell: (row) => <span>{row?.fishing_equipment?.price}</span>,
  },
  {
    label: "Actions",
    dataKey: "actions",
    renderCell: (row) => <FishingEquipmentsActions equipmentId={row?.id} />,
  },
];
