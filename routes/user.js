import express from "express";
import { post } from "../controllers/user";

const router = express.Router();
router.post("/post/:id", post);
export default router;
