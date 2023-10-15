import { mealContants } from "../actions/constants";

const initState = {
  meals: [],
  priceRange: {},
  mealsByPrice: {},
  pageRequest: false,
  page: {},
  error: null,
  mealDetails: {},
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case mealContants.GET_MEALS:
      state = {
        ...state,
        meals: action.payload,
        priceRange: action.payload.priceRange,
        mealsByPrice: {
          ...action.payload.mealsByPrice,
        },
      };
      break;
    default:
      break;
  }
  return state;
};
