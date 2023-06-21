import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import Used from "../models/Used.js";

export const registerUser = async (req, res, next) => {
  const { username, password, email, phone } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newUser = new User({
      username,
      password: hashedPassword, // Save the hashed password
      email,
      phone,
    });

    const savedUser = await newUser.save();

    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

// auth.js

export const loginUser = async (req, res, next) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Login successful
    res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
    });

    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAds = async (req, res, next) => {
  try {
    const result = await User.findById(req.params.id);
    const list = await Promise.all(
      result.ads.map((ad) => {
        return Used.findById(ad);
      })
    );
    res.status(200).json(list);
    res.end();
  } catch (err) {
    res.status(500).json(err);
  }
  return;
};

export const createAd = async (req, res, next) => {
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
    contact: { userId },
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
};
// export const createAd = upload.array("images"), async (req, res, next) => {
//   const userId = req.params.userId;
//   const newUsed = new Used({
//     make: req.body.make,
//     model: req.body.model,
//     yearmodel: req.body.yearmodel,
//     color: req.body.color,
//     average: req.body.average,
//     mileage: req.body.mileage,
//     city: req.body.city,
//     transmission: req.body.transmission,
//     price: req.body.price,
//     images: req.file.originalname,
//     contact: { userId },
//   });
//   try {
//     const savedUsed = await newUsed.save();

//     try {
//       await User.findByIdAndUpdate(userId, {
//         $push: { ads: savedUsed._id },
//       });
//     } catch (err) {
//       res(err, "Eroor");
//     }
//     await savedUsed.save();
//     res.status(200).json(savedUsed);
//   } catch (err) {
//     res.status(500).json(err.res);
//   }
// };

// export const updateUsed = async (req, res, next) => {
//   try {
//     const updateUsed = await Used.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).json(updateUsed);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };
// export const getUsed = async (req, res, next) => {
//   try {
//     const used = await Used.findById(req.params.id);
//     res.status(200).json(used);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const phone = await User.findOne({
//       phone: req.body.phone,
//     });
//     if (!phone) {
//       res.status(500).json("Incorrect phone number");
//     }

//     const isPasswordCorrect = await bcrypt.compare(
//       req.body.password,
//       phone.password
//     );
//     if (!isPasswordCorrect) {
//       res.status(500).json("Incorrect password");
//     }
//     const { password, ...otherDetails } = phone._doc;
//     res.status(200).json({ ...otherDetails });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ phone: req.body.phone });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const { password, ...otherDetails } = user._doc;
    res.status(200).json({ details: { ...otherDetails } });
  } catch (err) {
    next(err);
  }
};
