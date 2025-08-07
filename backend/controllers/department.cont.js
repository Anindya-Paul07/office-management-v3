import Department from '../models/department.js';
import Employee from '../models/employee.js';

// Create new department
export const createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.status(201).json(department);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update department
export const assignDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { departmentId } = req.body;

    const employee = await Employee.findByIdAndUpdate(id, { department: departmentId }, { new: true });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete department
export const deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: "Department deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
