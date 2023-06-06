const router = require("express").Router();
let User = require("../models/user");

router.post("/update", (req, res) => {
  const uid = req.body.uid;
  const username = req.body.username;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const phno = req.body.phno;
  const email = req.body.email;
  User.updateOne(
    { _id: uid },
    {
      username: username,
      fname: fname,
      lname: lname,
      phno: phno,
      email: email,
    },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

module.exports = router;
