import { cartContants } from "./constants";

export const addMealToCart = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartContants.ADD_MEAL_TO_CART, payload: payload });
    } catch (error) {
      console.log(error);
    }
  };
};
