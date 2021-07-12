import express from "express";
import {
  getListUsers,
  getListArticles,
  deleteUser,
} from "../controller/admin.js";
import { verifyAdmin } from "../middleware/user.js";

const router = express.Router();
router.post("/:id/deleteuser", verifyAdmin, deleteUser);
router.get("/:id/listusers", verifyAdmin, getListUsers);
router.get("/:id/listarticles", verifyAdmin, getListArticles);

export default router;
