const login = async (req, res) => {
  try {
    const { name, email } = req.body;
    res.status(200).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong. Cannot register" });
  }
};

module.exports = { login };
