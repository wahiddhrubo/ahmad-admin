import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const getAllProducts = createAsyncThunk(
	"getProducts/getAllProducts",
	async (options) => {
		const { keyword, page, resultPerPage } = options;

		const { data } = await axios.get(
			`${process.env.REACT_APP_BACKEND_SERVER}/api/products?keyword=${keyword}&page=${page}&productPerPage=${resultPerPage}`
		);

		const { metadata, products } = data.products[0];
		const { numOfProducts } = metadata[0];
		const totalPages = Math.ceil(numOfProducts / resultPerPage);
		const result = { products, numOfProducts, resultPerPage, totalPages };

		return result;
	}
);

const getProductsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getAllProducts.pending, (state, action) => {
				return {
					...state,
					loading: true,
					products: [],
				};
			})
			.addCase(getAllProducts.fulfilled, (state, action) => {
				return {
					...state,
					...action.payload,
					loading: false,
				};
			})
			.addCase(getAllProducts.rejected, (state, action) => {
				return {
					...state,
					loading: false,
					error: action.error.message,
				};
			});
	},
});

export default getProductsSlice.reducer;
