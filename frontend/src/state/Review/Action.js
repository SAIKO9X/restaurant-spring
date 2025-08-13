import api from "../../config/api";
import * as actions from "./ActionType";

export const getRestaurantReviews = (restaurantId) => async (dispatch) => {
  dispatch({ type: actions.GET_RESTAURANT_REVIEWS_REQUEST });
  try {
    const { data } = await api.get(`/api/reviews/restaurant/${restaurantId}`);
    dispatch({ type: actions.GET_RESTAURANT_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actions.GET_RESTAURANT_REVIEWS_FAILURE,
      payload: error.message,
    });
  }
};

export const submitReview = (reviewData) => async (dispatch) => {
  dispatch({ type: actions.SUBMIT_REVIEW_REQUEST });
  try {
    const { data } = await api.post(`/api/reviews`, reviewData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    dispatch({ type: actions.SUBMIT_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actions.SUBMIT_REVIEW_FAILURE, payload: error.message });
  }
};
