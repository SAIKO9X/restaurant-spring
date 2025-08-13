import api from "../../config/api";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  ADD_TO_FAVORITE_REQUEST,
  ADD_TO_FAVORITE_SUCCESS,
  ADD_TO_FAVORITE_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "./ActionType";

export const register = (request) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await api.post("/auth/register", request.userData);

    if (data.jwt) {
      dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
      request.navigate("/account/login");
    }
  } catch (error) {
    console.error("register error", error);
    dispatch({ type: REGISTER_FAILURE, payload: error });
  }
};

export const login = (request) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await api.post("/auth/login", request.userData);

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
      dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });

      if (data.role === "ROLE_RESTAURANT_OWNER") {
        request.navigate("/admin/restaurants");
      } else {
        request.navigate("/");
      }
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Erro ao fazer login";
    dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
    throw new Error(errorMessage);
  }
};

export const getUser = (navigate) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  try {
    const { data } = await api.get("/api/users/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      navigate("/account/login");
    } else {
      console.log("get user error", error);
      dispatch({ type: GET_USER_FAILURE, payload: error });
    }
  }
};

export const addRestaurantToFavorites = (restaurantId) => async (dispatch) => {
  dispatch({ type: ADD_TO_FAVORITE_REQUEST });
  try {
    const { data } = await api.put(
      `/api/restaurants/${restaurantId}/favorites`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data });
    console.log("Add to Favorites Success", data);
  } catch (error) {
    dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error });
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.clear();
  delete api.defaults.headers.common["Authorization"];
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST });
  try {
    await api.post("/auth/forgot-password", { email });
    dispatch({ type: FORGOT_PASSWORD_SUCCESS });
  } catch (error) {
    const errorMessage =
      error.response?.data || "Erro desconhecido ao enviar e-mail";
    dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: errorMessage });
    throw new Error(errorMessage);
  }
};

export const resetPassword = (token, newPassword) => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  try {
    await api.post("/auth/reset-password", null, {
      params: { token, newPassword },
    });
    dispatch({ type: RESET_PASSWORD_SUCCESS });
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Erro ao redefinir senha";
    dispatch({ type: RESET_PASSWORD_FAILURE, payload: errorMessage });
  }
};
