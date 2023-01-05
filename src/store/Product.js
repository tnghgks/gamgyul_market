import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authInstance, defaultInstance } from "../Api/api";

export const ADD_PRODUCT = createAsyncThunk("product/ADD_PRODUCT", async ({ productData }) => {
  try {
    const { product } = await authInstance.post(`/product`, productData);
    return product;
  } catch (error) {
    console.log(error);
  }
});

export const MODIFY_PRODUCT = createAsyncThunk("product/MODIFY_PRODUCT", async ({ productData, id }) => {
  try {
    const { data: product } = await authInstance.put(`/product/${id}`, productData);
    return product;
  } catch (error) {
    console.log(error);
  }
});

export const MODIFY_PRODUCT_IMAGE = createAsyncThunk("product/MODIFY_PRODUCT_IMAGE", async ({ formData }) => {
  try {
    const {
      data: { filename },
    } = await defaultInstance.post("/image/uploadfile", formData);

    if (!filename) return;
    return `https://mandarin.api.weniv.co.kr/${filename}`;
  } catch (error) {
    console.log(error);
  }
});

export const DETAIL_PRODUCT = createAsyncThunk("product/DETAIL_PRODUCT", async ({ id }) => {
  try {
    const {
      data: { product },
    } = await defaultInstance.get(`/product/detail/${id}`);
    return product;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  id: "",
  itemName: "",
  price: 0,
  link: "",
  itemImage: "",
  author: {
    _id: "",
    username: "",
    accountname: "",
    intro: "",
    image: "",
    following: [],
    follower: [],
    followerCount: 0,
    followingCount: 0,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(ADD_PRODUCT.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.itemName = action.payload.itemName;
      state.price = action.payload.price;
      state.link = action.payload.link;
      state.itemImage = action.payload.itemImage;
      state.author = action.payload.author;
    });
    builder.addCase(MODIFY_PRODUCT.fulfilled, (state, action) => {
      console.log(action.payload);
      state.id = action.payload.id;
      state.itemName = action.payload.itemName;
      state.price = action.payload.price;
      state.link = action.payload.link;
      state.itemImage = action.payload.itemImage;
      state.author = action.payload.author;
    });
    builder.addCase(DETAIL_PRODUCT.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.itemName = action.payload.itemName;
      state.price = action.payload.price;
      state.link = action.payload.link;
      state.itemImage = action.payload.itemImage;
      state.author = action.payload.author;
    });
  },
});

export default productSlice.reducer;
