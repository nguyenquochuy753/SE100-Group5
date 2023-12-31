import axios from "../helpers/axios";
import { reservContants } from "./constants";

export const getReserv = () => {
  return async (dispatch) => {
    const res = await axios.get(`/reserving/getAllReservings`);
    if (res.status === 200) {
      dispatch({
        type: reservContants.GET_RESERV,
        payload: res.data,
      });
    } else {
    }
  };
};

export const addReservToTable = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: reservContants.BOOK_RESERV, payload: payload });
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetReserv = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: reservContants.RESET_RESERV });
    } catch (error) {
      console.log(error);
    }
  };
};
