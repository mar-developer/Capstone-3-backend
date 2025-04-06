const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", [auth, admin], async (req, res) => {
  let users = await UserModel.find().select("-password");
  res.send(users);
});

router.get("/:id", auth, async (req, res) => {
  let users = await UserModel.findById(req.params.id);
  res.send(users);
});

router.post("/", async (req, res) => {
  let user = UserModel({
    name: {
      firstName: req.body.first_name,
      lastName: req.body.last_name
    },
    email: req.body.email,
    contactNumber: req.body.contactNumber,
    emergency: {
      name: req.body.e_name,
      relationship: req.body.e_relationship,
      contactNumber: req.body.e_contactNumber
    },
    isActive: true,
    isAdmin: false
  });

  let salt = await bcrypt.genSalt(10);
  let hashed = await bcrypt.hash(req.body.password, salt);
  user.password = hashed;

  try {
    user = await user.save();
    res.send(user);
  } catch (ex) {
    res.status(400).send("Provided data is invalid. Please send a valid data!");
  }
});

router.put("/:id", auth, async (req, res) => {
  let user = await UserModel.findById(req.params.id);

  user.name.firstName = req.body.first_name;
  user.name.lastName = req.body.last_name;
  user.email = req.body.email;
  user.contactNumber = req.body.contactNumber;
  user.emergency.name = req.body.e_name;
  user.emergency.relationship = req.body.e_relationship;
  user.emergency.contactNumber = req.body.e_contactNumber;

  if (req.body.password) {
    let salt = await bcrypt.genSalt(10);
    let hashed = await bcrypt.hash(req.body.password, salt);
    user.password = hashed;
  }

  user = await user.save();
  res.send(user);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  let user = await UserModel.findByIdAndDelete(req.params.id);

  res.send(user);
});

module.exports = router;
