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

export const getIngredientTypeById = (payload) => {
  return async (dispatch) => {
    const res = await axios.get(
      `/ingredient_type/getIngredientType/${payload}`
    );
    if (res.status === 200) {
      dispatch({
        type: ingredientTypeContants.GET_INGREDIENT_TYPE_BY_ID,
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

export const updateIngredientType = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `/ingredient_type/updateIngredientType/${payload.id}`,
        {
          ten_loai_nguyen_lieu: payload.ten_loai_nguyen_lieu,
        }
      );
      dispatch({
        type: ingredientTypeContants.UPDATE_INGREDIENT_TYPE_BY_ID_REQUEST,
      });
      if (res.status === 200) {
        dispatch({
          type: ingredientTypeContants.UPDATE_INGREDIENT_TYPE_BY_ID_SUCCESS,
        });
        dispatch(getIngredientTypes());
      } else {
        const { error } = res.data;
        dispatch({
          type: ingredientTypeContants.UPDATE_INGREDIENT_TYPE_BY_ID_FAILURE,
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

export const deleteIngredientTypeById = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `/ingredient_type/deleteIngredientType/${payload}`
      );
      dispatch({
        type: ingredientTypeContants.DELETE_INGREDIENT_TYPE_BY_ID_REQUEST,
      });
      if (res.status === 200) {
        dispatch({
          type: ingredientTypeContants.DELETE_INGREDIENT_TYPE_BY_ID_SUCCESS,
        });
        dispatch(getIngredientTypes());
      } else {
        const { error } = res.data;
        dispatch({
          type: ingredientTypeContants.DELETE_INGREDIENT_TYPE_BY_ID_FAILURE,
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
