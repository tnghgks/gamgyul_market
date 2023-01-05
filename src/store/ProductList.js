import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authInstance } from "../Api/api";

const SET_PRODUCT_LIST = createAsyncThunk("productList/SET_PRODUCT_LIST", async ({ accountname }) => {
  try {
    const {
      data: { product },
    } = await authInstance.get(`/product/${accountname}`);

    return product;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  products: [],
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(SET_PRODUCT_LIST.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export { SET_PRODUCT_LIST };
export default productListSlice.reducer;
