import React, { useState } from "react";
// redux
import { useSelector } from "react-redux";
// router
import { useParams, useSearchParams } from "react-router";
// mui
import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
// components
import InputField from "../../components/input-field/InputField";
import SubmitButton from "../../components/buttons/SubmitButton";
// forms
import { useForm } from "react-hook-form";
// fetch
import callApi from "../../helpers/callApi";
import fireAlert from "../../helpers/fireAlert";
import { gql, useQuery } from "@apollo/client";

const GET_TRIP_TYPES = gql`
  query MyQuery {
    trip_types {
      id
      price
      title
    }
  }
`;

const POST_API_ENDPOINT = {
  tour_id: "/owners/tour-trip-types",
  rental_id: "/owners/rental-trip-types",
  suite_id: "/owners/suite-trip-types",
  event_id: "/owners/event-trip-types",
};

const AddTripType = () => {
  const userToken = useSelector((state) => state.user.userToken);
  const userData = useSelector((state) => state.user.userData);
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const value = searchParams.get("value");

  const {
    register,
    setValue,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      trip_type_id: "",
      [key]: value,
    },
  });

  const submit = (values) => {
    values["trip_type_id"] = values["trip_type_id"].id;
    callApi(userToken, "application/json")
      .post(POST_API_ENDPOINT[key], JSON.stringify(values))
      .then((data) => {
        if (data.status == 200 || data.status == 201) {
          setValue("trip_type_id", "");
          fireAlert("Added Successfully");
        } else {
          throw data;
        }
      })
      .catch((error) => {
        fireAlert(error?.response?.data?.message || error.message, "error");
      });
    // console.log('values',values)
  };

  const { data: types, loading, error, refetch } = useQuery(GET_TRIP_TYPES);

  return (
    <Stack
      width="100%"
      gap="16px"
      component="form"
      onSubmit={handleSubmit(submit)}
    >
      <Typography variant="h5">Add Trip Type</Typography>
      <Stack direction="row" gap="16px">
        <Stack
          direction="row"
          flex="1"
          gap="16px"
          sx={{
            flexWrap: "wrap",
            "& > *": {
              flex: "1",
              flexBasis: "48%",
              minWidth: "300px",
            },
          }}
        >
          <Autocomplete
            value={watch("trip_type_id") ?? null}
            onChange={(e, newValue) => {
              setValue("trip_type_id", newValue);
            }}
            options={types?.trip_types ?? []}
            getOptionLabel={(option) => option?.title ?? ""}
            renderInput={(params) => (
              <TextField {...params} label="Trip Types" />
            )}
          />
        </Stack>
      </Stack>
      <SubmitButton label="Submit" />
    </Stack>
  );
};

export default AddTripType;
