import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import Used from "../models/Used.js";

export const post = async (req, res) => {
  try {
    const newAd = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      phone: req.body.pnhone,
    });
    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    res.status(500).json(err);
  }
};
