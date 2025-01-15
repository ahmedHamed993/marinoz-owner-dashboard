import { enqueueSnackbar } from "notistack";

const fireAlert = (msg, variant, vertical, horizontal) => {
  enqueueSnackbar(msg, {
    variant: variant ?? "success",
    anchorOrigin: {
      vertical: vertical ?? "top",
      horizontal: horizontal ?? "center",
    },
  });
};
export default fireAlert;
