import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  productsReducer,
  productReducer,
} from "./reducers/products";

const reducer = combineReducers({
  newProduct: newProductReducer,
  allProducts: productsReducer,
  productReducer: productReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
