import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authInstance } from "../Api/api";

const FETCH_POST_DATA = createAsyncThunk("postDetail/FETCH_POST_DATA", async ({ id }) => {
  try {
    const {
      data: { post },
    } = await authInstance.get(`/post/${id}`);

    return post;
  } catch (error) {
    console.log(error);
  }
});

const FETCH_COMMENT_DATA = createAsyncThunk("postDetail/FETCH_COMMENT_DATA", async ({ id }) => {
  try {
    const {
      data: { comments },
    } = await authInstance.get(`/post/${id}/comments`);

    return comments;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  post: {},
  comments: [],
  modal: {},
  status: "",
};

const postDetailSlice = createSlice({
  name: "postDetail",
  initialState,
  reducers: {
    ADD_COMMENT: (state, action) => {
      state.comments.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FETCH_POST_DATA.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(FETCH_POST_DATA.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.post = action.payload;
    });
    builder.addCase(FETCH_POST_DATA.rejected, (state, action) => {
      state.status = "rejected";
    });
    builder.addCase(FETCH_COMMENT_DATA.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(FETCH_COMMENT_DATA.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.comments = action.payload;
    });
    builder.addCase(FETCH_COMMENT_DATA.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export { FETCH_POST_DATA, FETCH_COMMENT_DATA };
export const { ADD_COMMENT } = postDetailSlice.actions;
export default postDetailSlice.reducer;
