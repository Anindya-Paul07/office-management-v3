import Designation from '../models/designation.js';
import Employee from '../models/employee.js';

// Create new designation
export const createDesignation = async (req, res) => {
  try {
    const designation = new Designation(req.body);
    await designation.save();
    res.status(201).json(designation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all designations
export const getDesignations = async (req, res) => {
  try {
    const designations = await Designation.find();
    res.json(designations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update designation
export const assignDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const { designationId } = req.body;

    const employee = await Employee.findByIdAndUpdate(id, { designation: designationId }, { new: true });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete designation
export const deleteDesignation = async (req, res) => {
  try {
    await Designation.findByIdAndDelete(req.params.id);
    res.json({ message: "Designation deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
