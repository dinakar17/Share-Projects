import express from "express";
import mongoose from "mongoose";

import ProjectModel from "../models/projectMessage.js";

const router = express.Router();

export const getProjects = async (req, res) => {
  try {
    const projectMessages = await ProjectModel.find();
    res.status(200).json(projectMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await ProjectModel.findById(id);
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  const { title, category, description, github, image } = req.body;
  const newProjectMessage = new ProjectModel({
    title,
    category,
    description,
    github,
    image,
  });
  try {
    await newProjectMessage.save();
    res.status(201).json(newProjectMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatedProject = async (req, res) => {
  const { id } = req.params;
  const { title, category, description, github, image } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedProject = {
    title,
    category,
    description,
    github,
    image,
    _id: id,
  };
  await ProjectModel.findByIdAndUpdate(id, updatedProject, { new: true });

  res.json(updatedProject);
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await ProjectModel.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};


export const likeProject = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const project = await ProjectModel.findById(id);
  const updatedProject = await ProjectModel.findByIdAndUpdate(
    id,
    { likeCount: project.likeCount + 1 },
    { new: true }
  );
  res.json(updatedProject);
};

export default router;