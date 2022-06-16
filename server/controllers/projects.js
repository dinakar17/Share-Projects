import express from "express";
import mongoose from "mongoose";

import ProjectModel from "../models/projectMessage.js";

const router = express.Router();

export const getProjects = async (req, res) => {
  const {page} = req.query;
 
  try{
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await ProjectModel.countDocuments({});
    const posts = await ProjectModel.find().sort({id: -1}).limit(LIMIT).skip(startIndex);
    // response: {data: {posts: ["...", "..."], currentPage: Number, numberOfPages: Number}}
    res.json({posts: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)});
  }
  catch(error){
    res.json(404).json({message: error.message});
  }
  // try {
  //   const projectMessages = await ProjectModel.find();
  //   // response: {data: {[{title: "", category: "", description: "", github: "", image: ""}, ....]}, status: 200}
  //   res.status(200).json(projectMessages);
  //   // console.log(projectMessages);
  // } catch (error) {
  //   // response: {data: {message: error.message}, status: 404}
  //   res.status(404).json({ message: error.message });
  // }
};

export const getProjectsBySearch = async (req, res) => {
  const {searchQuery, tags} = req.query;
  try{
    const title = new RegExp(searchQuery, "i");
    const posts = await ProjectModel.find({$or: [{title}, {category: {$in: tags.split(",")}}]});
    // console.log(posts);
    res.json(posts);
  } catch(error) {
    res.status(404).json({message: error.message});
  }
}

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

  // Create a new document named 'newProjectMessage'
  const newProjectMessage = new ProjectModel({
    title,
    category,
    description,
    image,
    github,
  });
  try {
    await newProjectMessage.save();
    // response: {data: {title: "", category:"", description:"", github:"", image:""}, status: 201}
    res.status(201).json(newProjectMessage);
  } catch (error) {
    // response: {data: {message: error.message}, status: 409}
    res.status(409).json({ message: error.message });
  }
};

export const updatedProject = async (req, res) => {
  // id = ObjectId created by MongoDB (_id)
  const { id } = req.params;
  const { title, category, description, github, image } = req.body;
  // If document with given Id doesn't exist then "response: {data: "No post with id: ...", status: 404}" 
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
  // response: {data: {title: "", category: "", description: "", github: "", image: ""}, status: 200}}
  res.json(updatedProject);
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  // if there is no document with given id in the database return "response: {data: No post with id ...., status: 404}"
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await ProjectModel.findByIdAndRemove(id);
  // response: {data: {message: "Post deleted successfully"}, status: 200}
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