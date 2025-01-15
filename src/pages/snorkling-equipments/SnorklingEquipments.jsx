import React from "react";
// router
import { Link, useParams, useSearchParams } from "react-router";
// fetch
import { gql, useQuery } from "@apollo/client";
import { snorkelingEquipmentQueries } from "./snorklingEquipmentsQueries";
// components
import AddIconButton from "../../components/buttons/AddIconButton";
import DataTable from "../../components/data-table/DataTable";
// mui
import { Stack, Typography } from "@mui/material";
import SnorkelingEquipmentsActions from "./components/SnorkelingEquipmentsActions";

const DATA_ACCESS_KEY = {
  tour_id:"tour_snorkeling_equipment",
  rental_id:"rental_snorkeling_equipment",
  event_id:"event_snorkeling_equipment",
  suite_id:"suite_snorkeling_equipment",
}


const SnorklingEquipments = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const value = searchParams.get("value");
  const queryKey = searchParams.get("queryKey");

  const { data, loading, error } = useQuery(
    snorkelingEquipmentQueries[queryKey],
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
      <Typography variant="h5">Snorkeling Equipments</Typography>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <AddIconButton
          path={`/snorkeling-equipments/add?key=${key}&value=${value}&queryKey=${queryKey}`}
        />
      </Stack>
      <DataTable rows={ data?.[DATA_ACCESS_KEY[key]] || [] } cols={cols} />
    </Stack>
  );
};

export default SnorklingEquipments;

const cols = [
  {
    label: "ID",
    dataKey: "id",
  },
  {
    label: "Snorkling Equipments Title",
    dataKey: "snorkling_equipment.title",
    renderCell: (row) => <span>{row?.snorkeling_equipment?.title}</span>,
  },
  {
    label: "Snorkling Equipments  Price",
    dataKey: "snorkling_equipment.price",
    renderCell: (row) => <span>{row?.snorkeling_equipment?.price}</span>,
  },
  {
    label: "Actions",
    dataKey: "actions",
    renderCell: (row) => <SnorkelingEquipmentsActions equipmentId={row?.id} />,
  },
];
