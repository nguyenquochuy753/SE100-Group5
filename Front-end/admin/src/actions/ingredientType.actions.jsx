import axios from "../helpers/axios";
import { ingredientTypeContants } from "./constants";

export const getIngredientTypes = () => {
  return async (dispatch) => {
    const res = await axios.get(`/ingredient_type/getAllIngredientType`);
    if (res.status === 200) {
      dispatch({
        type: ingredientTypeContants.GET_INGREDIENT_TYPE,
        payload: res.data,
      });
    } else {
    }
  };
};

export const addIngredientType = (form) => {
  return async (dispatch) => {
    dispatch({ type: ingredientTypeContants.ADD_INGREDIENT_TYPE_REQUEST });
    try {
      const res = await axios.post(`/ingredient_type/addIngredientType`, form);
      if (res.status === 200) {
        dispatch({
          type: ingredientTypeContants.ADD_INGREDIENT_TYPE_SUCCESS,
          payload: { category: res.data },
        });
      } else {
        dispatch({
          type: ingredientTypeContants.ADD_INGREDIENT_TYPE_FAILURE,
          payload: res.data,
        });
      }
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
  };
};
