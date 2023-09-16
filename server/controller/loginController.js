const User = require("../model/User");

const login = async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const user = await User.findOne({ email: email, pwd: pwd });
    if (!user) res.status(500).json({ message: "User not found" });
    else res.status(201).json({ message: "Login successfull!" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong. Cannot login" });
  }
};

module.exports = { login };
