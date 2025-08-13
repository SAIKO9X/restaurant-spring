import api from "../../config/api";
import * as actions from "./ActionType";

export const getUserAddresses = () => async (dispatch) => {
  dispatch({ type: actions.GET_USER_ADDRESSES_REQUEST });

  try {
    const { data } = await api.get("/api/user/addresses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    dispatch({ type: actions.GET_USER_ADDRESSES_SUCCESS, payload: data });
    console.log("get user addresses success", data);
  } catch (error) {
    console.error("Erro ao buscar endereços:", error);
    dispatch({
      type: actions.GET_USER_ADDRESSES_FAILURE,
      payload: error.message,
    });
  }
};

export const addAddress = (addressData) => async (dispatch) => {
  dispatch({ type: actions.ADD_ADDRESS_REQUEST });

  try {
    const { data } = await api.post("/api/address", addressData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    dispatch({ type: actions.ADD_ADDRESS_SUCCESS, payload: data });
    console.log("add address success", data);
    dispatch(getUserAddresses());
  } catch (error) {
    console.error("Erro ao adicionar endereço:", error);
    dispatch({
      type: actions.ADD_ADDRESS_FAILURE,
      payload: error.message,
    });
  }
};
