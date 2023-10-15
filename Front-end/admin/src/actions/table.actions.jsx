import axios from "../helpers/axios";
import { tableContants } from "./constants";

export const getTable = () => {
  return async (dispatch) => {
    const res = await axios.get(`/table/getAllTables`);
    if (res.status === 200) {
      dispatch({
        type: tableContants.GET_TABLES,
        payload: res.data,
      });
    } else {
    }
  };
};

export const addTable = (form) => {
  return async (dispatch) => {
    dispatch({ type: tableContants.ADD_TABLE_REQUEST });
    try {
      const res = await axios.post(`/table/addTable`, form);
      if (res.status === 200) {
        dispatch({
          type: tableContants.ADD_TABLE_SUCCESS,
          payload: { table: res.data },
        });
      } else {
        dispatch({
          type: tableContants.ADD_TABLE_FAILURE,
          payload: res.data,
        });
      }
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
  };
};
