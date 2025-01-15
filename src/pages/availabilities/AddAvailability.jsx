import React, { useState } from "react";
// redux
import { useSelector } from "react-redux";
// router
import { useParams, useSearchParams } from "react-router";
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

const POST_API_ENDPOINT = {
  tour_id: "/owners/tour-availabilities",
  event_id: "/owners/event-availabilities",
  suite_id: "/owners/suite-availabilities",
};

const AddAvailability = () => {
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
      capacity: 0,
      cancellation_policy: "",
      status: "pending",
      includes: "",
      excludes: "",
      from: "",
      to: "",
      adult_price: "",
      child_price: "",
      program_days: "",
      final_adult_price: 0,
      final_child_price: 0,
      [key]: value,
      off_days: [],
    },
  });

  const submit = (values) => {
    const formData = new FormData();
    for (let i in values) {
      formData.append(i, values[i]);
    }
    for (let i = 0; i < values?.off_days?.length; i++) {
      formData.append(`off_days[]`, values?.off_days[i]);
    }

    callApi(userToken, "multipart/form-data")
      .post(POST_API_ENDPOINT[key], formData)
      .then((data) => {
        if (data.status == 200 || data.status == 201) {
          reset({
            capacity: 0,
            cancellation_policy: "",
            status: "pending",
            includes: "",
            excludes: "",
            from: "",
            to: "",
            adult_price: "",
            child_price: "",
            program_days: "",
            final_adult_price: 0,
            final_child_price: 0,
            off_days: [],
          });
          fireAlert("Availability Added Successfully");
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
            label="adult price"
            register={{ ...register("adult_price") }}
            errorMsg={errors?.adult_price?.message}
            type="number"
          />
          {/* <InputField
            label="final adult price"
            register={{ ...register("final_adult_price") }}
            errorMsg={errors?.final_adult_price?.message}
            type="number"
          /> */}
          <InputField
            label="child price"
            register={{ ...register("child_price") }}
            errorMsg={errors?.child_price?.message}
            type="number"
          />
          {/* <InputField
            label="final child price"
            register={{ ...register("final_child_price") }}
            errorMsg={errors?.final_child_price?.message}
            type="number"
          /> */}
          <InputField
            label="program days count"
            register={{ ...register("program_days") }}
            errorMsg={errors?.program_days?.message}
            type="number"
          />
          <InputMultiDate
            label="Off Days"
            value={watch("off_days")}
            onChange={(n) => setValue("off_days", n)}
          />
        </Stack>
      </Stack>
      <SubmitButton label="Submit" />
    </Stack>
  );
};

export default AddAvailability;
