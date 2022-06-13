import axios from "axios";

const url = "http://localhost:5000/projects";

// CRUD operations
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost: Object) => axios.post(url, newPost);
export const updatePost = (id: String, updatedPost: Object) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id: String) => axios.delete(`${url}/${id}`);
