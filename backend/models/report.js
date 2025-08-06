import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Report", reportSchema);