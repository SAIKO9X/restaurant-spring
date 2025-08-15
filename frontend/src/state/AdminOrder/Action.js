import api from "../../config/api";
import * as actions from "./ActionType";

export const getRestaurantsOrder = (orderStatus) => async (dispatch) => {
  dispatch({ type: actions.GET_RESTAURANTS_ORDER_REQUEST });

  try {
    const { data } = await api.get(
      `/api/my-restaurant/order`, // Rota corrigida e simplificada
      {
        params: { order_status: orderStatus },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    dispatch({ type: actions.GET_RESTAURANTS_ORDER_SUCCESS, payload: data });
  } catch (error) {
    console.error("Erro ao buscar pedidos do restaurante:", error);
    dispatch({
      type: actions.GET_RESTAURANTS_ORDER_FAILURE,
      payload: error.message,
    });
  }
};

export const updateOrderStatus = (orderId, orderStatus) => async (dispatch) => {
  dispatch({ type: actions.UPDATE_ORDER_STATUS_REQUEST });

  try {
    const { data } = await api.put(
      `/api/my-restaurant/order/${orderId}/${orderStatus}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    dispatch({ type: actions.UPDATE_ORDER_STATUS_SUCCESS, payload: data });
  } catch (error) {
    console.error("Erro ao atualizar status do pedido:", error);
    dispatch({
      type: actions.UPDATE_ORDER_STATUS_FAILURE,
      payload: error.message,
    });
  }
};
