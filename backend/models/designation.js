import mongoose from 'mongoose';

const designationSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
});

const Designation = mongoose.model('Designation', designationSchema);
export default Designation;
