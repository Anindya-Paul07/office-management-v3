import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';

import Dashboard from './pages/dashboard';
import Tasks from './pages/task';
import Attendance from './pages/attendance';
import Salary from './pages/salary';
import Employees from './pages/employee';
import Reports from './pages/report';
import Departments from './pages/department';
import AddEmployee from './pages/addemployee';
import Designations from './pages/designation';

const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="p-4 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/salary" element={<Salary />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/designations" element={<Designations />} />
            <Route path="/employees/add" element={<AddEmployee />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
