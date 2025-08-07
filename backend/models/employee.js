import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  designation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Designation',
    required: true, 
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: false,
  },
  salary: Number,
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  joinedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Employee", employeeSchema);
