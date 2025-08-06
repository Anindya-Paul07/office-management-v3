import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  amount: Number,
  paidOn: Date,
  status: { type: String, enum: ["Paid", "Pending"], default: "Pending" }
});

export default mongoose.model("Salary", salarySchema);
