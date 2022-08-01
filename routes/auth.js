import express from "express";
import {
  login,
  register,
  getUser,
  updateUser,
  getAds,
  createAd,
} from "../controllers/auth.js";
import multer from "multer";
import Used from "../models/Used.js";
import User from "../models/User.js";
import sharp from "sharp";
import path from "path";
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

//Routes
router.post("/signin", register);
router.post("/login", login);
router.get("/find/:id", getUser);
router.put("/profile/:id", updateUser);
router.get("/info/:id", getAds);
// router.post("/post/:userId", createAd);
router.post(
  "/post/:userId",
  upload.array("images", 6),
  async (req, res, next) => {
    const userId = req.params.userId;
    const newUsed = new Used({
      make: req.body.make,
      model: req.body.model,
      yearmodel: req.body.yearmodel,
      color: req.body.color,
      average: req.body.average,
      mileage: req.body.mileage,
      city: req.body.city,
      transmission: req.body.transmission,
      price: req.body.price,
      images: req.body.images,
      contact: req.body.contact,
      condition: req.body.condition,
    });
    try {
      const savedUsed = await newUsed.save();

      try {
        await User.findByIdAndUpdate(userId, {
          $push: { ads: savedUsed._id },
        });
      } catch (err) {
        res(err, "Eroor");
      }
      await savedUsed.save();
      res.status(200).json(savedUsed);
    } catch (err) {
      res.status(500).json(err.res);
    }
  }
);

// router.put("/:id", updateUsed);

export default router;
