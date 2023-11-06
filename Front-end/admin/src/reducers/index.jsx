import { combineReducers } from "redux";
import mealReducer from "./meal.reducer";
import tableReudcer from "./table.reudcer";
import cartReducer from "./cart.reducer";
import orderReducer from "./order.reducer";
import categoryReducer from "./category.reducer";

const rootReducer = combineReducers({
  meal: mealReducer,
  table: tableReudcer,
  cart: cartReducer,
  order: orderReducer,
  category: categoryReducer,
});

export default rootReducer;
