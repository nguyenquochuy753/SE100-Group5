import { orderContants } from "../actions/constants";

const initState = {
  orders: [],
  order: {},
  orderId: "",
  loading: false,
  error: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case orderContants.GET_ORDERS:
      state = {
        ...state,
        orders: action.payload,
      };
      break;
    case orderContants.ADD_ORDER:
      state = {
        ...state,
        orderId: action.payload._id,
      };
      break;
    case orderContants.GET_ORDER_BY_ID:
      state = {
        ...state,
        order: action.payload,
      };
      break;
    default:
      break;
  }
  return state;
};
