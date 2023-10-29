import { tableContants } from "../actions/constants";

const initState = {
  tables: [],
  table: {},
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
    case tableContants.GET_TABLE_BY_ID:
      state = {
        ...state,
        table: action.payload
      }
    default:
      break;
  }
  return state;
};
