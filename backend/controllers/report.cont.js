import Report from '../models/report.js';

export const createReport = async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('createdBy');
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
