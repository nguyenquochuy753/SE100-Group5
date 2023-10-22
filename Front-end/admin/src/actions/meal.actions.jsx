import axios from "../helpers/axios";
import { mealContants } from "./constants";

export const getMeal = () => {
  return async (dispatch) => {
    const res = await axios.get(`/meal/getAllMeals`);
    if (res.status === 200) {
      dispatch({
        type: mealContants.GET_MEALS,
        payload: res.data,
      });
    } else {
    }
  };
};

export const getMealById = (payload) => {
  return async (dispatch) => {
    const res = await axios.get(`/meal/getMeal/${payload}`);
    if (res.status === 200) {
      dispatch({
        type: mealContants.GET_MEAL_BY_ID,
        payload: res.data,
      });
    } else {
    }
  };
};

export const addMeal = (form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: mealContants.ADD_MEAL_REQUEST });
      const res = await axios.post(`/meal/addMeal`, form);
      if (res.status === 200) {
        dispatch({ type: mealContants.ADD_MEAL_SUCCESS });
        dispatch(getMeal());
      } else {
        dispatch({ type: mealContants.ADD_MEAL_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteMealById = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/meal/deleteMeal/${payload}`);
      dispatch({ type: mealContants.DELETE_MEAL_BY_ID_REQUEST });
      if (res.status === 202) {
        dispatch({ type: mealContants.DELETE_MEAL_BY_ID_SUCCESS });
        dispatch(getMeal());
      } else {
        const { error } = res.data;
        dispatch({
          type: mealContants.DELETE_MEAL_BY_ID_FAILURE,
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
