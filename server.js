const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://0.0.0.0/socialmedia");
app.use("/user", userRouter);

app.listen(5000, () => {
  console.log("Server runnning on port 5000");
});
