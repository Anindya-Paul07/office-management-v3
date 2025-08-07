import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
});

const Department = mongoose.model('Department', departmentSchema);
export default Department;
