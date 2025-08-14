import * as actions from "./ActionType";
import api, { API_RESTAURANT_URL } from "../../config/api";

const getAuthorizationHeader = () => {
  const jwt = localStorage.getItem("jwt");
  return jwt ? { Authorization: `Bearer ${jwt}` } : {};
};

export const getAllRestaurants = () => async (dispatch) => {
  dispatch({ type: actions.GET_ALL_RESTAURANTS_REQUEST });
  try {
    const { data } = await api.get("/api/restaurants", {
      headers: {
        ...getAuthorizationHeader(),
      },
    });

    dispatch({ type: actions.GET_ALL_RESTAURANTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actions.GET_ALL_RESTAURANTS_FAILURE, payload: error });
  }
};

export const getRestaurantById = (request) => async (dispatch) => {
  dispatch({ type: actions.GET_RESTAURANT_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/restaurants/${request.restaurantId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    dispatch({ type: actions.GET_RESTAURANT_BY_ID_SUCCESS, payload: data });

    console.log("get restaurants by id success", data);
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.GET_RESTAURANT_BY_ID_FAILURE, payload: error });
    return null;
  }
};

export const getRestaurantByUserId = () => async (dispatch) => {
  dispatch({ type: actions.GET_RESTAURANT_BY_USER_ID_REQUEST });
  try {
    const { data } = await api.get(`${API_RESTAURANT_URL}/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    dispatch({
      type: actions.GET_RESTAURANT_BY_USER_ID_SUCCESS,
      payload: data,
    });

    console.log("get restaurants by user id success", data);
  } catch (error) {
    console.log("get restaurants by user id error", error);
    dispatch({
      type: actions.GET_RESTAURANT_BY_USER_ID_FAILURE,
      payload: error,
    });
    return null;
  }
};

export const createRestaurant =
  (restaurantData, navigate) => async (dispatch) => {
    dispatch({ type: actions.CREATE_RESTAURANT_REQUEST });

    try {
      const token = localStorage.getItem("jwt");

      if (!token) {
        throw new Error("Token não encontrado no localStorage");
      }

      const { data } = await api.post(`${API_RESTAURANT_URL}`, restaurantData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: actions.CREATE_RESTAURANT_SUCCESS, payload: data });

      console.log("create restaurant success", data);

      navigate("/admin/restaurants");
    } catch (error) {
      console.log("Error creating restaurant:", error);

      if (error.response && error.response.status === 403) {
        console.log(
          "Permissão negada. Verifique se o token tem as permissões adequadas."
        );
        navigate("/account/login");
      } else if (error.response && error.response.status === 401) {
        console.log("Token inválido ou expirado. Redirecionando para login.");
        navigate("/account/login");
      }

      dispatch({ type: actions.CREATE_RESTAURANT_FAILURE, payload: error });

      return null;
    }
  };

export const deleteRestaurant = (restaurantId) => async (dispatch) => {
  dispatch({ type: actions.DELETE_RESTAURANT_REQUEST });
  try {
    await api.delete(`${API_RESTAURANT_URL}/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    dispatch({
      type: actions.DELETE_RESTAURANT_SUCCESS,
      payload: restaurantId,
    });

    console.log("delete restaurant success", restaurantId);
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.DELETE_RESTAURANT_FAILURE, payload: error });
    return null;
  }
};

export const updateRestaurant =
  (restaurantId, updateData) => async (dispatch) => {
    dispatch({ type: actions.UPDATE_RESTAURANT_REQUEST });
    try {
      const { data } = await api.put(
        `${API_RESTAURANT_URL}/${restaurantId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      dispatch({ type: actions.UPDATE_RESTAURANT_SUCCESS, payload: data });

      console.log("update restaurant success", data);
    } catch (error) {
      console.log(error);
      dispatch({ type: actions.UPDATE_RESTAURANT_FAILURE, payload: error });
      return null;
    }
  };

export const updateRestaurantStatus = (restaurantId) => async (dispatch) => {
  dispatch({ type: actions.UPDATE_RESTAURANT_REQUEST });
  try {
    const { data } = await api.put(
      `${API_RESTAURANT_URL}/${restaurantId}/status`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    dispatch({ type: actions.UPDATE_RESTAURANT_SUCCESS, payload: data });

    console.log("update restaurant status success", data);
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.UPDATE_RESTAURANT_FAILURE, payload: error });
    return null;
  }
};

export const createCategory =
  (categoryData, restaurantId) => async (dispatch) => {
    dispatch({ type: actions.CREATE_CATEGORY_REQUEST });
    try {
      if (!restaurantId) {
        throw new Error("Restaurant ID is undefined");
      }

      const { data } = await api.post(
        `/api/my-restaurant/categories?restaurantId=${restaurantId}`,
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      dispatch({ type: actions.CREATE_CATEGORY_SUCCESS, payload: data });

      console.log("create category success", data);
    } catch (error) {
      console.log(error);
      dispatch({ type: actions.CREATE_CATEGORY_FAILURE, payload: error });
      return null;
    }
  };

export const getRestaurantCategories = (restaurantId) => async (dispatch) => {
  dispatch({ type: actions.GET_RESTAURANTS_CATEGORY_REQUEST });
  try {
    const { data } = await api.get(
      `/api/categories/restaurants?restaurantId=${restaurantId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    dispatch({ type: actions.GET_RESTAURANTS_CATEGORY_SUCCESS, payload: data });

    console.log("get restaurant categories success", data);
  } catch (error) {
    console.log("get restaurant categories error", error);
    dispatch({
      type: actions.GET_RESTAURANTS_CATEGORY_FAILURE,
      payload: error,
    });
    return null;
  }
};

export const getTopRatedRestaurants = (limit) => async (dispatch) => {
  dispatch({ type: actions.GET_TOP_RATED_RESTAURANTS_REQUEST });
  try {
    const { data } = await api.get(`/api/restaurants/top-rated?limit=${limit}`);
    dispatch({
      type: actions.GET_TOP_RATED_RESTAURANTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actions.GET_TOP_RATED_RESTAURANTS_FAILURE,
      payload: error.message,
    });
  }
};
