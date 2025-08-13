import * as actions from "./ActionType";
import api, { API_RESTAURANT_URL } from "../../config/api";

export const createIngredientCategory =
  (ingredientCategoryRequest) => async (dispatch) => {
    dispatch({ type: actions.CREATE_INGREDIENT_CATEGORY_REQUEST });
    try {
      const { data } = await api.post(
        `${API_RESTAURANT_URL}/ingredients/category`,
        ingredientCategoryRequest,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      dispatch({
        type: actions.CREATE_INGREDIENT_CATEGORY_SUCCESS,
        payload: data,
      });

      console.log("create ingredient category success", data);
    } catch (error) {
      console.log("create ingredient category error", error);

      dispatch({
        type: actions.CREATE_INGREDIENT_CATEGORY_FAILURE,
        payload: error.message,
      });
    }
  };

export const createIngredientItem = (ingredientRequest) => async (dispatch) => {
  dispatch({ type: actions.CREATE_INGREDIENT_REQUEST });
  try {
    const { data } = await api.post(
      `${API_RESTAURANT_URL}/ingredients/item`,
      ingredientRequest,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    dispatch({ type: actions.CREATE_INGREDIENT_SUCCESS, payload: data });

    console.log("create ingredient item success", data);
  } catch (error) {
    console.log("create ingredient item error", error);

    dispatch({
      type: actions.CREATE_INGREDIENT_FAILURE,
      payload: error.message,
    });
  }
};

export const updateIngredientStock = (ingredientId) => async (dispatch) => {
  dispatch({ type: actions.UPDATE_STOCK_REQUEST });
  try {
    const { data } = await api.put(
      `${API_RESTAURANT_URL}/ingredients/${ingredientId}/stoke`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    dispatch({ type: actions.UPDATE_STOCK_SUCCESS, payload: data });

    console.log("update ingredient stock success", data);
  } catch (error) {
    console.log("update ingredient stock error", error);

    dispatch({ type: actions.UPDATE_STOCK_FAILURE, payload: error.message });
  }
};

export const getRestaurantIngredients = (restaurantId) => async (dispatch) => {
  dispatch({ type: actions.GET_INGREDIENTS_REQUEST });
  try {
    const { data } = await api.get(
      `${API_RESTAURANT_URL}/ingredients/restaurants/${restaurantId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    dispatch({ type: actions.GET_INGREDIENTS_SUCCESS, payload: data });

    console.log("get ingredients success", data);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    dispatch({
      type: actions.GET_INGREDIENTS_FAILURE,
      payload: error.message,
    });
  }
};

export const getIngredientCategories = (restaurantId) => async (dispatch) => {
  dispatch({ type: actions.GET_INGREDIENT_CATEGORY_REQUEST });
  try {
    const { data } = await api.get(
      `${API_RESTAURANT_URL}/ingredients/restaurants/${restaurantId}/category`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    dispatch({ type: actions.GET_INGREDIENT_CATEGORY_SUCCESS, payload: data });

    console.log("get ingredients categories success", data);
  } catch (error) {
    console.log("get ingredients categories error", error);

    dispatch({
      type: actions.GET_INGREDIENT_CATEGORY_FAILURE,
      payload: error.message,
    });
  }
};
