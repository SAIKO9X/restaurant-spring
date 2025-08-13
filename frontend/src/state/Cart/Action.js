import * as actions from "./ActionType";
import api from "../../config/api";

export const findCart = () => async (dispatch) => {
  const jwt = localStorage.getItem("jwt");

  if (!jwt) {
    return;
  }

  dispatch({ type: actions.FIND_CART_REQUEST });

  try {
    const { data } = await api.get("/api/cart", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: actions.FIND_CART_SUCCESS, payload: data });
  } catch (error) {
    console.log("Erro na requisição findCart:", error);
    dispatch({ type: actions.FIND_CART_FAILURE, payload: error.message });
  }
};

export const clearCart = () => async (dispatch) => {
  dispatch({ type: actions.CLEARED_CART_REQUEST });

  try {
    const { data } = await api.put("/api/cart/clear", null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    dispatch({ type: actions.CLEARED_CART_SUCCESS, payload: data });

    console.log("clear Cart success", data);
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.CLEARED_CART_FAILURE, payload: error.message });
  }
};

export const getAllCartItems = () => async (dispatch) => {
  dispatch({ type: actions.GET_ALL_CART_ITEMS_REQUEST });

  try {
    const { data } = await api.get("/api/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    dispatch({ type: actions.GET_ALL_CART_ITEMS_SUCCESS, payload: data });

    console.log("get All Cart Items success", data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_ALL_CART_ITEMS_FAILURE,
      payload: error.message,
    });
  }
};

export const addItemToCart = (item) => async (dispatch) => {
  dispatch({ type: actions.ADD_ITEM_TO_CART_REQUEST });

  try {
    const { data } = await api.post("/api/cart/add", item, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    dispatch({ type: actions.ADD_ITEM_TO_CART_SUCCESS, payload: data });

    console.log("add item to cart success", data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.ADD_ITEM_TO_CART_FAILURE,
      payload: error.message,
    });
  }
};

export const updateCartItem = (item) => async (dispatch) => {
  dispatch({ type: actions.UPDATE_CART_ITEM_REQUEST });

  try {
    const { data } = await api.put("/api/cart_item/update", item, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    dispatch({ type: actions.UPDATE_CART_ITEM_SUCCESS, payload: data });

    console.log("update cart item success", data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.UPDATE_CART_ITEM_FAILURE,
      payload: error.message,
    });
  }
};

export const removeCartItem = (cartItemId) => async (dispatch) => {
  dispatch({ type: actions.REMOVE_CART_ITEM_REQUEST });

  try {
    const { data } = await api.delete(`/api/cart_item/${cartItemId}/remove`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    dispatch({ type: actions.REMOVE_CART_ITEM_SUCCESS, payload: data });

    console.log("remove cart item success", data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.REMOVE_CART_ITEM_FAILURE,
      payload: error.message,
    });
  }
};
