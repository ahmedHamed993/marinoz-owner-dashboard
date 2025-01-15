import React, { useState } from "react";
// redux
import { useSelector } from "react-redux";
// router
import { useParams, useSearchParams } from "react-router";
// mui
import { Stack, Typography } from "@mui/material";
// components
import InputField from "../../components/input-field/InputField";
import SubmitButton from "../../components/buttons/SubmitButton";
// forms
import { useForm } from "react-hook-form";
// fetch
import callApi from "../../helpers/callApi";
import fireAlert from "../../helpers/fireAlert";

const POST_API_ENDPOINT = {
  tour_id: "/owners/tour-addons",
  rental_id: "/owners/rental-addons",
  suite_id: "/owners/suite-addons",
  event_id: "/owners/event-addons",
};

const AVAILABILITY_FORM_KEY = {
  tour_id: "availability_id",
  rental_id: "rental_availability_id",
  suite_id: "suite_availability_id",
  event_id: "event_availability_id",
}
const AddAddons = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const availabilityId = searchParams.get("availabilityId");
  const key = searchParams.get("key");
  const userToken = useSelector((state) => state.user.userToken);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      price: 0,
      [AVAILABILITY_FORM_KEY[key]]: availabilityId,
    },
  });

  const submit = (values) => {
    callApi(userToken, "application/json")
      .post(POST_API_ENDPOINT[key], JSON.stringify(values))
      .then((data) => {
        if (data.status == 200 || data.status == 201) {
          setValue( "title", "");
          setValue( "price", "");
          fireAlert("Addon Added Successfully");
        } else {
          throw data;
        }
      })
      .catch((error) => {
        fireAlert(error?.response?.data?.message || error.message, "error");
      });
  };
  return (
    <Stack
      width="100%"
      gap="16px"
      component="form"
      onSubmit={handleSubmit(submit)}
    >
      <Typography variant="h5">Add Addons</Typography>

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
          <InputField
            label="title"
            register={{ ...register("title") }}
            errorMsg={errors?.title?.message}
            type="text"
          />
          <InputField
            label="price"
            register={{ ...register("price") }}
            errorMsg={errors?.price?.message}
            type="number"
          />
        </Stack>
      </Stack>
      <SubmitButton label="Submit" />
    </Stack>
  );
};

export default AddAddons;
