const User = require("../model/User");

const login = async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const user = await User.findOne({ email: email, pwd: pwd });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong. Cannot login" });
  }
};

module.exports = { login };
