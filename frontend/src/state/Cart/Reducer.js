import * as actions from "./ActionType";

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FIND_CART_REQUEST:
    case actions.CLEARED_CART_REQUEST:
    case actions.GET_ALL_CART_ITEMS_REQUEST:
    case actions.ADD_ITEM_TO_CART_REQUEST:
    case actions.UPDATE_CART_ITEM_REQUEST:
    case actions.REMOVE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actions.FIND_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        cartItems: action.payload.items,
      };

    case actions.CLEARED_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        cartItems: [],
      };

    case actions.GET_ALL_CART_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      };

    case actions.ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: [...state.cartItems, action.payload],
        cart: {
          ...state.cart,
          items: [...(state.cart?.items || []), action.payload],
        },
      };

    case actions.UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        cart: {
          ...state.cart,
          items: state.cart.items.map((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
        },
      };

    case actions.REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        cartItems: action.payload.items,
      };

    case actions.FIND_CART_FAILURE:
    case actions.CLEARED_CART_FAILURE:
    case actions.GET_ALL_CART_ITEMS_FAILURE:
    case actions.ADD_ITEM_TO_CART_FAILURE:
    case actions.UPDATE_CART_ITEM_FAILURE:
    case actions.REMOVE_CART_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
