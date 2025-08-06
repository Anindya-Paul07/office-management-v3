import Task from '../models/task.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Multer storage with auto-folder creation
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/tasks";
    fs.mkdirSync(dir, { recursive: true }); // Create if doesn't exist
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const allowed = /pdf|csv|xls|xlsx|png|jpg|jpeg/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only pdf, csv, xls, xlsx, png, jpg, jpeg allowed"));
    }
  },
});

export const uploadTaskAttachment = upload.array("attachments", 5); // max 5 files

export const assignTask = async (req, res) => {
  try {
    const attachments = req.files.map((file) => file.path);
    const task = new Task({ ...req.body, attachments });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
