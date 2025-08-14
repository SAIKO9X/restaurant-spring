import api from "../../config/api";
import * as actions from "./ActionType";

export const searchAll = (keyword) => async (dispatch) => {
  dispatch({ type: actions.SEARCH_ALL_REQUEST });
  try {
    const { data } = await api.get(`/api/search?q=${keyword}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    dispatch({ type: actions.SEARCH_ALL_SUCCESS, payload: data });
    console.log("Search results:", data);
  } catch (error) {
    dispatch({ type: actions.SEARCH_ALL_FAILURE, payload: error.message });
  }
};
