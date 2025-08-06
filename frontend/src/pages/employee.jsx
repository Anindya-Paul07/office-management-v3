import React, { useEffect, useState } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    email: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  const handleAdd = async () => {
    await createEmployee(newEmployee);
    setNewEmployee({ name: "", position: "", email: "" });
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  const handleUpdate = async (id) => {
    await updateEmployee(id, editedEmployee);
    setEditingId(null);
    fetchEmployees();
  };

  const [editingId, setEditingId] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({
    name: "",
    position: "",
    email: "",
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Employees</h1>

      {/* Add new employee */}
      <div className="mb-6 space-x-2">
        <input
          type="text"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, name: e.target.value })
          }
          className="border px-2 py-1"
        />
        <input
          type="text"
          placeholder="Position"
          value={newEmployee.position}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, position: e.target.value })
          }
          className="border px-2 py-1"
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmployee.email}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, email: e.target.value })
          }
          className="border px-2 py-1"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Add
        </button>
      </div>

      {/* List employees */}
      {employees.map((emp) => (
      <div key={emp._id} className="bg-white p-4 shadow rounded relative">
        {editingId === emp._id ? (
          <>
            <input
              type="text"
              value={editedEmployee.name}
              onChange={(e) =>
                setEditedEmployee({ ...editedEmployee, name: e.target.value })
              }
              className="border px-2 py-1 mb-1 w-full"
            />
            <input
              type="text"
              value={editedEmployee.position}
              onChange={(e) =>
                setEditedEmployee({
                  ...editedEmployee,
                  position: e.target.value,
                })
              }
              className="border px-2 py-1 mb-1 w-full"
            />
            <input
              type="email"
              value={editedEmployee.email}
              onChange={(e) =>
                setEditedEmployee({ ...editedEmployee, email: e.target.value })
              }
              className="border px-2 py-1 mb-2 w-full"
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleUpdate(emp._id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold">{emp.name}</h2>
            <p>{emp.position}</p>
            <p>{emp.email}</p>
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => {
                  setEditingId(emp._id);
                  setEditedEmployee({
                    name: emp.name,
                    position: emp.position,
                    email: emp.email,
                  });
                }}
                className="text-blue-500 font-bold"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(emp._id)}
                className="text-red-600 font-bold"
              >
                ×
              </button>
            </div>
          </>
        )}
      </div>
      ))}
    </div>
  );
};

export default Employees;
