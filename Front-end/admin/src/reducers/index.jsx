import { combineReducers } from "redux";
import mealReducer from "./meal.reducer";
import tableReudcer from "./table.reudcer";
import cartReducer from "./cart.reducer";
import orderReducer from "./order.reducer";
import categoryReducer from "./category.reducer";
import ingredienttypeReducer from "./ingredienttype.reducer";
import ingredientReducer from "./ingredient.reducer";
import reservReudcer from "./reserv.reudcer";

const rootReducer = combineReducers({
  meal: mealReducer,
  table: tableReudcer,
  cart: cartReducer,
  order: orderReducer,
  category: categoryReducer,
  ingredientType: ingredienttypeReducer,
  ingredient: ingredientReducer,
  reserv: reservReudcer,
});

export default rootReducer;
