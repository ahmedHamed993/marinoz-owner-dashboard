import React, { Suspense } from "react";
// components
import Sidebar from "../sidebar/Sidebar";
import Loader from "../loader/Loader";
import AppHeader from "../app-header/AppHeader";
// router
import { Outlet } from "react-router";
// styles
import styles from "./MainLayout.module.css";
// mui
import { Stack, Container } from "@mui/material";
const MainLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      {/* <div className={`container`}> */}
      <Stack width="100%">
        <AppHeader />
        <div className="container">
          <div className={`${styles.pages_container}`}>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </Stack>
      {/* </div> */}
    </div>
  );
};

export default MainLayout;
