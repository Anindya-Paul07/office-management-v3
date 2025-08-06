import React, { useEffect, useState } from 'react';
import { getReports, createReport } from '../services/reportService';
import { getEmployees } from '../services/employeeService';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    title: '',
    content: '',
    createdBy: ''
  });

  useEffect(() => {
    fetchReports();
    fetchEmployees();
  }, []);

  const fetchReports = async () => {
    const res = await getReports();
    setReports(res.data);
  };

  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.content || !form.createdBy) return alert("All fields are required");
    await createReport(form);
    setForm({ title: '', content: '', createdBy: '' });
    fetchReports();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Reports</h1>

      {/* Form */}
      <div className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="Report Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border w-full px-2 py-1"
        />

        <textarea
          placeholder="Report Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="border w-full px-2 py-1 h-24"
        />

        <select
          value={form.createdBy}
          onChange={(e) => setForm({ ...form, createdBy: e.target.value })}
          className="border w-full px-2 py-1"
        >
          <option value="">Select Author</option>
          {employees.map(emp => (
            <option key={emp._id} value={emp._id}>{emp.name}</option>
          ))}
        </select>

        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-1 rounded">
          Submit Report
        </button>
      </div>

      {/* Report List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report._id} className="bg-white shadow p-4 rounded">
            <h2 className="text-xl font-semibold">{report.title}</h2>
            <p className="text-gray-700 mt-2">{report.content}</p>
            <div className="text-sm text-gray-500 mt-2">
              By: {report.createdBy?.name || 'Unknown'} | {new Date(report.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
