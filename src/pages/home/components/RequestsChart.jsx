// mui
import { Divider, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";

const RequestsChart = () => {
  return (
    <Stack
      sx={{
        backgroundColor: "#fff",
        p: "1rem",
        borderRadius: "12px",
        flex: "1",
      }}
    >
      <Typography fontSize="16px" fontWeight="bold" sx={{ color: "#2B3674" }}>
        Number Of Requests
      </Typography>
      <Stack
        alignItems="center"
        sx={{
          "& > div": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <PieChart
          series={[
            {
              data: [
                { value: 10, color: "rgb(var(--primary-color))" },
                { value: 15, color: "rgba(var(--primary-color),.4)" },
                { value: 15, color: "rgba(var(--primary-color),.6)" },
              ],
            },
          ]}
          width={300}
          height={200}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        />
        <Stack
          direction="row"
          gap="16px"
          divider={<Divider flexItem orientation="vertical" />}
          sx={{
            boxShadow: "0px 18px 40px #7090B01F",
            width: "100%",
            padding: "1rem",
            borderRadius: "16px",
            marginTop: "16px",
          }}
        >
          <Stack flex="1">
            <Typography
              fontSize="14px"
              textAlign="center"
              sx={{ color: "rgb(var(--mid-gray))" }}
            >
              Accepted
            </Typography>
            <Typography
              textAlign="center"
              fontSize="24px"
              fontWeight="bold"
              sx={{ color: "rgb(var(--primary-color))" }}
            >
              60%
            </Typography>
          </Stack>
          <Stack flex="1">
            <Typography
              fontSize="14px"
              textAlign="center"
              sx={{ color: "rgb(var(--mid-gray))" }}
            >
              Pending
            </Typography>
            <Typography
              textAlign="center"
              fontSize="24px"
              fontWeight="bold"
              sx={{ color: "rgb(var(--primary-color))" }}
            >
              20%
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RequestsChart;
