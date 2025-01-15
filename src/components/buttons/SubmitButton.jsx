import { Button } from "@mui/material";

const SubmitButton = ({ label = "Submit", disabled }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{
        borderRadius: ".5rem",
        textTransform: "capitalize",
        width: "100%",
        color: "#fff",
        "&:hover": { backgroundColor: "rgb(var(--primary-color))" },
      }}
      disabled={disabled}
      size="large"
      disableElevation
      disableRipple
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
