import api, { API_RESTAURANT_URL } from "../../config/api";
import * as actions from "./ActionType";

export const getRestaurantsOrder =
  (restaurantId, orderStatus) => async (dispatch) => {
    dispatch({ type: actions.GET_RESTAURANTS_ORDER_REQUEST });

    try {
      const { data } = await api.get(
        `${API_RESTAURANT_URL}/order/restaurant/${restaurantId}`,
        {
          params: { order_status: orderStatus },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      dispatch({ type: actions.GET_RESTAURANTS_ORDER_SUCCESS, payload: data });
      console.log("get Restaurants Order success", data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: actions.GET_RESTAURANTS_ORDER_FAILURE,
        payload: error.message,
      });
    }
  };

export const updateOrderStatus = (orderId, orderStatus) => async (dispatch) => {
  dispatch({ type: actions.UPDATE_ORDER_STATUS_REQUEST });

  try {
    const { data } = await api.put(
      `${API_RESTAURANT_URL}/order/${orderId}/${orderStatus}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    dispatch({ type: actions.UPDATE_ORDER_STATUS_SUCCESS, payload: data });
    console.log("update Order Status success", data);
  } catch (error) {
    console.log("update Order Status error", error);
    dispatch({
      type: actions.UPDATE_ORDER_STATUS_FAILURE,
      payload: error.message,
    });
  }
};
