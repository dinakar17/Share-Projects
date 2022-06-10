import express from "express";

const app = express();

const PORT = 5000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("Response from the server");
});

app.listen(PORT, () => console.log(`Server is up and running on Port ${PORT}`));
