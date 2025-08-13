import * as actions from "./ActionType";

const initialState = {
  restaurants: [],
  loading: false,
  error: null,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_RESTAURANTS_ADMIN_REQUEST:
    case actions.APPROVE_RESTAURANT_REQUEST:
      return { ...state, loading: true, error: null };
    case actions.TOGGLE_RESTAURANT_STATUS_REQUEST:
      return { ...state, loading: true, error: null };

    case actions.GET_ALL_RESTAURANTS_ADMIN_SUCCESS:
      return { ...state, loading: false, restaurants: action.payload };

    case actions.APPROVE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: state.restaurants.map((r) =>
          r.id === action.payload.id ? action.payload : r
        ),
      };
    case actions.TOGGLE_RESTAURANT_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: state.restaurants.map((r) =>
          r.id === action.payload.id ? action.payload : r
        ),
      };

    case actions.GET_ALL_RESTAURANTS_ADMIN_FAILURE:
    case actions.APPROVE_RESTAURANT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case actions.TOGGLE_RESTAURANT_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
