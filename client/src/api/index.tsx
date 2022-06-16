import axios, { AxiosRequestConfig } from "axios";
import { signInDetails, signUpDetails, Details, SearchQuery } from "../types";

const API = axios.create({ baseURL: "http://localhost:5000" });

// still needs to be updated
API.interceptors.request.use((req: any) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile") as any).token
    }`;
  }

  return req;
});

// CRUD operations
export const fetchPosts = (page: String) => API.get(`/projects?page=${page}`);
export const fetchPostsBySearch = (searchQuery: SearchQuery) => API.get(`/projects/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
// createPost makes a post request to 'http://localhost:3000/projects' (through HTTP "language")
export const createPost = (newPost: Object) => API.post("/projects", newPost);
export const updatePost = (id: String, updatedPost: Details) =>
  API.patch(`/projects/${id}`, updatedPost);
export const deletePost = (id: String) => API.delete(`/projects/${id}`);

// SignIn and signOut operations
export const signIn = (signInDetails: signInDetails) =>
  API.post("/user/signIn", signInDetails);
export const signUp = (signUpDetails: signUpDetails) => {
  // console.log("Axios made the post request");
  return API.post("/user/signUp", signUpDetails);
};
