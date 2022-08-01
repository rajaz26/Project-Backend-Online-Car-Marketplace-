import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usedRoute from "./routes/usedad.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/auth.js";
import newRoute from "./routes/new.js";
import multer from "multer";

dotenv.config();
const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});

//middlewares

app.use(cors());
app.use(express.json());

app.use("/api/used", usedRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/new", newRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect(), console.log("app is running");
});
