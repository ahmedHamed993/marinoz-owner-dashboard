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

const GET_SNORKELING_EQUIPMENT = gql`
  query MyQuery {
    snorkeling_equipment {
      id
      price
      title
    }
  }
`;
const POST_API_ENDPOINT = {
  tour_id: "/owners/tour-snorkeling-equipments",
  rental_id: "/owners/rental-snorkeling-equipments",
  suite_id: "/owners/suite-snorkeling-equipments",
  event_id: "/owners/event-snorkeling-equipments",
};

const AddSnorklingEquipments = () => {
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
      snorkeling_equipment_id: "",
      [key]: value,
    },
  });

  const submit = (values) => {
    values["snorkeling_equipment_id"] = values["snorkeling_equipment_id"].id;
    callApi(userToken, "application/json")
      .post(POST_API_ENDPOINT[key], JSON.stringify(values))
      .then((data) => {
        if (data.status == 200 || data.status == 201) {
          setValue("snorkeling_equipment_id", "");
          fireAlert("Equipment Added Successfully");
        } else {
          throw data;
        }
      })
      .catch((error) => {
        fireAlert(error?.response?.data?.message || error.message, "error");
      });
    // console.log('values',values)
  };

  const {
    data: equipments,
    loading,
    error,
    refetch,
  } = useQuery(GET_SNORKELING_EQUIPMENT);
  return (
    <Stack
      width="100%"
      gap="16px"
      component="form"
      onSubmit={handleSubmit(submit)}
    >
      <Typography variant="h5">Add Snorkeling Equipments</Typography>
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
            value={watch("snorkeling_equipment_id") ?? null}
            onChange={(e, newValue) => {
              setValue("snorkeling_equipment_id", newValue);
            }}
            options={equipments?.snorkeling_equipment ?? []}
            getOptionLabel={(option) => option?.title ?? ""}
            renderInput={(params) => (
              <TextField {...params} label="Snorkeling Equipments" />
            )}
          />
        </Stack>
      </Stack>
      <SubmitButton label="Submit" />
    </Stack>
  );
};

export default AddSnorklingEquipments;
