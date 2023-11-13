import { ingredientContants } from "../actions/constants";

const initState = {
  ingredients: [],
  error: null,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ingredientContants.GET_INGREDIENTS:
      state = {
        ...state,
        ingredients: action.payload,
      };
      break;
    default:
      break;
  }
  return state;
};
