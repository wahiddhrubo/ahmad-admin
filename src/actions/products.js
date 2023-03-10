import axios from "axios";
import { SingleImageUpload, GalleryImageUpload } from "../axios/imageUpload.js";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constants/products";

// Get All Products For Admin
export const getAllProduct =
  ({ page, keyword, resultPerPage }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/products?keyword=${keyword}&page=${page}&productPerPage=${resultPerPage}`
      );

      const { metadata, products } = data.products[0];
      const { numOfProducts } = metadata[0];
      const totalPages = Math.ceil(numOfProducts / resultPerPage);
      const result = { products, numOfProducts, resultPerPage, totalPages };
      console.log(result);
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: result,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Create Product
export const createProduct =
  ({
    name,
    description,
    price,
    discountedPrice,
    stock,
    gallery,
    featuredImage,
    categories,
    tags,
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
      console.log("test");
      const featuredImageDta = await SingleImageUpload(name, featuredImage);

      const galleryDta = await GalleryImageUpload(name, gallery);

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      console.log(galleryDta);
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

      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message || error.message,
      });
    }
  };

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_SERVER}/api/products/${id}`
    );

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `${process.env.API_SERVER_URL}/api/v1/product/${id}`
    );

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
