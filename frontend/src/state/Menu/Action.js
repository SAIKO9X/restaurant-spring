import * as actions from "./ActionType";
import api from "../../config/api";

export const createMenuItem = (menuItemData) => async (dispatch) => {
  dispatch({ type: actions.CREATE_MENU_ITEM_REQUEST });
  try {
    const { data } = await api.post(
      "/api/admin/foods",
      menuItemData.menuItemData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    dispatch({ type: actions.CREATE_MENU_ITEM_SUCCESS, payload: data });

    console.log("create menu item success", data);
  } catch (error) {
    console.log("create menu item error", error);
    dispatch({ type: actions.CREATE_MENU_ITEM_FAILURE, payload: error });
    return null;
  }
};

export const deleteMenuItem = (menuItemId) => async (dispatch) => {
  dispatch({ type: actions.DELETE_MENU_ITEM_REQUEST });
  try {
    await api.delete(`/api/admin/foods/${menuItemId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    dispatch({ type: actions.DELETE_MENU_ITEM_SUCCESS, payload: menuItemId });

    console.log("delete menu item success", menuItemId);
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.DELETE_MENU_ITEM_FAILURE, payload: error });
    return null;
  }
};

export const searchMenuItem = (keyword) => async (dispatch) => {
  dispatch({ type: actions.SEARCH_MENU_ITEM_REQUEST });
  try {
    const { data } = await api.get(`/api/foods/search`, {
      params: { name: keyword },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    dispatch({ type: actions.SEARCH_MENU_ITEM_SUCCESS, payload: data });

    console.log("search menu item success", data);
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.SEARCH_MENU_ITEM_FAILURE, payload: error });
    return null;
  }
};

export const updateMenuItemAvailability = (menuItemId) => async (dispatch) => {
  dispatch({ type: actions.UPDATE_MENU_ITEM_REQUEST });
  try {
    const { data } = await api.put(
      `/api/admin/foods/${menuItemId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    dispatch({ type: actions.UPDATE_MENU_ITEM_SUCCESS, payload: data });

    console.log("update menu item availability success", data);
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.UPDATE_MENU_ITEM_FAILURE, payload: error });
    return null;
  }
};

export const getTopOrderedFoods = (limit) => async (dispatch) => {
  dispatch({ type: actions.GET_TOP_ORDERED_FOODS_REQUEST });
  try {
    const { data } = await api.get(`/api/foods/top-ordered?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    dispatch({ type: actions.GET_TOP_ORDERED_FOODS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actions.GET_TOP_ORDERED_FOODS_FAILURE,
      payload: error.message,
    });
  }
};

export const updateMenuItem =
  ({ menuItemId, menuItemData }) =>
  async (dispatch) => {
    dispatch({ type: actions.UPDATE_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.put(
        `/api/admin/foods/edit/${menuItemId}`,
        menuItemData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      dispatch({ type: actions.UPDATE_MENU_ITEM_SUCCESS, payload: data });
      console.log("update menu item success", data);
    } catch (error) {
      console.log("update menu item error", error);
      dispatch({ type: actions.UPDATE_MENU_ITEM_FAILURE, payload: error });
    }
  };

export const getMenuItemsByRestaurantId =
  (restaurantId, filters) => async (dispatch) => {
    dispatch({ type: actions.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });

    try {
      const { data } = await api.get(`/api/foods/restaurant/${restaurantId}`, {
        params: filters,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      dispatch({
        type: actions.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: actions.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
        payload: error,
      });
      return null;
    }
  };
