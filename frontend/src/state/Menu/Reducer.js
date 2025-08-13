import * as actions from "./ActionType";

const initialState = {
  menuItems: [],
  loading: false,
  error: null,
  search: [],
  topOrderedFoods: [],
  loadingTopOrdered: false,
  errorTopOrdered: null,
};

export const menuItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_MENU_ITEM_REQUEST:
    case actions.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
    case actions.DELETE_MENU_ITEM_REQUEST:
    case actions.SEARCH_MENU_ITEM_REQUEST:
    case actions.UPDATE_MENU_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actions.CREATE_MENU_ITEM_SUCCESS:
      return {
        ...state,
        menuItems: [...state.menuItems, action.payload],
        loading: false,
        error: null,
      };

    case actions.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
      return {
        ...state,
        menuItems: action.payload,
        loading: false,
        error: null,
      };

    case actions.DELETE_MENU_ITEM_SUCCESS:
      return {
        ...state,
        menuItems: state.menuItems.filter((item) => item.id !== action.payload),
        loading: false,
        error: null,
      };

    case actions.SEARCH_MENU_ITEM_SUCCESS:
      return {
        ...state,
        search: action.payload,
        loading: false,
        error: null,
      };

    case actions.UPDATE_MENU_ITEM_SUCCESS:
      return {
        ...state,
        menuItems: state.menuItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
        error: null,
      };

    case actions.GET_TOP_ORDERED_FOODS_REQUEST:
      return {
        ...state,
        loadingTopOrdered: true,
        errorTopOrdered: null,
      };
    case actions.GET_TOP_ORDERED_FOODS_SUCCESS:
      return {
        ...state,
        loadingTopOrdered: false,
        topOrderedFoods: action.payload,
      };
    case actions.GET_TOP_ORDERED_FOODS_FAILURE:
      return {
        ...state,
        loadingTopOrdered: false,
        errorTopOrdered: action.payload,
      };

    case actions.CREATE_MENU_ITEM_FAILURE:
    case actions.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
    case actions.DELETE_MENU_ITEM_FAILURE:
    case actions.SEARCH_MENU_ITEM_FAILURE:
    case actions.UPDATE_MENU_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
