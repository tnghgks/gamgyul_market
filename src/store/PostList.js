import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authInstance } from "../Api/api";

const SET_FOLLOWERS_POSTS = createAsyncThunk("postList/SET_FOLLOWERS_POSTS", async ({ pageNum = 1 }) => {
  try {
    const {
      data: { posts },
    } = await authInstance.get(`/post/feed/?limit=${pageNum * 5}`);

    return posts;
  } catch (error) {
    console.log(error);
  }
});

const SET_USER_POSTS = createAsyncThunk("postList/SET_USER_POSTS", async ({ accountname, token, pageNum = 1 }) => {
  try {
    const {
      data: { post },
    } = await authInstance.get(`/post/${accountname}/userpost/?limit=${pageNum * 5}`);

    return post;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  posts: [],
  pageNum: 1,
};

const postListSlice = createSlice({
  name: "postList",
  initialState,
  reducers: {
    INCREASE_PAGE_NUMBER: (state) => {
      state.pageNum += 1;
    },
    INITIAL_PAGE_NUMBER: (state) => {
      state.pageNum = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SET_FOLLOWERS_POSTS.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(SET_USER_POSTS.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export { SET_FOLLOWERS_POSTS, SET_USER_POSTS };
export const { INCREASE_PAGE_NUMBER, INITIAL_PAGE_NUMBER } = postListSlice.actions;
export default postListSlice.reducer;
