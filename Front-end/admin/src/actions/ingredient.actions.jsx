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

export const addIngredient = (form) => {
  return async (dispatch) => {
    dispatch({ type: ingredientContants.ADD_INGREDIENT_REQUEST });
    try {
      const res = await axios.post(`/ingredient/addIngredient`, form);
      if (res.status === 200) {
        dispatch({
          type: ingredientContants.ADD_INGREDIENT_SUCCESS,
          payload: { category: res.data },
        });
      } else {
        dispatch({
          type: ingredientContants.ADD_INGREDIENT_FAILURE,
          payload: res.data,
        });
      }
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
  };
};
