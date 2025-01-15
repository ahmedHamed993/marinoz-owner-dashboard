import React from "react";
// router
import { Link } from "react-router";
// mui
import { Container, Stack, Typography, IconButton } from "@mui/material";
// icons
import { FaCircleUser } from "react-icons/fa6";
import { FiBell } from "react-icons/fi";
import GlobalSearch from "../search/GlobalSearch";
import AddButton from "../buttons/AddButton";
import { useSelector } from "react-redux";
const AppHeader = () => {
  const userData = useSelector(state => state.user.userData)
  const user = {
    name: "Marci",
  };
  return (
    <Stack width="100%" py={2} sx={{ borderBottom: "1px solid #ddd" }}>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Stack>
          <Typography variant="h6" fontWeight="bold" color="primary">
            Welcome Back, {userData.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "rgb(var(--mid-gray))" }}>
            Here is the information about  your Business
          </Typography>
        </Stack>
        <Stack
          direction="row"
          gap="8px"
          alignItems="center"
          sx={{
            backgroundColor: "#fff",
            p: "10px",
            borderRadius: "60px",
            boxShadow: "14px 8px 20px 4px #7090B014",
          }}
        >
          {/* <AddButton label="Add Tour" to="/trips/add" /> */}
          {/* <GlobalSearch /> */}
          {/* <IconButton>
            <FiBell />
          </IconButton> */}
          {/* <Link href="/profile">
            {" "}
            <FaCircleUser size={32} />
          </Link> */}
        </Stack>
      </div>
    </Stack>
  );
};

export default AppHeader;
