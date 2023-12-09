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

export const getIngredientById = (payload) => {
  return async (dispatch) => {
    const res = await axios.get(`/ingredient/getIngredient/${payload}`);
    if (res.status === 200) {
      dispatch({
        type: ingredientContants.GET_INGREDIENT_BY_ID,
        payload: res.data,
      });
    } else {
    }
  };
};

export const updateIngredient = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `/ingredient/updateIngredient/${payload.id}`,
        {
          ten_nguyen_lieu: payload.ten_nguyen_lieu,
          khoi_luong_ton: payload.khoi_luong_ton,
          ma_loai_nguyen_lieu: payload.ma_loai_nguyen_lieu,
        }
      );
      dispatch({
        type: ingredientContants.UPDATE_INGREDIENT_BY_ID_REQUEST,
      });
      if (res.status === 200) {
        dispatch({
          type: ingredientContants.UPDATE_INGREDIENT_BY_ID_SUCCESS,
        });
        dispatch(getIngredients());
      } else {
        const { error } = res.data;
        dispatch({
          type: ingredientContants.UPDATE_INGREDIENT_BY_ID_FAILURE,
          payload: {
            error,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteIngredientById = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/ingredient/deleteIngredient/${payload}`);
      dispatch({
        type: ingredientContants.DELETE_INGREDIENT_BY_ID_REQUEST,
      });
      if (res.status === 200) {
        dispatch({
          type: ingredientContants.DELETE_INGREDIENT_BY_ID_SUCCESS,
        });
        dispatch(getIngredients());
      } else {
        const { error } = res.data;
        dispatch({
          type: ingredientContants.DELETE_INGREDIENT_BY_ID_FAILURE,
          payload: {
            error,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
