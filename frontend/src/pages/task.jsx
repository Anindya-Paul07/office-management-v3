import React, { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";
import { getEmployees } from "../services/employeeService";

const statusIcons = {
  Pending: "🕒",
  "In Progress": "🔧",
  Completed: "✔️",
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    status: "Pending",
  });
  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState({});

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  const handleAdd = async () => {
    if (!newTask.title) return;
    await createTask(newTask);
    setNewTask({
      title: "",
      description: "",
      assignedTo: "",
      dueDate: "",
      status: "Pending",
    });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleUpdate = async (id) => {
    await updateTask(id, editedTask);
    setEditingId(null);
    fetchTasks();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Tasks</h1>

      {/* Add Task Form */}
      <div className="mb-6 space-y-2 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-medium">Add New Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="border px-2 py-1 w-full"
        />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="border px-2 py-1 w-full"
        />
        <select
          value={newTask.assignedTo}
          onChange={(e) =>
            setNewTask({ ...newTask, assignedTo: e.target.value })
          }
          className="border px-2 py-1 w-full"
        >
          <option value="">Assign to</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          className="border px-2 py-1 w-full"
        />
        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          className="border px-2 py-1 w-full"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          type="file"
          multiple
          accept=".pdf,.csv,.xls,.xlsx,.png,.jpg,.jpeg"
          onChange={(e) =>
            setNewTask({ ...newTask, attachments: [...e.target.files] })
          }
          className="border px-2 py-1 w-full"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-white shadow rounded p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {statusIcons[task.status]} {task.title}
                </h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-sm">
                  👤 Assigned:{" "}
                  <span className="italic text-gray-700">
                    {task.assignedTo?.name || "Unassigned"}
                  </span>
                </p>
                <p className="text-sm">📅 Due: {task.dueDate?.slice(0, 10)}</p>
                <p className="text-sm">📌 Status: {task.status}</p>
                {task.attachments && task.attachments.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-sm font-semibold">📎 Attachments:</h4>
                    <ul className="space-y-1 mt-1">
                      {task.attachments.map((filePath, idx) => {
                        const fileUrl = `http://localhost:5000/${filePath.replace(
                          /\\/g,
                          "/"
                        )}`;
                        const fileExt = filePath.split(".").pop().toLowerCase();
                        const isImage = ["jpg", "jpeg", "png"].includes(
                          fileExt
                        );
                        return (
                          <li key={idx}>
                            {isImage ? (
                              <img
                                src={fileUrl}
                                alt={`Attachment ${idx + 1}`}
                                className="w-32 h-auto rounded shadow border"
                              />
                            ) : (
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                              >
                                {filePath.split("/").pop()}
                              </a>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditingId(task._id);
                    setEditedTask({
                      title: task.title,
                      description: task.description,
                      assignedTo: task.assignedTo?._id || "",
                      dueDate: task.dueDate?.slice(0, 10),
                      status: task.status,
                    });
                  }}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Edit Mode */}
            {editingId === task._id && (
              <div className="mt-3 space-y-2 border-t pt-3">
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, title: e.target.value })
                  }
                  className="border px-2 py-1 w-full"
                />
                <textarea
                  value={editedTask.description}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      description: e.target.value,
                    })
                  }
                  className="border px-2 py-1 w-full"
                />
                <select
                  value={editedTask.assignedTo}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, assignedTo: e.target.value })
                  }
                  className="border px-2 py-1 w-full"
                >
                  <option value="">Assign to</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={editedTask.dueDate}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, dueDate: e.target.value })
                  }
                  className="border px-2 py-1 w-full"
                />
                <select
                  value={editedTask.status}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, status: e.target.value })
                  }
                  className="border px-2 py-1 w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(task._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
