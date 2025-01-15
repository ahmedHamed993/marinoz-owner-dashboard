import React from "react";
// redux
import { useSelector } from "react-redux";
// mui
import { Stack, Autocomplete, TextField } from "@mui/material";
// components
import UploadImage from "../../components/upload-image/UploadImage";
import InputField from "../../components/input-field/InputField";
import SubmitButton from "../../components/buttons/SubmitButton";
import Select from "../../components/select/Select";
import MultiImageUploader from "../../components/upload-image/MultiImageUploader";
// forms
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addRentalSchema } from "../../schemes/rental/addRentalSchema";
// fetch
import { useQuery, gql } from "@apollo/client";
import { GET_COUNTRIES } from "../../queries/countriesQuery";
import { GET_CITIES } from "../../queries/citiesQuery";
import callApi from "../../helpers/callApi";
import fireAlert from "../../helpers/fireAlert";
// icons
import { FaPlus } from "react-icons/fa";
const GET_YACHTS = gql`
  query MyQuery {
    yachts {
      name
      id
    }
  }
`;
const AddRental = () => {
  const userToken = useSelector((state) => state.user.userToken);
  const userData = useSelector((state) => state.user.userData);

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
      name: "",
      image: "",
      images: [],
      description: "",
      location: "",
      country_id: "",
      city_id: "",
      yacht_id: "",
      owner_id: userData?.id,
    },
    resolver: yupResolver(addRentalSchema),
  });

  const submit = (values) => {
    const formData = new FormData();
    values["city_id"] = values?.city_id?.id;
    values["country_id"] = values?.country_id?.id;
    values["yacht_id"] = values?.yacht_id?.id;

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
      .post("/owners/rentals", formData)
      .then((data) => {
        if (data.status == 200 || data.status == 201) {
          reset();
          reset({ images: [] });
          reset({ image: null });
          fireAlert("Tour Added Successfully");
        } else {
          throw data;
        }
      })
      .catch((error) => {
        fireAlert(error?.response?.data?.message || error.message, "error");
      });
  };

  const {
    data: countries,
    loading: loadingCountries,
    error: errorCountries,
  } = useQuery(GET_COUNTRIES);

  const {
    data: yachts,
    loading: loadingYachts,
    error: errorYachts,
  } = useQuery(GET_YACHTS);

  const {
    data: cities,
    loading: loadingCities,
    error: errorCities,
    refetch: refetchCities,
  } = useQuery(GET_CITIES, {
    variables: {
      country_id: watch("country_id")?.id ?? "50",
    },
  });

  if (loadingCountries || loadingYachts) return <p>Loading...</p>;
  return (
    <Stack
      width="100%"
      gap="16px"
      component="form"
      onSubmit={handleSubmit(submit)}
    >
      <Stack direction="row" gap="16px">
        <Stack flex="1" gap="16px">
          <UploadImage
            errorMsg={errors?.image?.message}
            name={"image"}
            aspectRatio={16 / 9}
            height="300px"
            setValue={setValue}
          />
          <InputField
            label="Name"
            register={{ ...register("name") }}
            errorMsg={errors?.name?.message}
            type="text"
          />
          <InputField
            label="Description"
            register={{ ...register("description") }}
            errorMsg={errors?.description?.message}
            type="text"
            multiline={true}
            rows={3}
          />
          <InputField
            label="Location"
            register={{ ...register("location") }}
            errorMsg={errors?.location?.message}
            type="url"
          />
        </Stack>
        <MultiImageUploader
          setValue={setValue}
          name="images"
          errorMsg={errors?.images?.message}
        />
      </Stack>
      <Stack
        direction="row"
        flexWrap="wrap"
        gap="16px"
        sx={{ "& > *": { flex: "1" } }}
      >
        {/* yachts  */}
        <Autocomplete
          value={watch("yacht_id")}
          onChange={(e, newValue) => {
            setValue("yacht_id", newValue);
          }}
          getOptionLabel={(option) => option?.name ?? ""}
          options={yachts?.yachts ?? []}
          renderInput={(params) => <TextField {...params} label="Yacht" />}
        />
        {/* country  */}
        <Autocomplete
          value={watch("country_id")}
          onChange={(e, newValue) => {
            setValue("country_id", newValue);
            setValue("city_id", null);
            if (newValue) {
              refetchCities({
                variables: { id: newValue.id }, // Pass the new variable
              });
            }
          }}
          options={countries?.countries ?? []}
          getOptionLabel={(option) => option?.country_en ?? ""}
          renderInput={(params) => <TextField {...params} label="Country" />}
        />
        {/* city */}
        <Autocomplete
          value={watch("city_id")}
          onChange={(e, newValue) => setValue("city_id", newValue)}
          options={cities?.cities ?? []}
          getOptionLabel={(option) => option?.city_en ?? ""}
          renderInput={(params) => <TextField {...params} label="City" />}
          disabled={!watch("country_id") || loadingCities}
        />
      </Stack>

      <SubmitButton label="Submit" />
    </Stack>
  );
};

export default AddRental;
