import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: String,
  position: String,
  salary: Number,
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  joinedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Employee", employeeSchema);
