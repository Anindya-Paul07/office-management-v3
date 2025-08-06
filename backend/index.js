import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
//import { fileURLToPath } from 'url';

import employeeRoutes from './routes/employee.route.js';
import taskRoutes from './routes/task.route.js';
import attendanceRoutes from './routes/attendance.route.js';
import salaryRoutes from './routes/salary.route.js';
import reportRoutes from './routes/report.route.js';

dotenv.config();
const app = express();
const Port = process.env.Port || 5000;

//const __filename = fileURLToPath(import.meta.url);
const __dirname = process.cwd();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client')));

// Use the routes
app.use('/api/employees', employeeRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/salaries', salaryRoutes);
app.use('/api/reports', reportRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(Port, () => console.log('Server running on port 5000')))
  .catch(err => console.error(err));

