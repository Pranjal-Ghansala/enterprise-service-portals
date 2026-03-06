 import express from "express";
import { getAllUsers, updateUserRole, deleteUser } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin only routes
router.get("/", protect, admin, getAllUsers);
router.put("/:id", protect, admin, updateUserRole);
router.delete("/:id", protect, admin, deleteUser);

export default router;