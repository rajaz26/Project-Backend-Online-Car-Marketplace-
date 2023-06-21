import Used from "../models/Used.js";
import User from "../models/User.js";
import New from "../models/New.js";
import multer from "multer";

//Ad New Vehicle
export const createNew = async (req, res, next) => {
  const newCar = new New(req.body);
  try {
    const savedNew = await newCar.save();
    res.status(200).json(savedNew);
  } catch (err) {
    res.status(500).json(err);
  }
};
