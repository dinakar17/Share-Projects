import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import projectRoutes from './routes/projects.js';

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/projects", projectRoutes);

const PORT = 5000 || process.env.PORT;
// Database connection url
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is up and running on Port ${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
