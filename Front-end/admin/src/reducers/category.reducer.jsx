import { categoryContants } from "../actions/constants";

const initState = {
  categories: [],
  category: {},
  page: {},
  error: null,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case categoryContants.GET_CATEGORIES:
      state = {
        ...state,
        categories: action.payload,
      };
      break;
    default:
      break;
  }
  return state;
};
