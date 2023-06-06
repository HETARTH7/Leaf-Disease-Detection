const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const app = express();

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const userRouter = require("./routes/userRouter");
const messageRouter = require("./routes/messageRouter");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://0.0.0.0/socialmedia");
app.use("/user", userRouter);
app.use("/messages", messageRouter);

io.on("connection", (socket) => {
  console.log("New socket connection:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

app.listen(5000, () => {
  console.log("Server runnning on port 5000");
});
