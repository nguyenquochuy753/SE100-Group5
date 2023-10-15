import { tableContants } from "../actions/constants";

const initState = {
  tables: [],
  pageRequest: false,
  page: {},
  error: null,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case tableContants.GET_TABLES:
      state = {
        ...state,
        tables: action.payload,
      };
      break;
    default:
      break;
  }
  return state;
};
