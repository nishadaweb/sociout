import express from "express";
import {
  getAllUser,
  updateUser,
  findOneuser,
} from "../Controllers/AdminController.js";
const router = express.Router();

router.get("/users", getAllUser);
router.put("/:id", updateUser);
router.get("/:id", findOneuser);
export default router;
