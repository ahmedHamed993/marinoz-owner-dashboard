import React from "react";
// redux
import { useSelector } from "react-redux";
// router
import { useParams } from "react-router-dom";
// mui
import {
  Stack,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
// components
import UploadImage from "../../components/upload-image/UploadImage";
import InputField from "../../components/input-field/InputField";
import SubmitButton from "../../components/buttons/SubmitButton";
import MultiImageUploader from "../../components/upload-image/MultiImageUploader";
// forms
import { useForm, useFieldArray } from "react-hook-form";
import fireAlert from "../../helpers/fireAlert";
// fetch
import { useQuery, gql } from "@apollo/client";
import callApi from "../../helpers/callApi";

const GET_RESALE_BY_PK = gql`
  query MyQuery($id: bigint!) {
    resales_by_pk(id: $id) {
      id
      additional_info
      created_at
      engine_power
      fuel_consumption
      fuel_tank
      max_speed
      num_of_crew
      owner_id
      selling_price
      speed
      updated_at
      water_tank
    }
  }
`;

const EditYachtResale = () => {
  const { resaleId } = useParams();
  const userToken = useSelector((state) => state.user.userToken);
  const userData = useSelector((state) => state.user.userData);

  const { data, loading, error } = useQuery(GET_RESALE_BY_PK, {
    variables: {
      id: resaleId,
    },
    onCompleted(data) {
      reset({
        additional_info:data?.resales_by_pk?.additional_info,
        engine_power:data?.resales_by_pk?.engine_power,
        fuel_consumption:data?.resales_by_pk?.fuel_consumption,
        fuel_tank:data?.resales_by_pk?.fuel_tank,
        max_speed:data?.resales_by_pk?.max_speed,
        num_of_crew:data?.resales_by_pk?.num_of_crew,
        selling_price:data?.resales_by_pk?.selling_price,
        speed:data?.resales_by_pk?.speed,
        water_tank:data?.resales_by_pk?.water_tank,
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
      additional_info:"",
      engine_power:0,
      fuel_consumption:0,
      fuel_tank:0,
      max_speed:0,
      num_of_crew:0,
      selling_price:0,
      speed:0,
      water_tank:0,
    },
    // resolver: yupResolver(addRentalSchema),
  });

  
  const submit = (values) => {
    const formData = new FormData();

    for (let i in values) {
      if (i === "images") {
        for (let j = 0; j < values?.images.length; j++) {
          formData.append("images[]", values["images"][j]);
        }
      } else {
        formData.append(i, values[i]);
      }
    }

    callApi(userToken, "multipart/form-data")
      .post(`/owners/update-resales/${resaleId}`, formData)
      .then((data) => {
        if (data.status == 200 || data.status == 201) {
          fireAlert("Tour Updated Successfully");
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
      <Typography variant='h5'>Edit Yacht Resale</Typography>
      <Stack direction="row" gap="16px" >
      <Stack flex='1' sx={{
        display:'grid',
        gridTemplateColumns:"1fr 1fr",
        gap:"16px",
      }} >
          <InputField
            label="speed"
            register={{ ...register("speed") }}
            errorMsg={errors?.speed?.message}
            type="number"
          />
          <InputField
            label="Max Speed"
            register={{ ...register("max_speed") }}
            errorMsg={errors?.max_speed?.message}
            type="number"
          />
          <InputField
            label="Fuel Tank"
            register={{ ...register("fuel_tank") }}
            errorMsg={errors?.fuel_tank?.message}
            type="number"
          />
          <InputField
            label="water Tank"
            register={{ ...register("water_tank") }}
            errorMsg={errors?.water_tank?.message}
            type="number"
          />
          <InputField
            label="Fuel Consumption"
            register={{ ...register("fuel_consumption") }}
            errorMsg={errors?.fuel_consumption?.message}
            type="number"
          />
          <InputField
            label="Engine Power"
            register={{ ...register("engine_power") }}
            errorMsg={errors?.engine_power?.message}
            type="number"
          />
          <InputField
            label="Number of Crew"
            register={{ ...register("num_of_crew") }}
            errorMsg={errors?.num_of_crew?.message}
            type="number"
          />
          <InputField
            label="Selling Price"
            register={{ ...register("selling_price") }}
            errorMsg={errors?.selling_price?.message}
            type="number"
          />
          <InputField
            label="Addition Information"
            register={{ ...register("additional_info") }}
            errorMsg={errors?.additional_info?.message}
            type="text"
            multiline={true}
            rows={4}
            moreSx={{
              gridColumn:"span 2",
            }}
          />
        </Stack>
        <Stack minHeight='400px' sx={{"& > *":{height:'100%'}}}>
          <MultiImageUploader
            setValue={setValue}
            name="images"
            errorMsg={errors?.images?.message}
          />
        </Stack>
      </Stack>
       <SubmitButton label="Add"/>
    </Stack>
  )
}

export default EditYachtResale
