import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
	SingleImageUpload,
	GalleryImageUpload,
} from "../../axios/imageUpload.js";

const initialState = [];

export const deleteProduct = createAsyncThunk(
	"product/deleteProduct",
	async (id) => {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_BACKEND_SERVER}/api/products/${id}`
		);
	}
);
export const createProduct = createAsyncThunk(
	"product/createProduct",
	async (options) => {
		const {
			name,
			description,
			price,
			discountedPrice,
			stock,
			gallery,
			featuredImage,
			categories,
			tags,
		} = options;

		const featuredImageDta = await SingleImageUpload(name, featuredImage);

		const galleryDta = await GalleryImageUpload(name, gallery);

		const config = {
			headers: { "Content-Type": "application/json" },
		};

		const { data } = await axios.post(
			`${process.env.REACT_APP_BACKEND_SERVER}/api/products/new`,
			{
				name,
				description,
				price,
				discountedPrice,
				stock,
				categories,
				tags,
				gallery: galleryDta,
				primaryImage: featuredImageDta,
			},
			config
		);
		return data;
	}
);

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(createProduct.pending, (state, action) => {
				return {
					...state,
					loading: true,
					products: [],
				};
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				return {
					...state,
					...action.payload,
					success: true,
					loading: false,
				};
			})
			.addCase(createProduct.rejected, (state, action) => {
				return {
					...state,
					loading: false,
					error: action.error.message,
				};
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				return {
					...state,
					success: true,
					loading: false,
					isDeleted: true,
				};
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				return {
					...state,
					loading: false,
					error: action.error.message,
				};
			});
	},
});

export default productsSlice.reducer;
