import axios from "../helpers/axios";
import { ingredientContants } from "./constants";

export const getIngredients = () => {
  return async (dispatch) => {
    const res = await axios.get(`/ingredient/getAllIngredient`);
    if (res.status === 200) {
      dispatch({
        type: ingredientContants.GET_INGREDIENTS,
        payload: res.data,
      });
    } else {
    }
  };
};
