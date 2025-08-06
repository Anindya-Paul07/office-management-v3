import Salary from '../models/salary.js';

export const createSalary = async (req, res) => {
  try {
    const salary = new Salary(req.body);
    await salary.save();
    res.status(201).json(salary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find().populate('employee');
    res.json(salaries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
