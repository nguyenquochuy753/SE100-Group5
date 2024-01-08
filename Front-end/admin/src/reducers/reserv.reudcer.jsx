import { reservContants } from "../actions/constants";

const initState = {
  reservs: [],
  reserv: {},
  pageRequest: false,
  page: {},
  error: null,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case reservContants.GET_RESERV:
      state = {
        ...state,
        reservs: action.payload,
      };
      break;
    case reservContants.BOOK_RESERV:
      state = {
        ...state,
        reserv: action.payload,
      };
      break;
    case reservContants.RESET_RESERV:
      state = {
        ...initState,
      };
      break;
    default:
      break;
  }
  return state;
};
