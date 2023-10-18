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

// export const addMeal = (form) => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: mealContants.ADD_MEAL_REQUEST });
//       const res = await axios.post(`/meal/addMeal`, form);
//       if (res.status === 201) {
//         dispatch({ type: mealContants.ADD_MEAL_SUCCESS });
//         dispatch(getMeal());
//       } else {
//         dispatch({ type: mealContants.ADD_MEAL_FAILURE });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     const res = await axios.post(`product/create`, form);
//     console.log(res);
//   };
// };
