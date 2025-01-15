import React, { useState } from "react";
import {useSelector} from "react-redux";
// mui
import { Stack } from "@mui/material";
// components
import AddIconButton from "../../components/buttons/AddIconButton";
import DataTable from "../../components/data-table/DataTable";
import StatusChip from "../../components/status-chip/StatusChip";
import SuitesActions from "./components/SuitesActions";
// fetch
import { useQuery } from "@apollo/client";
import { GET_SUITES } from "./queries";
import { Link } from "react-router";

const Suites = () => {
  const userData = useSelector((state) => state?.user?.userData);
  const { data, loading, error } = useQuery(GET_SUITES,{
      variables:{
        ownerId:userData?.id
      }
    });
    if (loading) return <p>loading...</p>;
    if (error) return <p>{error?.message}</p>;
    return (
        <Stack gap="24px">
          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <AddIconButton path="/suites/add" />
          </Stack>
          <DataTable rows={data?.suites || []} cols={cols} />
        </Stack>
      );
}

export default Suites;

const cols = [
    {
      label: "ID",
      dataKey: "id",
    },
    {
      label: "Suite Name",
      dataKey: "name",
    },
    // {
    //   label: "Description",
    //   dataKey: "description",
    // },
    {
      label: "Status",
      dataKey: "status",
      renderCell: (row) => <StatusChip value={row?.status} />,
    },
    {
      label: "Actions",
      dataKey: "actions",
      renderCell: (row) => {
        return <SuitesActions suiteId={row?.id} />;
      },
    },
  ];
  
