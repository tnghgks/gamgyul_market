import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authInstance } from "../Api/api";

export const SET_PROFILE = createAsyncThunk("profile/SET_PROFILE", async ({ accountname }) => {
  try {
    const {
      data: { profile },
    } = await authInstance.get(`profile/${accountname}`);

    return profile;
  } catch (error) {
    console.log(error);
  }
});

export const FOLLOW = createAsyncThunk("profile/FOLLOW", async ({ accountname, token }, ThunkApi) => {
  try {
    const {
      data: { profile, message },
    } = await authInstance.post(`/profile/${accountname}/follow`);

    if (!profile) return alert(message);

    ThunkApi.dispatch(SET_PROFILE({ accountname, token }));
  } catch (error) {
    console.log(error);
  }
});

export const UN_FOLLOW = createAsyncThunk("profile/UNFOLLOW", async ({ accountname, token }, ThunkApi) => {
  try {
    const {
      data: { profile, message },
    } = await authInstance.delete(`/profile/${accountname}/unfollow`);

    if (!profile) return alert(message);
    ThunkApi.dispatch(SET_PROFILE({ accountname, token }));
  } catch (error) {
    console.log(error);
  }
});

export const MODIFY_PROFILE = createAsyncThunk("profile/MODIFY_PROFILE", async ({ editUserData }) => {
  try {
    const {
      data: { user },
    } = await authInstance.put(`/user`, editUserData);

    return user;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  userId: "",
  username: "",
  accountname: "",
  image: "https://mandarin.api.weniv.co.kr/Ellipse.png",
  isfollow: false,
  following: [],
  follower: [],
  followerCount: 0,
  followingCount: 0,
  intro: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(SET_PROFILE.fulfilled, (state, action) => {
      state.userId = action.payload._id;
      state.username = action.payload.username;
      state.accountname = action.payload.accountname;
      state.image = action.payload.image;
      state.isfollow = action.payload.isfollow;
      state.following = action.payload.following;
      state.follower = action.payload.follower;
      state.followerCount = action.payload.followerCount;
      state.followingCount = action.payload.followingCount;
      state.intro = action.payload.intro;
    });
    builder.addCase(MODIFY_PROFILE.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.accountname = action.payload.accountname;
      state.image = action.payload.image;
      state.intro = action.payload.intro;
    });
  },
});

export default profileSlice.reducer;
