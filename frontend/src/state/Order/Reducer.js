import * as actions from "./ActionType";

const initialState = {
  order: null,
  orders: [],
  notifications: [],
  loading: false,
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_ORDER_REQUEST:
    case actions.GET_USERS_ORDERS_REQUEST:
    case actions.GET_USERS_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actions.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        orders: [...state.orders, action.payload],
      };

    case actions.GET_USERS_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    case actions.GET_USERS_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: action.payload,
      };

    case actions.CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload
            ? { ...order, orderStatus: "CANCELLED" }
            : order
        ),
      };
    case actions.CANCEL_ORDER_FAILURE:
      return { ...state, error: action.payload };

    case actions.CREATE_ORDER_FAILURE:
    case actions.GET_USERS_ORDERS_FAILURE:
    case actions.GET_USERS_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
