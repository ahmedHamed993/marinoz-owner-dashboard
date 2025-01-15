import React from "react";
// mui
import { Stack } from "@mui/material";
import LoginForm from "./components/LoginForm";
const Login = () => {
  return (
    <Stack sx={{ minHeight: "100vh" }} direction="row">
      <Stack flex="1" alignItems="center" justifyContent="center">
        <img src="/images/logo.svg" style={{ marginBottom: "20px" }} />
        <LoginForm />
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

export default Login;
