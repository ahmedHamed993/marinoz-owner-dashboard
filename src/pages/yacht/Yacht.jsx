import { useState } from "react";
// redux
import { useSelector } from "react-redux";
// mui
import { Stack, Typography } from "@mui/material";
// components
import TabsFilter from "../../components/tabs-filter/TabsFilter";
import AddIconButton from "../../components/buttons/AddIconButton";
import DataTable from "../../components/data-table/DataTable";
import StatusChip from "../../components/status-chip/StatusChip";
import YachtAction from "./components/YachtAction";
// fetch
import { useQuery } from "@tanstack/react-query";
import callApi from "../../helpers/callApi";

const Yacht = () => {
  const userToken = useSelector((state) => state.user.userToken);
  const [activeTab, setActiveTab] = useState("all");
  const getYahcts = () => {
    return callApi(userToken, "application/json")
      .get(`/owners/yachts`)
      .then((data) => {
        if (data.status === 200) return data;
        throw data;
      });
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["yachts"],
    queryFn: getYahcts,
  });
  console.log("yachts data", data, error);

  if (isLoading) return <p>loading...</p>;
  return (
    <Stack>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <AddIconButton path="/yacht/add" />
      </Stack>
      {isError ? (
        <p>{error?.response?.data?.message || error.message}</p>
      ) : isLoading ? (
        <p>loading...</p>
      ) : (
        <Stack
          sx={{
            backgroundColor: "#fff",
            padding: "24px",
            mt: "32px",
            borderRadius: "12px",
          }}
        >
          <Typography
            fontSize="24px"
            color="#2B3674"
            fontWeight="600"
            mb="16px"
          >
            Yacht List
          </Typography>
          <DataTable rows={data?.data?.data || []} cols={cols} />
        </Stack>
      )}
    </Stack>
  );
};

export default Yacht;

const cols = [
  {
    label: "ID",
    dataKey: "id",
  },
  {
    label: "Yacht Type",
    dataKey: "yacht_type",
  },
  {
    label: "Country",
    dataKey: "country",
  },
  {
    label: "Capacity",
    dataKey: "capacity",
  },
  {
    label: "Boat Name",
    dataKey: "name",
  },
  {
    label: "Status",
    dataKey: "status",
    renderCell: (row) => {
      return <StatusChip value={row?.status} />;
    },
  },
  {
    label: "Actions",
    dataKey: "actions",
    renderCell: (row) => {
      return <YachtAction yachtId={row?.id} />;
    },
  },
];
