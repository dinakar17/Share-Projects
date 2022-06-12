import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  title: String,
  category: String,
  creator: [String],
  description: String,
  image: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var ProjectModel = mongoose.model("ProjectModel", projectSchema);

export default ProjectModel;
