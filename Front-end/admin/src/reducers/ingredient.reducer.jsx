import { ingredientContants } from "../actions/constants";

const initState = {
  ingredients: [],
  ingredient: {},
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
    case ingredientContants.GET_INGREDIENT_BY_ID:
      state = {
        ...state,
        ingredient: action.payload,
      };
      break;
    default:
      break;
  }
  return state;
};
