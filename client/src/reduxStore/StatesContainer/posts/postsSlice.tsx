//  postsSlice : Piece of State that stores all the posts

// Step 1: Import CreateSlice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as api from "../../../api/index";

// Step 2: Initialize initialState
const initialState = {
  loading: false,
  posts: [] as Object[],
  error: "",
};

// Step 3: Create the *Async action creator* using CreateAsyncThunk Function and export it.

// Read in CRUD
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await api.fetchPosts();
  // response.data == array of objects
  return response.data;
});

// Create in CRUD
// Note: Details: (parameter) is the data that comes from the Frontend(React) i.e., dispatch(getPosts(details))
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (details: Object) => {
    const response = await api.createPost(details);
    return response.data;
  }
);

// Delete in CRUD
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: string) => {
    await api.deletePost(id);
  }
);

// Update in CRUD
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (toBeUpdatedData: { id: String; details: Object }) => {
    const { id, details } = toBeUpdatedData;
    await api.updatePost(id, details);
  }
);

// Step 4: Create the Slice (piece of State) and export it
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
    });
    // action is the response returned by getPosts() function
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      // action.payload  == response.data
      state.posts.push(action.payload);
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      // action.error.message == response.error.message
      state.error = action.error.message as string;
    });

    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message as string;
    });
  },
});

// Step 4: Default Export the reducer
export default postsSlice.reducer;

// Step 5: pass the reducer (which triggers state mutation) to the configureStore

// Step 6: Export the store and feed to it to the React component tree
