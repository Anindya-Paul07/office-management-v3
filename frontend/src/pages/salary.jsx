import React, { useEffect, useState } from 'react';
import { getSalaries, createSalary } from '../services/salaryService';
import { getEmployees } from '../services/employeeService';

const Salary = () => {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee: '',
    amount: '',
    paidOn: '',
    status: 'Pending'
  });

  useEffect(() => {
    fetchSalaries();
    fetchEmployees();
  }, []);

  const fetchSalaries = async () => {
    const res = await getSalaries();
    setSalaries(res.data);
  };

  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  const handleSubmit = async () => {
    if (!form.employee || !form.amount || !form.paidOn) return alert("All fields required");
    await createSalary(form);
    setForm({ employee: '', amount: '', paidOn: '', status: 'Pending' });
    fetchSalaries();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Salaries</h1>

      {/* Form */}
      <div className="space-x-2 mb-6">
        <select
          value={form.employee}
          onChange={(e) => setForm({ ...form, employee: e.target.value })}
          className="border px-2 py-1"
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp._id} value={emp._id}>{emp.name}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="border px-2 py-1"
        />

        <input
          type="date"
          value={form.paidOn}
          onChange={(e) => setForm({ ...form, paidOn: e.target.value })}
          className="border px-2 py-1"
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border px-2 py-1"
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>

        <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-1 rounded">
          Add Salary
        </button>
      </div>

      {/* Salary list */}
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Employee</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Paid On</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((s) => (
            <tr key={s._id}>
              <td className="border px-4 py-2">{s.employee?.name || 'N/A'}</td>
              <td className="border px-4 py-2">৳{s.amount}</td>
              <td className="border px-4 py-2">{new Date(s.paidOn).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Salary;
