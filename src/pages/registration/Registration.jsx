import React from "react";
// mui
import { Stack } from "@mui/material";
import RegisterForm from "./components/RegisterForm";
const Registration = () => {
  return (
    <Stack sx={{ minHeight: "100vh" }} direction="row">
      <Stack flex="1" alignItems="center" justifyContent="center">
        <img src="/images/logo.svg" style={{ marginBottom: "20px" }} />
        <RegisterForm />
      </Stack>
      <Stack
        flex="1"
        sx={{
          backgroundImage: "url('/images/login-background.png')",
          backgroundSize: "cover",
          borderRadius: "0 0 0 150px",
        }}
      ></Stack>
    </Stack>
  );
};

export default Registration;
