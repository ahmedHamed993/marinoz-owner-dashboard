import React from "react";
// router
import { Link, useParams, useSearchParams } from "react-router";
// fetch
import { gql, useQuery } from "@apollo/client";
import { foodBeveragesQueries } from "./foodBeveragesQueries";
// components
import AddIconButton from "../../components/buttons/AddIconButton";
import DataTable from "../../components/data-table/DataTable";
import FoodBeveragesActions from "./components/FoodBeveragesActions";
// mui
import { Stack, Typography } from "@mui/material";

const DATA_ACCESS_KEY = {
  tour_id:"tour_food_beverages",
  rental_id:"rental_food_beverages",
  event_id:"event_food_beverages",
  suite_id:"suite_food_beverages",
}

const FoodBeverages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const value = searchParams.get("value");
  const queryKey = searchParams.get("queryKey");
  const { data, loading, error } = useQuery(foodBeveragesQueries[queryKey], {
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
      <Typography variant="h5">Food Beverages</Typography>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <AddIconButton
          path={`/food-beverages/add?key=${key}&value=${value}&queryKey=${queryKey}`}
        />
      </Stack>
      <DataTable
        rows={data?.[DATA_ACCESS_KEY[key]] || []}
        cols={cols}
      />
    </Stack>
  );
};

export default FoodBeverages;

const cols = [
  {
    label: "ID",
    dataKey: "id",
  },
  {
    label: "Food Beverages Title",
    dataKey: "food_beverage.title",
    renderCell: (row) => <span>{row?.food_beverage?.title}</span>,
  },
  {
    label: "Food Beverages Price",
    dataKey: "food_beverage.price",
    renderCell: (row) => <span>{row?.food_beverage?.price}</span>,
  },
  {
    label: "Actions",
    dataKey: "actions",
    renderCell: (row) => <FoodBeveragesActions foodBeverageId={row?.id} />,
  },
];
