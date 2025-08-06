import Attendance from '../models/attendance.js';

export const markAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).json(attendance);
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
