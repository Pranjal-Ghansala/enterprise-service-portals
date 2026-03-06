import express from "express";
import {
  submitRequest,
  getMyRequests,
  getAllRequests,
  updateRequest,
} from "../controllers/requestController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Employee routes
router.post("/", protect, submitRequest);       // submit request
router.get("/me", protect, getMyRequests);     // get employee's own requests

// Admin routes
router.get("/", protect, admin, getAllRequests); // admin sees all
router.put("/:id", protect, admin, updateRequest);  // admin updates request

export default router;