import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme/Theme";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./state/Authentication/Action";
import { findCart } from "./state/Cart/Action";
import { useNavigate } from "react-router-dom";
import { Routers } from "./routes/Routers";
import { getRestaurantByUserId } from "./state/Restaurant/Action";

export const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(navigate));
      dispatch(findCart());
      dispatch(getRestaurantByUserId());
    }
  }, [dispatch, jwt, navigate]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
};
