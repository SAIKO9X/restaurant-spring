import * as actions from "./ActionType";

const initialState = {
  adminOrders: [],
  loading: false,
  error: null,
};

export const adminOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_RESTAURANTS_ORDER_REQUEST:
    case actions.UPDATE_ORDER_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actions.GET_RESTAURANTS_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        adminOrders: action.payload,
      };

    case actions.UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        adminOrders: state.adminOrders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
      };

    case actions.GET_RESTAURANTS_ORDER_FAILURE:
    case actions.UPDATE_ORDER_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
