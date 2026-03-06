 import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    category: { type: String, enum: ["hardware", "software", "network", "access"], default: "software" },
    priority: { type: String, enum: ["low", "medium", "high", "critical"], default: "medium" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // for admin assignment
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);