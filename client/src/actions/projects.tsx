import * as api from "../api/index";
import { Dispatch } from "redux";
import {
  CREATE,
  DELETE,
  FETCH_ALL,
  LIKE,
  UPDATE,
} from "../constants/actionTypes";

// GET
export const getProjects = () => async (dispatch: Dispatch) => {
  try {
    const { data } = api.fetchProjects();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.log(message);
  }
};

// CREATE
export const createProject = (project: Object) => async (
  dispatch: Dispatch
) => {
  try {
    const { data } = await api.createProject(project);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.log(message);
  }
};

// UPDATE
export const updateProject = (id: Number, project: Object) => async (
  dispatch: Dispatch
) => {
  try {
    const { data } = await api.updateProject(id, project);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.log(message);
  }
};

// LIKE
export const likeProject = (id: Number) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.likeProject(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.log(message);
  }
};

// DELETE
export const deleteProject = (id: Number) => async (dispatch: Dispatch) => {
  try {
    await api.deleteProject(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.log(message);
  }
};
