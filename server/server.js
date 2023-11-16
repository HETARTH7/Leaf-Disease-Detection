const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConfig");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");

const app = express();
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

connectDB();
const port = 5000;

app.use("/user", require("./routes/user"));
app.use("/data", require("./routes/data"));

app.listen(port, () => {
  console.log(`listenting at port ${port}`);
});
