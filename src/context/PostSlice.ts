import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../models/post.model";

interface State {
  posts: Post[];
  originalPosts: Post[];
}

const initialState: State = {
  posts: [],
  originalPosts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPosts: (state, action) => {
      state.posts = action.payload;
      state.originalPosts = action.payload;
    },
    filterPost: (state, action) => {
      if (action.payload) {
        state.posts = state.posts.filter(
          (p) =>
            p.title.toLowerCase().indexOf(action.payload) >= 0 ||
            p.body.toLowerCase().indexOf(action.payload) >= 0
        );
      } else state.posts = [...state.originalPosts];
    },
  },
});

export const { addPosts, filterPost } = postSlice.actions;

export default postSlice.reducer;
