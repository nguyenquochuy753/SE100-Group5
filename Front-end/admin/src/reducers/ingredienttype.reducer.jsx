import { ingredientTypeContants } from "../actions/constants";

const initState = {
  ingredientTypes: [],
  error: null,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ingredientTypeContants.GET_INGREDIENT_TYPE:
      state = {
        ...state,
        ingredientTypes: action.payload,
      };
      break;
    default:
      break;
  }
  return state;
};
