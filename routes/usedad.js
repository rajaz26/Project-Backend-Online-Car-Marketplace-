import express from "express";
import {
  countMake,
  createUsed,
  deleteadId,
  deleteUsed,
  getallUsed,
  getUsed,
  updateUsed,
} from "../controllers/used.js";

const router = express.Router();

//CREATE
router.post("/post/:userId", createUsed);
//UPDATE
router.put("/:id", updateUsed);

//DELETE
router.delete("/delete/:id/:idd", deleteUsed);
// router.delete("/deleted/:id", deleteadId);

//GET
router.get("/get/:id", getUsed);

//GETALL
router.get("/", getallUsed);

//COUNT
router.get("/countByMake", countMake);
export default router;
