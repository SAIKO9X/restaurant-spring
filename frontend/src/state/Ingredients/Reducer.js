import * as actions from "./ActionType";

const initialState = {
  categories: [],
  ingredients: [],
  update: null,
  loading: false,
  error: null,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_INGREDIENT_CATEGORY_REQUEST:
    case actions.CREATE_INGREDIENT_REQUEST:
    case actions.UPDATE_STOCK_REQUEST:
    case actions.GET_INGREDIENTS_REQUEST:
    case actions.GET_INGREDIENT_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actions.CREATE_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
      };

    case actions.CREATE_INGREDIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        ingredients: [...state.ingredients, action.payload],
      };

    case actions.UPDATE_STOCK_SUCCESS:
      return {
        ...state,
        loading: false,
        update: action.payload,
        ingredients: state.ingredients.map((ingredient) =>
          ingredient.id === action.payload.id ? action.payload : ingredient
        ),
      };

    case actions.GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        ingredients: action.payload,
      };

    case actions.GET_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };

    case actions.CREATE_INGREDIENT_CATEGORY_FAILURE:
    case actions.CREATE_INGREDIENT_FAILURE:
    case actions.UPDATE_STOCK_FAILURE:
    case actions.GET_INGREDIENTS_FAILURE:
    case actions.GET_INGREDIENT_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
