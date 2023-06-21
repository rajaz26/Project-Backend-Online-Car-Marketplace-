import Used from "../models/Used.js";
import User from "../models/User.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./images");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
export const createUsed = async (req, res, next) => {
  const userId = req.params.userId;
  const newUsed = new Used(req.body);
  try {
    const savedUsed = await newUsed.save();

    try {
      await User.findByIdAndUpdate(userId, {
        $push: { ads: savedUsed._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedUsed);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateUsed = async (req, res, next) => {
  try {
    const updateUsed = await Used.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUsed);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteadId = async (req, res, next) => {
  // const id = req.params.id;

  try {
    await User.updateOne(
      { _id: "62b06cf5ff79799755c349f2" },
      { $pull: { ads: req.params.id } }
    );

    res.status(200).json("Ad has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteUsed = async (req, res, next) => {
  const idd = req.params.idd;
  try {
    await Used.findByIdAndDelete(idd);
    try {
      await User.updateOne({ _id: req.params.id }, { $pull: { ads: idd } });
      res.status(200).json("Ad has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUsed = async (req, res, next) => {
  try {
    const used = await Used.findById(req.params.id);
    res.status(200).json(used);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getallUsed = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const used = await Used.find({
      ...others,
      rating: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(used);
  } catch (err) {
    next(err);
  }
};

export const countMake = async (req, res, next) => {
  try {
    const toyotaCount = await Used.countDocuments({ make: "Toyota" });
    const hondaCount = await Used.countDocuments({ make: "Honda" });
    const suzukiCount = await Used.countDocuments({ make: "Suzuki" });
    const nissanCount = await Used.countDocuments({ make: "Nissan" });
    const mitsubishiCount = await Used.countDocuments({ make: "Mitsubishi" });
    res.status(200).json([
      { make: "toyota", count: toyotaCount },
      { make: "honda", count: hondaCount },
      { make: "suzuki", count: suzukiCount },
      { make: "nissan", count: nissanCount },
      { make: "mitsubishi", count: mitsubishiCount },
    ]);
  } catch (err) {
    next(err);
  }
};
