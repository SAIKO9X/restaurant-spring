import api from "../../config/api";
import * as actions from "./ActionType";

export const fetchAllRestaurantsAdmin = () => async (dispatch) => {
  dispatch({ type: actions.GET_ALL_RESTAURANTS_ADMIN_REQUEST });
  try {
    const { data } = await api.get(`/api/admin/restaurants`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    dispatch({
      type: actions.GET_ALL_RESTAURANTS_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actions.GET_ALL_RESTAURANTS_ADMIN_FAILURE,
      payload: error.message,
    });
  }
};

export const approveRestaurant = (restaurantId) => async (dispatch) => {
  dispatch({ type: actions.APPROVE_RESTAURANT_REQUEST });
  try {
    const { data } = await api.put(
      `/api/admin/restaurants/${restaurantId}/approve`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      }
    );
    dispatch({ type: actions.APPROVE_RESTAURANT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actions.APPROVE_RESTAURANT_FAILURE,
      payload: error.message,
    });
  }
};
