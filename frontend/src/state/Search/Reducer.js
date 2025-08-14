import * as actions from "./ActionType";

const initialState = {
  results: {
    restaurants: [],
    foods: [],
  },
  loading: false,
  error: null,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SEARCH_ALL_REQUEST:
      return { ...state, loading: true, error: null };
    case actions.SEARCH_ALL_SUCCESS:
      return { ...state, loading: false, results: action.payload };
    case actions.SEARCH_ALL_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
