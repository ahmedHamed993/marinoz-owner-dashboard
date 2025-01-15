import React from "react";
// redux
import { useSelector } from "react-redux";
// mui
import { Stack, TextField, Autocomplete, MenuItem } from "@mui/material";
// components
import UploadImage from "../../components/upload-image/UploadImage";
import InputField from "../../components/input-field/InputField";
import SubmitButton from "../../components/buttons/SubmitButton";
import Select from "../../components/select/Select";
import MultiImageUploader from "../../components/upload-image/MultiImageUploader";
// forms
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTripSchema } from "../../schemes/trips/addTripSchema";
// FETCH
import { useQuery } from "@apollo/client";
import callApi from "../../helpers/callApi";
import fireAlert from "../../helpers/fireAlert";
import { GET_COUNTRIES } from "../../queries/countriesQuery";
import { GET_CITIES } from "../../queries/citiesQuery";
import { GET_YACHT_TYPES } from "../../queries/yachtTypes";
import { GET_FEATURES } from "../../queries/featuresQuery";
import { GET_PROPERTY_TYPES } from "../../queries/propertyTypesQuery";
// icons
import { FaPlus } from "react-icons/fa";
import { addYachtSchema } from "../../schemes/yacht/addYachtSchema";

const AddYacht = () => {
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
      model: "",
      manufacturer: "",
      build_year: "",
      renewal_date: "",
      length: 1,
      width: 1,
      depth: 1,
      location: "",
      engine_type: "",
      fuel_type: "",
      recent_upgrades: "",
      condition: "new",
      description: "",
      images: [],
      price: 1,
      capacity: 1,
      adults: 1,
      children: 1,
      infants: 1,
      cabins: 1,
      bedrooms: 1,
      bathrooms: 1,
      bed: 1,
      note: "",
      owner_id: userData?.id,
      features_id: [],
      property_type_id: "",
      yacht_type_id: "",
      city_id: "",
      country_id: "",
    },
    resolver: yupResolver(addYachtSchema),
  });

  const submit = (values) => {
    const formData = new FormData();
    values["city_id"] = values?.city_id?.id;
    values["country_id"] = values?.country_id?.id;
    values["yacht_type_id"] = values?.yacht_type_id?.id;
    values["property_type_id"] = values?.property_type_id?.id;
    values["features_id"] = values?.features_id;
    // console.log("features_id", values?.features_id)
    console.log("values", values);
    for (let i in values) {
      if (i === "images") {
        for (let j = 0; j < values?.images.length; j++) {
          formData.append("images[]", values["images"][j]);
        }
      } else if (i === "features_id") {
        for (let j = 0; j < values?.features_id.length; j++) {
          formData.append(`features_id[${j}]`, values["features_id"][j]?.id);
        }
      } else {
        formData.append(i, values[i]);
      }
    }
    delete values["features_id"];
    callApi(userToken, "multipart/form-data")
      .post("/owners/yachts", formData)
      .then((data) => {
        if (data.status == 200 || data.status == 201) {
          reset();
          reset({ images: [] });
          fireAlert("Yacht Added Successfully");
        } else {
          throw data;
        }
      })
      .catch((error) => {
        fireAlert(data?.response?.data?.message || error.message, "error");
      });
  };
  const {
    data: countries,
    loading: loadingCountries,
    error: errorCountries,
  } = useQuery(GET_COUNTRIES);

  const {
    data: propertyTypes,
    loading: loadingPropertyTypes,
    error: errorPropertyTypes,
  } = useQuery(GET_PROPERTY_TYPES);

  const {
    data: features,
    loading: loadingFeatures,
    error: errorFeatures,
  } = useQuery(GET_FEATURES);

  const {
    data: cities,
    loading: loadingCities,
    error: errorCities,
    refetch: refetchCities,
  } = useQuery(GET_CITIES, {
    variables: {
      country_id: watch("country")?.id ?? "50",
    },
  });

  const {
    data: yachtTypes,
    loading: loadingTypes,
    error: errorTypes,
  } = useQuery(GET_YACHT_TYPES);

  if (
    loadingCountries ||
    loadingTypes ||
    loadingPropertyTypes ||
    loadingFeatures
  )
    return <p>Loading...</p>;
  return (
    <Stack
      width="100%"
      gap="16px"
      component="form"
      onSubmit={handleSubmit(submit)}
    >
      <Stack direction="row" gap="16px">
        <Stack flex="1" gap="16px">
          <InputField
            label="Boat Name"
            register={{ ...register("name") }}
            errorMsg={errors?.name?.message}
            type="text"
          />
          <Autocomplete
            value={watch("yacht_type_id") ?? null}
            onChange={(e, newValue) => {
              setValue("yacht_type_id", newValue);
            }}
            options={yachtTypes?.yacht_types ?? []}
            getOptionLabel={(option) => option?.yacht_type_en ?? ""}
            renderInput={(params) => (
              <TextField {...params} label="Yacht Types" />
            )}
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
            label="Boat Model"
            register={{ ...register("model") }}
            errorMsg={errors?.model?.message}
            type="text"
          />
          <Stack
            direction="row"
            flexWrap="wrap"
            gap="16px"
            sx={{ "& > *": { flex: "1" } }}
          >
            <Autocomplete
              value={watch("property_type_id") ?? null}
              onChange={(e, newValue) => {
                setValue("property_type_id", newValue);
              }}
              options={propertyTypes?.property_types ?? []}
              getOptionLabel={(option) => option?.property_type_en ?? ""}
              disabled={loadingPropertyTypes}
              renderInput={(params) => (
                <TextField {...params} label="Property Types" />
              )}
            />
            <Autocomplete
              value={watch("features_id") ?? []}
              onChange={(e, newValue) => {
                setValue("features_id", newValue);
              }}
              options={features?.features ?? []}
              getOptionLabel={(option) => option?.feature_en ?? ""}
              disabled={loadingFeatures}
              renderInput={(params) => (
                <TextField {...params} label="Features" />
              )}
              multiple
            />
          </Stack>
          <Stack
            direction="row"
            flexWrap="wrap"
            gap="16px"
            sx={{ "& > *": { flex: "1" } }}
          >
            {/* country  */}
            <Autocomplete
              value={watch("country_id") ?? null}
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
              renderInput={(params) => (
                <TextField {...params} label="Country" />
              )}
            />

            {/* city */}
            <Autocomplete
              value={watch("city_id") ?? null}
              onChange={(e, newValue) => setValue("city_id", newValue)}
              options={cities?.cities ?? []}
              getOptionLabel={(option) => option?.city_en ?? ""}
              renderInput={(params) => <TextField {...params} label="City" />}
              disabled={!watch("country_id") || loadingCities}
            />
          </Stack>
        </Stack>
        <MultiImageUploader setValue={setValue} name="images" />
      </Stack>
      <Stack
        gap="16px"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        <InputField
          label="Capacity"
          register={{ ...register("capacity") }}
          errorMsg={errors?.capacity?.message}
          type="number"
        />
        <InputField
          label="Length"
          register={{ ...register("length") }}
          errorMsg={errors?.length?.message}
          type="number"
        />
        <InputField
          label="Width"
          register={{ ...register("width") }}
          errorMsg={errors?.width?.message}
          type="number"
        />
        <InputField
          label="Depth"
          register={{ ...register("depth") }}
          errorMsg={errors?.depth?.message}
          type="number"
        />
        <InputField
          label="Cabins"
          register={{ ...register("cabins") }}
          errorMsg={errors?.cabins?.message}
          type="number"
        />
        <InputField
          label="Beds"
          register={{ ...register("bed") }}
          errorMsg={errors?.bed?.message}
          type="number"
        />
        <InputField
          label="Bedrooms"
          register={{ ...register("bedrooms") }}
          errorMsg={errors?.bedrooms?.message}
          type="number"
        />
        <InputField
          label="bathrooms"
          register={{ ...register("bathrooms") }}
          errorMsg={errors?.bathrooms?.message}
          type="number"
        />
        <InputField
          label="Adults"
          register={{ ...register("adults") }}
          errorMsg={errors?.adults?.message}
          type="number"
        />
        <InputField
          label="children"
          register={{ ...register("children") }}
          errorMsg={errors?.children?.message}
          type="number"
        />
        <InputField
          label="infants"
          register={{ ...register("infants") }}
          errorMsg={errors?.infants?.message}
          type="number"
        />
        <InputField
          label="Engine Type"
          register={{ ...register("engine_type") }}
          errorMsg={errors?.engine_type?.message}
          type="text"
        />
        <InputField
          label="Fuel Type"
          register={{ ...register("fuel_type") }}
          errorMsg={errors?.fuel_type?.message}
          type="text"
        />
        <InputField
          label="manufacturer"
          register={{ ...register("manufacturer") }}
          errorMsg={errors?.manufacturer?.message}
          type="text"
        />
        <InputField
          label="year built"
          register={{ ...register("build_year") }}
          errorMsg={errors?.build_year?.message}
          type="number"
        />
        <InputField
          label="Renewal date"
          register={{ ...register("renewal_date") }}
          errorMsg={errors?.renewal_date?.message}
          type="date"
        />
        <InputField
          label="Location"
          register={{ ...register("location") }}
          errorMsg={errors?.location?.message}
          type="url"
        />
        <InputField
          label="Recent Upgrade"
          register={{ ...register("recent_upgrades") }}
          errorMsg={errors?.recent_upgrades?.message}
          type="date"
        />
        <Select
          label="Condition"
          // register={{ ...register("condition") }}
          value={watch("condition")}
          onChange={(e) => setValue("condition", e.target.value)}
          errorMsg={errors?.condition?.message}
        >
          <MenuItem value="new">New</MenuItem>
          <MenuItem value="like-new">Like New</MenuItem>
          <MenuItem value="used">Used</MenuItem>
        </Select>
      </Stack>
      <SubmitButton lable="Add" />
    </Stack>
  );
};

export default AddYacht;
