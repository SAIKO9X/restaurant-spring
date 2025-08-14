import api from "../../config/api";

export const GET_DASHBOARD_ANALYTICS_REQUEST =
  "GET_DASHBOARD_ANALYTICS_REQUEST";
export const GET_DASHBOARD_ANALYTICS_SUCCESS =
  "GET_DASHBOARD_ANALYTICS_SUCCESS";
export const GET_DASHBOARD_ANALYTICS_FAILURE =
  "GET_DASHBOARD_ANALYTICS_FAILURE";

export const fetchDashboardAnalytics =
  (startDate, endDate) => async (dispatch) => {
    dispatch({ type: GET_DASHBOARD_ANALYTICS_REQUEST });
    try {
      const { data } = await api.get(`/api/my-restaurant/order/analytics`, {
        params: { startDate, endDate },
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      dispatch({ type: GET_DASHBOARD_ANALYTICS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_DASHBOARD_ANALYTICS_FAILURE,
        payload: error.message,
      });
    }
  };
