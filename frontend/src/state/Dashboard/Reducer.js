import * as actions from "./Action";

const initialState = {
  analytics: null,
  loading: false,
  error: null,
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_DASHBOARD_ANALYTICS_REQUEST:
      return { ...state, loading: true, error: null };
    case actions.GET_DASHBOARD_ANALYTICS_SUCCESS:
      return { ...state, loading: false, analytics: action.payload };
    case actions.GET_DASHBOARD_ANALYTICS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
