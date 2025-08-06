import React, { useEffect, useState } from 'react';
import { getEmployees } from '../services/employeeService';
import { getAttendance, markAttendance } from '../services/attendanceService';

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  const fetchAttendance = async () => {
    const res = await getAttendance();
    setAttendanceList(res.data);
  };

  const handleStatusChange = (employeeId, status) => {
    setStatuses(prev => ({ ...prev, [employeeId]: status }));
  };

  const handleSubmit = async () => {
    for (const empId in statuses) {
      await markAttendance({
        employee: empId,
        date: selectedDate,
        status: statuses[empId]
      });
    }
    setStatuses({});
    fetchAttendance();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present': return '✅';
      case 'Absent': return '❌';
      case 'Leave': return '🟡';
      default: return '⬜';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Attendance</h1>

      <div className="mb-4">
        <label className="font-semibold mr-2">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-2 py-1"
        />
      </div>

      <div className="space-y-4 mb-6">
        {employees.map(emp => (
          <div key={emp._id} className="bg-white shadow p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{emp.name}</p>
              <p className="text-sm text-gray-500">{emp.role}</p>
            </div>
            <div className="space-x-2">
              {["Present", "Absent", "Leave"].map(status => (
                <label key={status} className="mr-2">
                  <input
                    type="radio"
                    name={`status-${emp._id}`}
                    value={status}
                    checked={statuses[emp._id] === status}
                    onChange={() => handleStatusChange(emp._id, status)}
                    className="mr-1"
                  />
                  {status}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Attendance
      </button>

      <h2 className="text-xl font-semibold mt-8 mb-2">All Attendance Records</h2>
      <div className="space-y-2">
        {attendanceList.map((record) => (
          <div key={record._id} className="bg-gray-100 p-2 rounded">
            {getStatusIcon(record.status)} {record.employee?.name || "Unknown"} - {record.status} on {new Date(record.date).toLocaleDateString()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendance;
