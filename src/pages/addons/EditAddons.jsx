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
import { useQuery, gql } from "@apollo/client";

const GET_ADDON_BY_PK = gql`
  query MyQuery($id: bigint!) {
    addons_by_pk(id: $id) {
      id
      title
      price
    }
  }
`;

const GET_RENTAL_ADDON_BY_PK = gql`
  query MyQuery($id: bigint!) {
    rental_addons_by_pk(id: $id) {
      id
      title
      price
    }
  }
`;

const GET_SUITE_ADDON_BY_PK = gql`
  query MyQuery($id: bigint!) {
    suite_addons_by_pk(id: $id) {
      id
      title
      price
    }
  }
`;

const GET_EVENT_ADDON_BY_PK = gql`
  query MyQuery($id: bigint!) {
    event_addons_by_pk(id: $id) {
      id
      title
      price
    }
  }
`;

const POST_API_ENDPOINT = {
  tour_id: "/owners/update-tour-addons",
  rental_id: "/owners/update-rental-addons",
  suite_id: "/owners/update-suite-addons",
  event_id: "/owners/update-event-addons",
};

const EditAddons = () => {
  const { addonsId } = useParams();
  const userToken = useSelector((state) => state.user.userToken);
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const value = searchParams.get("value");

  const GET_QUERY =
    key === "tour_id"
      ? GET_ADDON_BY_PK
      : key === "rental_id"
        ? GET_RENTAL_ADDON_BY_PK 
        : key === 'event_id' 
          ? GET_EVENT_ADDON_BY_PK
          : GET_SUITE_ADDON_BY_PK;
          
  const DATA_KEY =
    key === "tour_id"
      ? "addons_by_pk"
      : key === "rental_id"
        ? "rental_addons_by_pk" 
        : key === "event_id" 
          ? "event_addons_by_pk"
          : "suite_addons_by_pk";

  const { data, loading, error } = useQuery(GET_QUERY, {
    variables: {
      id: addonsId,
    },
    onCompleted(data) {
      reset({
        title: data?.[DATA_KEY]?.title,
        price: data?.[DATA_KEY]?.price,
      });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      price: 0,
    },
  });

  const submit = (values) => {
    callApi(userToken, "application/json")
      .post(`${POST_API_ENDPOINT[key]}/${addonsId}`, JSON.stringify(values))
      .then((data) => {
        if (data.status == 200 || data.status == 201) {
          fireAlert("Addon Updated Successfully");
        } else {
          throw data;
        }
      })
      .catch((error) => {
        fireAlert(error?.response?.data?.message || error.message, "error");
      });
  };

  if (loading) return <p>Loading....</p>;
  if (error) return <p>{error?.message}</p>;
  return (
    <Stack
      width="100%"
      gap="16px"
      component="form"
      onSubmit={handleSubmit(submit)}
    >
      <Typography variant="h5">Edit Addons</Typography>
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

export default EditAddons;
