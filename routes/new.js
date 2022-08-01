import express from "express";
import multer from "multer";
import path from "path";
import New from "../models/New.js";
///multermiddleware
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./images");
  },
  filename: (req, file, callback) => {
    callbacknull,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

// router.put("/:id", updateUsed);

router.post("/new", async (req, res, next) => {
  // const userId = req.params.userId;
  const newNew = new New({
    make: req.body.make,
    model: req.body.model,
    yearmodel: req.body.yearmodel,
    color: req.body.color,
    average: req.body.average,
    transmission: req.body.transmission,
    price: req.body.price,
  });
  try {
    const savedNew = await newNew.save();
    await savedNew.save();
    res.status(200).json(savedNew);
  } catch (err) {
    res.status(500).json(err.res);
  }
});

export default router;
