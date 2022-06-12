import {
  CREATE,
  FETCH_ALL,
  LIKE,
  UPDATE,
  DELETE,
} from "../constants/actionTypes";

type Action = {
  type: string;
  payload: any;
};

export default (projects = [], action: Action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...projects, action.payload];
    case UPDATE:
      return projects.map((project) => project._id == action.payload._id);
    case LIKE:
      return projects.map((project) =>
        project._id === action.payload._id ? action.payload : project
      );
    case DELETE:
      return projects.filter((project) => project._id !== action.payload);
  }
};
