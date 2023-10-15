import { combineReducers } from "redux";
import mealReducer from "./meal.reducer";
import tableReudcer from "./table.reudcer";

const rootReducer = combineReducers({
  meal: mealReducer,
  table: tableReudcer,
});

export default rootReducer;
