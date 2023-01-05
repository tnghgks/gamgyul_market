import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authInstance } from "../Api/api";

export const SET_FOLLOWER_LIST = createAsyncThunk("profile/SET_FOLLOWER_LIST", async ({ accountname, limit }) => {
  try {
    const { data: followerData } = await authInstance.get(`/profile/${accountname}/follower?limit=${limit}`);

    return followerData;
  } catch (error) {
    console.log(error);
  }
});

export const SET_FOLLOWING_LIST = createAsyncThunk("profile/SET_FOLLOWING_LIST", async ({ accountname, limit }) => {
  try {
    const { data: followingData } = await authInstance.get(`/profile/${accountname}/following?limit=${limit}`);

    return followingData;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  users: [],
  follower: [],
};

const followListSlice = createSlice({
  name: "followList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(SET_FOLLOWER_LIST.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(SET_FOLLOWING_LIST.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default followListSlice.reducer;
