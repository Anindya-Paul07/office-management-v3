import React, { useEffect, useState } from "react";
import DashboardCard from "../components/dashboardcard";
import { getEmployees } from "../services/employeeService";
import { getTasks } from "../services/taskService";
import { getAttendance } from "../services/attendanceService";
import { getSalaries } from "../services/salaryService";

const Dashboard = () => {
  const [stats, setStats] = useState([
    { title: "Total Employees", value: 0, color: "bg-blue-500" },
    { title: "Tasks Pending", value: 0, color: "bg-yellow-500" },
    { title: "Present Today", value: 0, color: "bg-green-500" },
    { title: "Salaries Due", value: 0, color: "bg-red-500" },
  ]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [empRes, taskRes, attRes, salRes] = await Promise.all([
        getEmployees(),
        getTasks(),
        getAttendance(),
        getSalaries()
      ]);

      const employees = empRes.data;
      const tasks = taskRes.data;
      const attendance = attRes.data;
      const salaries = salRes.data;

      const today = new Date().toISOString().split("T")[0];

      const updatedStats = [
        {
          title: "Total Employees",
          value: employees.length,
          color: "bg-blue-500"
        },
        {
          title: "Tasks Pending",
          value: tasks.filter(task => task.status !== "Completed").length,
          color: "bg-yellow-500"
        },
        {
          title: "Present Today",
          value: attendance.filter(att => att.status === "Present" && att.date.startsWith(today)).length,
          color: "bg-green-500"
        },
        {
          title: "Salaries Due",
          value: salaries.filter(sal => sal.status === "Pending").length,
          color: "bg-red-500"
        }
      ];

      setStats(updatedStats);
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
