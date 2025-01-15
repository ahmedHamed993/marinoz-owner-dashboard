import React from "react";
// redux
import { useSelector } from "react-redux";
// mui
import { Stack, Autocomplete, TextField, Typography } from "@mui/material";
// components
import UploadImage from "../../components/upload-image/UploadImage";
import InputField from "../../components/input-field/InputField";
import SubmitButton from "../../components/buttons/SubmitButton";
import Select from "../../components/select/Select";
import MultiImageUploader from "../../components/upload-image/MultiImageUploader";
import TextEditor from "../../components/text-editor/TextEditor";
// forms
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addRentalSchema } from "../../schemes/rental/addRentalSchema";
// fetch
import { gql, useQuery } from "@apollo/client";
import callApi from "../../helpers/callApi";
import fireAlert from "../../helpers/fireAlert";
// icons
import { FaPlus } from "react-icons/fa";
import { useSearchParams } from "react-router";


const AddYachtResale = () => {
  const userToken = useSelector((state) => state.user.userToken);
  const userData = useSelector((state) => state.user.userData);
  const [searchParams, setSearchParams] = useSearchParams();
  const yachtId = searchParams.get("yachtId")
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
      images: [],
      speed:0,
      max_speed:0,
      fuel_tank:0,
      water_tank:0,
      fuel_consumption:0,
      engine_power:0,
      num_of_crew:0,
      selling_price:0,
      additional_info:"",
      yacht_id:yachtId,
    },
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
      .post("/owners/resales", formData)
      .then((data) => {
        if (data.status == 200 || data.status == 201) {
          reset();
          reset({ images: [] });
          fireAlert("Reslae Added Successfully");
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
      <Typography variant='h5'>Add Yacht Resale</Typography>
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

export default AddYachtResale
