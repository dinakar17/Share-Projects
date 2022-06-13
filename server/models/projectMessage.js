import mongoose from "mongoose";

// The below steps are standard steps for creating and getting started with MongoDB database

// Step #1: Create a Schema
const projectSchema = mongoose.Schema({
  title: String,
  category: String,
  description: String,
  image: String,
  github: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Step #2: Create a Model using Schema 
// Ref: https://mongoosejs.com/docs/models.html
var ProjectModel = mongoose.model("projects", projectSchema);

// Hence we created a collection named projects in our database with the help of above statement

// Step #3: Create documents (instances of the model) by using model

// Note: ProjectModel now can access all of the query Methods since it is a collection of documents

export default ProjectModel;
