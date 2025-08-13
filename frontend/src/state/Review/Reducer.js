import * as actions from "./ActionType";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_RESTAURANT_REVIEWS_REQUEST:
    case actions.SUBMIT_REVIEW_REQUEST:
      return { ...state, loading: true, error: null };

    case actions.GET_RESTAURANT_REVIEWS_SUCCESS:
      return { ...state, loading: false, reviews: action.payload };

    case actions.SUBMIT_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: [...state.reviews, action.payload],
      };

    case actions.GET_RESTAURANT_REVIEWS_FAILURE:
    case actions.SUBMIT_REVIEW_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
