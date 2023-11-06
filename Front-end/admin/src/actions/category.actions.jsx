import axios from "../helpers/axios";
import { categoryContants } from "./constants";

export const getCategories = () => {
  return async (dispatch) => {
    const res = await axios.get(`/category/getAllCategories`);
    if (res.status === 200) {
      dispatch({
        type: categoryContants.GET_CATEGORIES,
        payload: res.data,
      });
    } else {
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryContants.ADD_CATEGORY_REQUEST });
    try {
      const res = await axios.post(`/category/addCategory`, form);
      if (res.status === 200) {
        dispatch({
          type: categoryContants.ADD_CATEGORY_SUCCESS,
          payload: { category: res.data },
        });
      } else {
        dispatch({
          type: categoryContants.ADD_CATEGORY_FAILURE,
          payload: res.data,
        });
      }
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
  };
};
