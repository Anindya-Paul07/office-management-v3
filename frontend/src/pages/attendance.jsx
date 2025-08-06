import React, { useEffect, useState } from 'react';
import { getEmployees } from '../services/employeeService';
import { getAttendanceByDate, markAttendance } from '../services/attendanceService';

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAttendanceByDate(selectedDate);
    }
  }, [selectedDate]);

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  const fetchAttendanceByDate = async (date) => {
    try {
      const res = await getAttendanceByDate(date);
      setAttendanceList(res.data);

      // Pre-fill statuses if already marked
      const newStatuses = {};
      res.data.forEach(record => {
        newStatuses[record.employee?._id] = record.status;
      });
      setStatuses(newStatuses);
    } catch (err) {
      console.error("Error fetching attendance by date:", err);
    }
  };

  const handleStatusChange = (employeeId, status) => {
    setStatuses(prev => ({ ...prev, [employeeId]: status }));
  };

  const handleSubmit = async () => {
    try {
      for (const empId in statuses) {
        await markAttendance({
          employee: empId,
          date: selectedDate,
          status: statuses[empId]
        });
      }
      fetchAttendanceByDate(selectedDate);
      alert("Attendance submitted successfully.");
    } catch (err) {
      console.error("Error submitting attendance:", err);
    }
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

      {/* ✅ Date Picker (Unchanged) */}
      <div className="mb-4">
        <label className="font-semibold mr-2">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-2 py-1"
        />
      </div>

      {/* ✅ Attendance Form */}
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

      {/* ✅ Submit Button */}
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Attendance
      </button>

      {/* ✅ Filtered Attendance Records */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Attendance Records for {selectedDate}</h2>
      <div className="space-y-2">
        {attendanceList.map((record) => (
          <div key={record._id} className="bg-gray-100 p-2 rounded">
            {getStatusIcon(record.status)} {record.employee?.name || "Unknown"} - {record.status}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendance;
