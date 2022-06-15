import express from "express";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  getProjectsBySearch,
  likeProject,
  updatedProject,
} from "../controllers/projects.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/search", getProjectsBySearch);
router.post("/", createProject);
router.get("/:id", getProject);
router.patch("/:id", updatedProject);
router.delete("/:id", deleteProject);
router.patch("/:id/likeProject", likeProject);



export default router;
