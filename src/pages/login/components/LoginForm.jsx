import React from "react";
// router
import { Link, useNavigate } from "react-router";
// redux
import { useDispatch } from "react-redux";
// mui
import { Stack } from "@mui/material";
// components
import InputField from "../../../components/input-field/InputField";
import SubmitButton from "../../../components/buttons/SubmitButton";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../schemes/login/loginSchema";
import fireAlert from "../../../helpers/fireAlert";
// import { valuesToFormData } from "../../../helpers/valuesToFormData";
import callApi from "../../../helpers/callApi";
// redux actions
import {
  setUserToken,
  setUserData,
} from "../../../redux/features/user/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });
  const login = (values) => {
    callApi(undefined, "application/json")
      .post("/owners/auth/login", JSON.stringify(values))
      .then((data) => {
        console.log("data", data?.data?.data);
        if(data?.data?.data?.status === 'inactive'){
          throw new Error("Your account is inactive");
        } else if (data?.status == 200) {
          dispatch(setUserToken(data?.data?.data?.token));
          dispatch(setUserData(data?.data?.data));
          fireAlert(`Welcome Back`);
          navigate("/");
        } else {
          throw data.data;
        }
      })
      .catch((error) => {
        fireAlert(error?.response?.data?.message || error.message, "error");
      });
  };
  return (
    <Stack gap="16px" width='400px' component="form" onSubmit={handleSubmit(login)}>
      <InputField
        label="Email"
        type="text"
        errorMsg={errors?.email?.message}
        register={{ ...register("email") }}
      />
      <InputField
        label="Password"
        type="password"
        errorMsg={errors?.password?.message}
        register={{ ...register("password") }}
      />
      <SubmitButton />
      <Link to="/register">Create an Account</Link>
    </Stack>
  );
};

export default LoginForm;
