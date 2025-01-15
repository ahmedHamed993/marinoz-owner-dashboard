import React from "react";
// router
import { Link, useParams, useSearchParams } from "react-router";
// fetch
import { gql, useQuery } from "@apollo/client";
import { reviewsQueries } from "./reviewsQueries";
// components
import AddIconButton from "../../components/buttons/AddIconButton";
import DataTable from "../../components/data-table/DataTable";
// mui
import { Rating, Stack, Typography } from "@mui/material";
const DATA_ACCESS_KEY = {
  tour_id:"tour_reviews",
  rental_id:"rental_reviews",
  event_id:"event_reviews",
  suite_id:"suite_reviews"
}
const Reviews = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const value = searchParams.get("value");
  const queryKey = searchParams.get("queryKey");
  const { data, loading, error } = useQuery(reviewsQueries[queryKey], {
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
      <Typography variant="h5">Reviews</Typography>
      <DataTable
        rows={data?.[DATA_ACCESS_KEY[key]] || []}
        cols={cols}
      />
    </Stack>
  );
};

export default Reviews;
const cols = [
  {
    label: "ID",
    dataKey: "id",
    width: "200px",
  },
  {
    label: "Stars",
    dataKey: "stars",
    renderCell: (row) => (
      <Rating defaultValue={row?.stars} precision={0.5} readOnly />
    ),
    width: "200px",
  },
  {
    label: "Comment",
    dataKey: "comment",
  },
];
