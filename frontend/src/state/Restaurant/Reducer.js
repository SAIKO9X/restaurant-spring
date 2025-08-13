import * as actions from "./ActionType";

const initialState = {
  restaurants: [],
  restaurant: null,
  loading: false,
  error: null,
  events: [],
  restaurantsEvents: [],
  categories: [],
};

export const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_RESTAURANT_REQUEST:
    case actions.GET_ALL_RESTAURANTS_REQUEST:
    case actions.GET_RESTAURANT_BY_ID_REQUEST:
    case actions.GET_RESTAURANT_BY_USER_ID_REQUEST:
    case actions.DELETE_RESTAURANT_REQUEST:
    case actions.UPDATE_RESTAURANT_REQUEST:
    case actions.CREATE_EVENTS_REQUEST:
    case actions.GET_ALL_EVENTS_REQUEST:
    case actions.DELETE_EVENTS_REQUEST:
    case actions.GET_RESTAURANTS_EVENTS_REQUEST:
    case actions.CREATE_CATEGORY_REQUEST:
    case actions.GET_RESTAURANTS_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actions.CREATE_RESTAURANT_SUCCESS:
    case actions.GET_RESTAURANT_BY_ID_SUCCESS:
    case actions.GET_RESTAURANT_BY_USER_ID_SUCCESS:
    case actions.UPDATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurant: action.payload,
      };

    case actions.GET_ALL_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload,
      };

    case actions.DELETE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: state.restaurants.filter(
          (restaurant) => restaurant.id !== action.payload
        ),
        restaurant:
          state.restaurant && state.restaurant.id === action.payload
            ? null
            : state.restaurant,
      };

    case actions.CREATE_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: [...state.events, action.payload],
        restaurantsEvents: [...state.restaurantsEvents, action.payload],
      };

    case actions.GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };

    case actions.DELETE_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.events.filter((event) => event.id !== action.payload),
        restaurantsEvents: state.restaurantsEvents.filter(
          (event) => event.id !== action.payload
        ),
      };

    case actions.GET_RESTAURANTS_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurantsEvents: action.payload,
      };

    case actions.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
        restaurant: {
          ...state.restaurant,
          categories: [...(state.restaurant?.categories || []), action.payload],
        },
      };

    case actions.GET_RESTAURANTS_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };

    case actions.CREATE_RESTAURANT_FAILURE:
    case actions.GET_ALL_RESTAURANTS_FAILURE:
    case actions.GET_RESTAURANT_BY_ID_FAILURE:
    case actions.GET_RESTAURANT_BY_USER_ID_FAILURE:
    case actions.DELETE_RESTAURANT_FAILURE:
    case actions.UPDATE_RESTAURANT_FAILURE:
    case actions.CREATE_EVENTS_FAILURE:
    case actions.GET_ALL_EVENTS_FAILURE:
    case actions.DELETE_EVENTS_FAILURE:
    case actions.GET_RESTAURANTS_EVENTS_FAILURE:
    case actions.CREATE_CATEGORY_FAILURE:
    case actions.GET_RESTAURANTS_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
