import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: ["Lato"].join(","),
  },
  palette: {
    primary: {
      main: "rgb(var(--primary-color))",
    },
  },
  components: {
    MuiButton: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true, // Disable ripple effect globally
          disableElevation: true,
        },
      },
      styleOverrides: {
        root: {
          boxShadow: "none", // Disable elevation (shadow)
          "&:hover": {
            boxShadow: "none", // Disable hover elevation
            backgroundColor: "inherit",
          },
          "&:focus": {
            boxShadow: "none", // Disable focus elevation
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: "#fff",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      },
    },
  },
  // Adding global CSS variable styling
  css: {
    ":root": {
      "--primary-color": " 196, 125, 96",
      "--alert": "240, 30, 30",
      "--success": "3, 152, 85",
      "--yellow": "255, 209, 48",
      "--light-gray": " 225, 215, 210",
      "--mid-gray": " 97, 92, 90",
      "--dark-gray": " 70, 67, 67",
      "--gray-50": " 245, 242, 240",
      "--gray-100": " 235, 230, 225",
      "--gray-200": " 225, 215, 210",
      "--gray-300": " 200, 190, 185",
      "--gray-400": " 160, 150, 145",
      "--gray-500": " 128, 120, 115",
      "--gray-600": " 97, 92, 90",
      "--gray-700": " 85, 80, 78",
      "--gray-800": " 78, 74, 72",
      "--gray-900": " 70, 67, 67",
      "--gray-950": " 50, 48, 47",
    },
  },
});
