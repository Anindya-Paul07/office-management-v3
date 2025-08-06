import Attendance from '../models/attendance.js';

export const markAttendance = async (req, res) => {
  try {
    const { employee, date, status } = req.body;

    const existing = await Attendance.findOne({ employee, date });

    if (existing) {
      existing.status = status;
      await existing.save();
      res.status(200).json(existing); // Updated
    } else {
      const attendance = new Attendance({ employee, date, status });
      await attendance.save();
      res.status(201).json(attendance); // New
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().populate('employee');
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const records = await Attendance.find({ date }).populate("employee");
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};