const getData = async (req, res) => {
  try {
    res.status(200).json("Hello");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getData };
