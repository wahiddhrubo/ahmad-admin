import { configureStore } from "@reduxjs/toolkit";
import getProductsSlice from "./slice/getProducts.js";
import productsSlice from "./slice/product.js";

const store = configureStore({
   reducer: {
      product: productsSlice,
      getProducts: getProductsSlice,
   },
});

export default store;
