const router = require("express").Router();
let User = require("../models/user");

router.get("/", (req, res) => {
  User.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  User.findOne({ _id: id })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

router.post("/add", (req, res) => {
  const { username, fname, lname, phno, email } = req.body;
  const newUser = new User({ username, fname, lname, phno, email });
  newUser
    .save()
    .then(() => res.send("User added"))
    .catch((err) => res.status(400).json(`ERROR ${err}`));
});

router.post("/update/:id", (req, res) => {
  const { id } = req.params;
  const { username, fname, lname, phno, email } = req.body;
  User.findOneAndUpdate(
    { _id: id },
    {
      username: username,
      fname: fname,
      lname: lname,
      phno: phno,
      email: email,
    }
  )
    .then(() => res.send("User updated"))
    .catch((err) => console.log(err));
});

module.exports = router;
