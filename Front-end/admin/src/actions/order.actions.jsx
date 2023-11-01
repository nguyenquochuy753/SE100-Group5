import { orderContants } from "./constants";
import axios from "../helpers/axios";

export const getOrders = () => {
  return async (dispatch) => {
    const res = await axios.get(`/placeOrder/getAllPlaceOrders`);
    if (res.status === 200) {
      dispatch({
        type: orderContants.GET_ORDERS,
        payload: res.data,
      });
    } else {
    }
  };
};

export const addOrder = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/placeOrder/addPlaceOrder`, payload);
      if (res.status === 201) {
        dispatch({ type: orderContants.ADD_ORDER, payload: res.data });

        dispatch(getOrders());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPlaceOrderById = (payload) => {
  return async (dispatch) => {
    const res = await axios.get(`/placeOrder/getPlaceOrder/${payload}`);
    if (res.status === 200) {
      dispatch({
        type: orderContants.GET_ORDER_BY_ID,
        payload: res.data,
      });
    } else {
    }
  };
};
