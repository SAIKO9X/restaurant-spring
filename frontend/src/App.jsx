import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./state/Authentication/Action";
import { findCart } from "./state/Cart/Action";
import { Routers } from "./routes/Routers";
import { getRestaurantByUserId } from "./state/Restaurant/Action";

export const App = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser());
    }
  }, [dispatch, jwt]);

  useEffect(() => {
    if (auth.user) {
      if (auth.user.role === "ROLE_RESTAURANT_OWNER") {
        dispatch(getRestaurantByUserId());
      }
      dispatch(findCart());
    }
  }, [auth.user, dispatch]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
};
