import { combineReducers } from "redux";
import mealReducer from "./meal.reducer";
import tableReudcer from "./table.reudcer";
import cartReducer from "./cart.reducer";

const rootReducer = combineReducers({
  meal: mealReducer,
  table: tableReudcer,
  cart: cartReducer,
});

export default rootReducer;
