import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Authentication/Reducer";
import { restaurantReducer } from "./Restaurant/Reducer";
import { menuItemReducer } from "./Menu/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import { adminOrderReducer } from "./AdminOrder/Reducer";
import { ingredientsReducer } from "./Ingredients/Reducer";
import { addressReducer } from "./Address/Reducer";
import { adminReducer } from "./Admin/Reducer";
import { reviewReducer } from "./Review/Reducer";
import { chatReducer } from "./Chat/Reducer";
import { searchReducer } from "./Search/Reducer";
import { dashboardReducer } from "./Dashboard/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  menu: menuItemReducer,
  cart: cartReducer,
  order: orderReducer,
  restaurantOrder: adminOrderReducer,
  ingredients: ingredientsReducer,
  address: addressReducer,
  admin: adminReducer,
  review: reviewReducer,
  chat: chatReducer,
  search: searchReducer,
  dashboard: dashboardReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
