import axios from "axios";

const URL = "http://localhost:5000/projects";

export const fetchProjects = () => axios.get(URL);
export const createProject = (newProject: Object) =>
  axios.post(URL, newProject);
export const likeProject = (id: Number) =>
  axios.patch(`${URL}/${id}/likeProject`);
export const updateProject = (id: Number, updatedProject: Object) =>
  axios.patch(`${URL}/${id}`, updatedProject);
export const deleteProject = (id: Number) => axios.delete(`${URL}/${id}`);
