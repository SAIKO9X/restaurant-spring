import { isPresentInFavorites } from "../../config/logic";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  ADD_TO_FAVORITE_REQUEST,
  ADD_TO_FAVORITE_SUCCESS,
  ADD_TO_FAVORITE_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_FAILURE,
} from "./ActionType";

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: null,
  favorites: [],
  success: null,
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case ADD_TO_FAVORITE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        jwt: action.payload.jwt,
        success: "Register Success",
        isAuthenticated: true,
        error: null,
      };

    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null, success: null };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "E-mail de redefinição enviado",
        error: null,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "Senha redefinida com sucesso",
        error: null,
      };

    case FORGOT_PASSWORD_FAILURE:
    case RESET_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload, success: null };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        jwt: action.payload.jwt,
        success: "Login Success",
        isAuthenticated: true,
        error: null,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        favorites: action.payload.favorites,
        isAuthenticated: true,
        error: null,
      };

    case ADD_TO_FAVORITE_SUCCESS:
      return {
        ...state,
        loading: false,
        favorites: isPresentInFavorites(state.favorites, action.payload)
          ? state.favorites.filter((item) => item.id !== action.payload.id)
          : [action.payload, ...state.favorites],
        error: null,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case ADD_TO_FAVORITE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
        favorites: [],
        jwt: null,
        isAuthenticated: false,
        success: null,
      };

    default:
      return state;
  }
};
