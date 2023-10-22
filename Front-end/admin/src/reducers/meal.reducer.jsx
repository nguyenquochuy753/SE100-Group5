import { mealContants } from "../actions/constants";

const initState = {
  meals: [],
  meal: {},
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
    case mealContants.GET_MEAL_BY_ID: {
      state = {
        ...state,
        meal: action.payload,
      };
    }
    default:
      break;
  }
  return state;
};
