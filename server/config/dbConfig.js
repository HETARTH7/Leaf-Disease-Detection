const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect("mongodb://0.0.0.0/authdb");
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });
};

module.exports = connectDB;
