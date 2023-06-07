const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const app = express();

const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
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

  socket.on("message", (message) => {
    // Handle the received message
    console.log("Received new message:", message);
  });
});

app.listen(5000, () => {
  console.log("Server runnning on port 5000");
});
