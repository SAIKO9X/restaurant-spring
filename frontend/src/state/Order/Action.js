import * as actions from "./ActionType";
import api from "../../config/api";

export const createOrder = (orderRequest) => async (dispatch) => {
  dispatch({ type: actions.CREATE_ORDER_REQUEST });

  try {
    const { data } = await api.post("/api/order", orderRequest, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    if (data.payment_url) {
      window.location.href = data.payment_url;
    }

    dispatch({ type: actions.CREATE_ORDER_SUCCESS, payload: data });

    console.log("create order success", data);
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.log("create order error", errorMessage);
    dispatch({ type: actions.CREATE_ORDER_FAILURE, payload: errorMessage });
  }
};

export const getUsersOrders = () => async (dispatch) => {
  dispatch({ type: actions.GET_USERS_ORDERS_REQUEST });

  try {
    const { data } = await api.get("/api/order/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    dispatch({ type: actions.GET_USERS_ORDERS_SUCCESS, payload: data });

    console.log("create order success", data);
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.log("create order error", errorMessage);
    dispatch({
      type: actions.GET_USERS_ORDERS_FAILURE,
      payload: error.message,
    });
  }
};

export const getUsersNotifications = () => async (dispatch) => {
  dispatch({ type: actions.GET_USERS_NOTIFICATION_REQUEST });
  try {
    const { data } = await api.get("/api/notifications", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    dispatch({ type: actions.GET_USERS_NOTIFICATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actions.GET_USERS_NOTIFICATION_FAILURE,
      payload: error.message,
    });
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  dispatch({ type: actions.CANCEL_ORDER_REQUEST });
  try {
    await api.put(
      `/api/order/${orderId}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    dispatch({ type: actions.CANCEL_ORDER_SUCCESS, payload: orderId });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: actions.CANCEL_ORDER_FAILURE, payload: errorMessage });
  }
};
