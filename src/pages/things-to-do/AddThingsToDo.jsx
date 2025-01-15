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

const GET_THINGS_TO_DO = gql`
  query MyQuery {
    thing_to_dos {
      id
      price
      title
    }
  }
`;
const POST_API_ENDPOINT = {
  tour_id: "/owners/tour-things-to-do",
  rental_id: "/owners/rental-things-to-do",
  suite_id: "/owners/suite-things-to-do",
  event_id: "/owners/event-things-to-do",
};

const AddThingsToDo = () => {
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
      thing_to_do_id: "",
      [key]: value,
    },
  });

  const submit = (values) => {
    values["thing_to_do_id"] = values["thing_to_do_id"].id;
    callApi(userToken, "application/json")
      .post(POST_API_ENDPOINT[key], JSON.stringify(values))
      .then((data) => {
        if (data.status == 200 || data.status == 201) {
          setValue("thing_to_do_id", "");
          fireAlert("Thing to do  Added Successfully");
        } else {
          throw data;
        }
      })
      .catch((error) => {
        fireAlert(error?.response?.data?.message || error.message, "error");
      });
  };

  const { data: things, loading, error, refetch } = useQuery(GET_THINGS_TO_DO);

  return (
    <Stack
      width="100%"
      gap="16px"
      component="form"
      onSubmit={handleSubmit(submit)}
    >
      <Typography variant="h5">Add Thing To Do</Typography>
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
            value={watch("thing_to_do_id") ?? null}
            onChange={(e, newValue) => {
              setValue("thing_to_do_id", newValue);
            }}
            options={things?.thing_to_dos ?? []}
            getOptionLabel={(option) => option?.title ?? ""}
            renderInput={(params) => (
              <TextField {...params} label="Things To Dos" />
            )}
          />
        </Stack>
      </Stack>
      <SubmitButton label="Submit" />
    </Stack>
  );
};

export default AddThingsToDo;
