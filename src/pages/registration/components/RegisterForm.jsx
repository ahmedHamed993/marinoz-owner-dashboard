import React from "react";
// router
import { useNavigate } from "react-router";
// redux
import { useDispatch } from "react-redux";
// mui
import { Stack, Autocomplete, TextField } from "@mui/material";
// components
import InputField from "../../../components/input-field/InputField";
import SubmitButton from "../../../components/buttons/SubmitButton";
import UploadImage from "../../../components/upload-image/UploadImage";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../../schemes/registration/registerSchema";
// fetch
import callApi from "../../../helpers/callApi";
// import { valuesToFormData } from "../../../helpers/valuesToFormData";
import { valuesToFormData } from "../../../helpers/valuesToFormdata";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../../../queries/countriesQuery";
import { GET_CITIES } from "../../../queries/citiesQuery";
import fireAlert from "../../../helpers/fireAlert";
// redux actions
import {
  setUserToken,
  setUserData,
} from "../../../redux/features/user/userSlice";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      password: "",
      address: "",
      image: "",
      city_id: "",
      country_id: "",
      status: "inactive",
    },
    resolver: yupResolver(registerSchema),
  });
  const login = (values) => {
    // navigate("/");
    values["name"] = `${values.first_name} ${values.last_name}`;
    values["city_id"] = values?.city_id?.id;
    values["country_id"] = values?.country_id?.id;
    delete values["first_name"];
    delete values["last_name"];

    const formData = valuesToFormData(values);
    callApi(undefined, "multipart/form-data")
      .post("/owners/auth/register", formData)
      .then((data) => {
        if (data?.status == 201) {
          dispatch(setUserToken(data?.data?.data?.token));
          dispatch(setUserData(data?.data?.data?.owner));
          fireAlert(`Welcome MR/MRs ${values?.name}`);
          navigate("/verify-otp");
        } else {
          throw data.data;
        }
      })
      .catch((error) => {
        fireAlert(error.message, "error");
      });
  };
  const {
    data: countries,
    loading: loadingCountries,
    error: errorCountries,
  } = useQuery(GET_COUNTRIES);
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
  return (
    <Stack
      gap="16px"
      component="form"
      minWidth="500px"
      padding="32px 0"
      onSubmit={handleSubmit(login)}
    >
      <UploadImage
        setValue={setValue}
        errorMsg={errors?.image?.message}
        name="image"
      />
      <Stack
        direction="row"
        flexWrap="wrap"
        gap="16px"
        sx={{ "& > *": { flex: "1" } }}
      >
        <InputField
          label="first name"
          type="text"
          errorMsg={errors?.first_name?.message}
          register={{ ...register("first_name") }}
        />
        <InputField
          label="last name"
          type="text"
          errorMsg={errors?.last_name?.message}
          register={{ ...register("last_name") }}
        />
      </Stack>
      <InputField
        label="phone_number"
        type="text"
        errorMsg={errors?.phone_number?.message}
        register={{ ...register("phone_number") }}
      />
      <InputField
        label="Email"
        type="email"
        errorMsg={errors?.email?.message}
        register={{ ...register("email") }}
      />
      <InputField
        label="Password"
        type="password"
        errorMsg={errors?.password?.message}
        register={{ ...register("password") }}
      />
      <InputField
        label="address"
        type="text"
        errorMsg={errors?.address?.message}
        register={{ ...register("address") }}
      />
      <Stack
        direction="row"
        flexWrap="wrap"
        gap="16px"
        sx={{ "& > *": { flex: "1" } }}
      >
        {/* country  */}
        <Autocomplete
          value={watch("country_id")}
          onChange={(e, newValue) => {
            setValue("country_id", newValue);
            setValue("city", null);
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
      <SubmitButton />
    </Stack>
  );
};

export default RegisterForm;
