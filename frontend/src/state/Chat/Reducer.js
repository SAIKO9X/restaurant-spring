import * as actions from "./ActionType";

const initialState = {
  chats: [],
  messages: [],
  loading: false,
  error: null,
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_CHAT_REQUEST:
    case actions.GET_CHAT_MESSAGES_REQUEST:
    case actions.SEND_MESSAGE_REQUEST:
    case actions.GET_USERS_CHATS_REQUEST:
      return { ...state, loading: true, error: null };
    case actions.GET_RESTAURANTS_CHATS_REQUEST:
      return { ...state, loading: true, error: null };

    case actions.CREATE_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: [...state.chats, action.payload],
      };
    case actions.GET_CHAT_MESSAGES_SUCCESS:
      return { ...state, loading: false, messages: action.payload };
    case actions.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: [...state.messages, action.payload],
      };
    case actions.GET_USERS_CHATS_SUCCESS:
      return { ...state, loading: false, chats: action.payload };
    case actions.GET_RESTAURANTS_CHATS_SUCCESS:
      return { ...state, loading: false, chats: action.payload };

    case actions.CREATE_CHAT_FAILURE:
    case actions.GET_CHAT_MESSAGES_FAILURE:
    case actions.SEND_MESSAGE_FAILURE:
    case actions.GET_USERS_CHATS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case actions.GET_RESTAURANTS_CHATS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
