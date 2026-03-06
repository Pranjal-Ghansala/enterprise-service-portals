import Request from "../models/Request.js";

// Employee: Submit request
export const submitRequest = async (req, res) => {
  const { title, description } = req.body;
  const request = await Request.create({
    title,
    description,
    createdBy: req.user._id,
  });
  res.json(request);
};

// Employee: Get own requests
export const getMyRequests = async (req, res) => {
  const requests = await Request.find({ createdBy: req.user._id }).populate(
    "createdBy",
    "name email"
  );
  res.json(requests);
};

// Admin: Get all requests
export const getAllRequests = async (req, res) => {
  const requests = await Request.find().populate("createdBy", "name email");
  res.json(requests);
};

// Admin: Update request
export const updateRequest = async (req, res) => {
  const { id } = req.params;
  const { status, assignedTo } = req.body;

  const request = await Request.findById(id);
  if (!request) return res.status(404).json({ message: "Request not found" });

  if (status) request.status = status;
  if (assignedTo) request.assignedTo = assignedTo;

  await request.save();
  res.json(request);
};