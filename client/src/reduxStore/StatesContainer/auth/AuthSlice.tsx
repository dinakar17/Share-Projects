// AuthSlice : Piece of State that stores all the user login information

// Step 1: Import createSlice and createAsyncThunk (for asynchronous actions)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../../api/index";
import { signInDetails, signUpDetails } from "../../../types";
interface SignIn {
  signInDetails: signInDetails;
  // still needs to be updated
  navigate: any;
}

interface SignUp {
  signUpDetails: signUpDetails;
  // still needs to be updated
  navigate: any;
}

// Step 2: Initialize initialState
const initialState = {
  loading: false,
  authData: null,
  error: "",
};

// Step 3: Configure Asynchronous action creators
export const signIn = createAsyncThunk(
  // "auth/signIn" is the name of Action type
  "auth/signIn",
  async ({ signInDetails, navigate }: SignIn) => {
    const response = await api.signIn(signInDetails);
    // console.log(response);
    navigate("/projects");
    return response.data;
  }
);
// Note: signUp is an asynchronous action creator that goes through 3 stages(just like ascending a stairs to reach a goal):
// 1. signUp.pending: the action creator returns a promise
// 2. signUp.fulfilled: the promise is resolved and the action creator returns the response data
// 3. signUp.rejected: the promise is rejected and the action creator returns the error
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ signUpDetails, navigate }: SignUp) => {
    const response = await api.signUp(signUpDetails);
    // AxiosResponse(if successful) - "response: {data: {result: ..., token: ...}, status: 201}" (Ref: server/controllers/user.js)
    // AxiosResponse (if unsuccessful) - "response: {response: {data: {message: "User already exists"}}, status: 400}}"
    // AxiosError - No server connection i.e., server is not running (This error is handled by signUp.rejected in the reducer)
    navigate("/projects");
    return response.data;
  }
);

// Step 4: Create the Slice (piece of State)
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.authData = null;
      state.loading = false;
      state.error = "";
      localStorage.removeItem("profile");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.authData = action.payload;
      localStorage.setItem("profile", JSON.stringify(action.payload));
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.authData = null;

      state.error = action.error.message as string;
    });

    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
      // console.log("pending"); For debugging
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      // response.data === action.payload
      state.authData = action.payload;
      // As soon as we logged in we add the profile to localStorage
      localStorage.setItem("profile", JSON.stringify(action.payload));
      // console.log(`AuthData: action.payload`);
      // console.log(`LocalStore: localStorage.getItem("profile")`);
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.authData = null;
      // Here action.error.message is the *automatic message* generated when the logic in signUp function fails!
      // Ex: If we use navigate.push("/projects") then action.error.message = "navigate.push is not a function"
      state.error = action.error.message as string;
      console.log(state.error);
    });
  },
});

// Step 5: Default Export the reducer
export default authSlice.reducer;

export const { logOut } = authSlice.actions;
// Step 6: pass the reducer (which triggers state mutation) to the configureStore

// Step 7: Export the store and feed to it to the React component tree
