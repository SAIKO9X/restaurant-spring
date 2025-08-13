import * as actions from "./ActionType";

const initialState = {
  addresses: [],
  loading: false,
  error: null,
};

export const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_USER_ADDRESSES_REQUEST:
    case actions.ADD_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actions.GET_USER_ADDRESSES_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: action.payload,
      };

    case actions.ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: [...state.addresses, action.payload], // Adiciona o novo endereço, mas será atualizado pelo getUserAddresses
      };

    case actions.GET_USER_ADDRESSES_FAILURE:
    case actions.ADD_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
