const User = require("../model/User");

const register = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong. Cannot register" });
  }
};

module.exports = { register };
