import { cartContants } from "../actions/constants";

const initState = {
  carts: [],
  loading: false,
  error: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case cartContants.ADD_MEAL_TO_CART:
      state = {
        ...state,
        carts: action.payload,
      };
      break;
    default:
      break;
  }
  return state;
};
