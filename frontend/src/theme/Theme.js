import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#dcca87",
    },
    background: {
      default: "#000",
      paper: "#000",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#dcca87",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#dcca87",
            },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: "#dcca87",
            },
          },
        },
      },
    },
  },
});
