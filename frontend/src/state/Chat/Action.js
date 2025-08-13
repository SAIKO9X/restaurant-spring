import api from "../../config/api";
import * as actions from "./ActionType";

export const createChat = (restaurantId) => async (dispatch) => {
  dispatch({ type: actions.CREATE_CHAT_REQUEST });
  try {
    const { data } = await api.post(
      `/api/chats?restaurantId=${restaurantId}`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      }
    );
    dispatch({ type: actions.CREATE_CHAT_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: actions.CREATE_CHAT_FAILURE, payload: error.message });
    throw error;
  }
};

export const sendMessage = (messageData) => async (dispatch) => {
  dispatch({ type: actions.SEND_MESSAGE_REQUEST });
  try {
    const { data } = await api.post(`/api/chats/send-message`, messageData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    dispatch({ type: actions.SEND_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actions.SEND_MESSAGE_FAILURE, payload: error.message });
  }
};

export const getChatMessages = (chatId) => async (dispatch) => {
  dispatch({ type: actions.GET_CHAT_MESSAGES_REQUEST });
  try {
    const { data } = await api.get(`/api/chats/${chatId}/messages`);
    dispatch({ type: actions.GET_CHAT_MESSAGES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actions.GET_CHAT_MESSAGES_FAILURE,
      payload: error.message,
    });
  }
};

export const getUsersChats = () => async (dispatch) => {
  dispatch({ type: actions.GET_USERS_CHATS_REQUEST });
  try {
    const { data } = await api.get(`/api/chats/user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    dispatch({ type: actions.GET_USERS_CHATS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actions.GET_USERS_CHATS_FAILURE, payload: error.message });
  }
};
