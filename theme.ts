import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4dd2ba",
    },
    secondary: {
      main: "#d85c79",
    },
    info: {
      main: "#4dd277",
    },
    success: {
      main: "#4da8d2",
    },
    warning: {
      main: "#ad2dc9",
    },
    background: {
      default: "#d8f4ef",
    },
  },
  shape: {
    borderRadius: 24,
  },
  typography: {
    fontFamily: "Montserrat",
  },
});
