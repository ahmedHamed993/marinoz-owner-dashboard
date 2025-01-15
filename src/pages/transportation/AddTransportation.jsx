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

const GET_TRANSPORTATION = gql`
  query MyQuery {
    transportations {
      id
      price
      title
    }
  }
`;
const POST_API_ENDPOINT = {
  tour_id: "/owners/tour-transportations",
  rental_id: "/owners/rental-transportations",
  suite_id: "/owners/suite-transportations",
  event_id: "/owners/event-transportations",
};
const AddTransportation = () => {
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
      transportation_id: "",
      [key]: value,
    },
  });

  const submit = (values) => {
    values["transportation_id"] = values["transportation_id"].id;
    callApi(userToken, "application/json")
      .post(POST_API_ENDPOINT[key], JSON.stringify(values))
      .then((data) => {
        if (data.status == 200 || data.status == 201) {
          setValue("transportation_id", "" );
          fireAlert("Transportation Added Successfully");
        } else {
          throw data;
        }
      })
      .catch((error) => {
        fireAlert(error?.response?.data?.message || error.message, "error");
      });
  };

  const {
    data: transportations,
    loading,
    error,
    refetch,
  } = useQuery(GET_TRANSPORTATION);

  return (
    <Stack
      width="100%"
      gap="16px"
      component="form"
      onSubmit={handleSubmit(submit)}
    >
      <Typography variant="h5">Add Transportation</Typography>
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
            value={watch("transportation_id") ?? null}
            onChange={(e, newValue) => {
              setValue("transportation_id", newValue);
            }}
            options={transportations?.transportations ?? []}
            getOptionLabel={(option) => option?.title ?? ""}
            renderInput={(params) => (
              <TextField {...params} label="Transportations" />
            )}
          />
        </Stack>
      </Stack>
      <SubmitButton label="Submit" />
    </Stack>
  );
};

export default AddTransportation;
