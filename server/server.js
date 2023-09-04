const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/dbConfig");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const io = require("socket.io");

const port = 5000;

const app = express();
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.use("/register", require("./route/register"));
app.use("/auth", require("./route/login"));

app.listen(port, () => console.log(`Server listening at port ${port}`));
