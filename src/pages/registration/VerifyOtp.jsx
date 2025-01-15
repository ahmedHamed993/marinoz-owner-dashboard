import React from "react";
// router
import { useNavigate } from "react-router";
// redux
import { useDispatch, useSelector } from "react-redux";
// mui
import { Stack } from "@mui/material";
// components
import InputField from "../../components/input-field/InputField";
import SubmitButton from "../../components/buttons/SubmitButton";
// form
import { useForm } from "react-hook-form";
import fireAlert from "../../helpers/fireAlert";
import callApi from "../../helpers/callApi";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const userToken = useSelector((state) => state.user.userToken);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const login = (values) => {
    callApi(userToken, "application/json")
      .post("/owners/auth/otp/verify", JSON.stringify(values))
      .then((data) => {
        if (data?.status == 200) {
          fireAlert(`Welcome Back`);
          navigate("/");
        } else {
          throw data.data;
        }
      })
      .catch((error) => {
        console.log("error", error);
        fireAlert(error?.response?.data?.message || error.message, "error");
      });
  };
  return (
    <Stack
      gap="16px"
      component="form"
      sx={{
        margin: "auto",
        justifyContent: "center",
        height: "100vh",
        background: `url("/images/login-background.png")`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
      onSubmit={handleSubmit(login)}
    >
      <Stack
        sx={{
          backgroundColor: "#ffffff30",
          width: "400px",
          margin: "auto",
          p: 3,
          borderRadius: 1,
        }}
        gap="16px"
      >
        <InputField
          label="Verify Otp"
          type="text"
          register={{ ...register("otp") }}
          moreSx={{ width: "100%", flex: "1" }}
        />
        <SubmitButton />
      </Stack>
    </Stack>
  );
};

export default VerifyOtp;
