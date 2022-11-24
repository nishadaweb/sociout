import express from "express";
import {
  getAllUser,
  blockUser,
  findOneuser,
} from "../Controllers/AdminController.js";
const router = express.Router();

router.get("/users", getAllUser);
router.put("/:id", blockUser);
router.get("/:id", findOneuser);
export default router;
