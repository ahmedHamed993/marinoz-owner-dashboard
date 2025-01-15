import React, { useState } from "react";
// redux
import { useSelector } from "react-redux";
// router
import { useParams } from "react-router";
// mui
import { Stack, Autocomplete, TextField, Typography } from "@mui/material";
// components
import UploadImage from "../../components/upload-image/UploadImage";
import InputField from "../../components/input-field/InputField";
import SubmitButton from "../../components/buttons/SubmitButton";
import Select from "../../components/select/Select";
import MultiImageUploader from "../../components/upload-image/MultiImageUploader";
import TextEditor from "../../components/text-editor/TextEditor";
import InputMultiDate from "../../components/input-field/InputMultiDate";
// packages
import DatePicker from "react-multi-date-picker";
// forms
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addRentalSchema } from "../../schemes/rental/addRentalSchema";
// fetch
import { gql, useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../../queries/countriesQuery";
import { GET_CITIES } from "../../queries/citiesQuery";
import callApi from "../../helpers/callApi";
import fireAlert from "../../helpers/fireAlert";
// icons
import { FaPlus } from "react-icons/fa";

const GET_AVAILABILITY_BY_ID = gql`
  query MyQuery($id: bigint!) {
    rental_availabilities_by_pk(id: $id) {
      cancellation_policy
      capacity
      created_at
      excludes
      from
      id
      includes
      status
      to
      price_per_hour
      price_per_half_day
      price_per_day
      price_per_night
    }
  }
`;

const EditRentalAvailability = () => {
  const { availabilityId } = useParams();
  const userToken = useSelector((state) => state.user.userToken);
  const userData = useSelector((state) => state.user.userData);
  const { data, loading, error } = useQuery(GET_AVAILABILITY_BY_ID, {
    variables: {
      id: availabilityId,
    },
    onCompleted(data) {
      reset({
        capacity: data?.rental_availabilities_by_pk?.capacity,
        cancellation_policy:
          data?.rental_availabilities_by_pk?.cancellation_policy,
        includes: data?.rental_availabilities_by_pk?.includes,
        excludes: data?.rental_availabilities_by_pk?.excludes,
        from: data?.rental_availabilities_by_pk?.from,
        to: data?.rental_availabilities_by_pk?.to,
        price_per_hour: data?.rental_availabilities_by_pk.price_per_hour,
        price_per_half_day:
          data?.rental_availabilities_by_pk.price_per_half_day,
        price_per_day: data?.rental_availabilities_by_pk.price_per_day,
        price_per_night: data?.rental_availabilities_by_pk.price_per_night,
      });
    },
  });

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
      capacity: 0,
      cancellation_policy: "",
      status: "pending",
      includes: "",
      excludes: "",
      from: "",
      to: "",
      price_per_hour: 0,
      price_per_half_day: 0,
      price_per_day: 0,
      price_per_night: 0,
    },
  });

  const submit = (values) => {
    const formData = new FormData();
    for (let i in values) {
      formData.append(i, values[i]);
    }

    callApi(userToken, "multipart/form-data")
      .post(`/owners/update-rental-availabilities/${availabilityId}`, formData)
      .then((data) => {
        if (data.status == 200 || data.status == 201) {
          fireAlert("Added Successfully");
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
      <Typography variant="h5">Add Availabilities</Typography>
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
            label="Capacity"
            register={{ ...register("capacity") }}
            errorMsg={errors?.capacity?.message}
            type="number"
          />
          <InputField
            label="cancellation policy"
            register={{ ...register("cancellation_policy") }}
            errorMsg={errors?.cancellation_policy?.message}
            type="text"
          />
          <InputField
            label="includes"
            register={{ ...register("includes") }}
            errorMsg={errors?.includes?.message}
            type="text"
          />
          <InputField
            label="excludes"
            register={{ ...register("excludes") }}
            errorMsg={errors?.excludes?.message}
            type="text"
          />
          <InputField
            label="from"
            register={{ ...register("from") }}
            errorMsg={errors?.from?.message}
            type="date"
          />
          <InputField
            label="to"
            register={{ ...register("to") }}
            errorMsg={errors?.to?.message}
            type="date"
          />
          <InputField
            label="Price Per Hour"
            register={{ ...register("price_per_hour") }}
            errorMsg={errors?.price_per_hour?.message}
            type="number"
          />
          <InputField
            label="Price Per Half Day"
            register={{ ...register("price_per_half_day") }}
            errorMsg={errors?.price_per_half_day?.message}
            type="number"
          />
          <InputField
            label="Price Per Day"
            register={{ ...register("price_per_day") }}
            errorMsg={errors?.price_per_day?.message}
            type="number"
          />
          <InputField
            label="Price Per Night"
            register={{ ...register("price_per_night") }}
            errorMsg={errors?.price_per_night?.message}
            type="number"
          />
        </Stack>
      </Stack>
      <SubmitButton label="Submit" />
    </Stack>
  );
};

export default EditRentalAvailability;
