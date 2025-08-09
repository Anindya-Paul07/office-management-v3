import React from "react";
import DashboardCard from "../components/dashboardcard";

const Dashboard = () => {
  const stats = [
    { title: "Total Employees", value: 42, color: "bg-blue-500" },
    { title: "Tasks Pending", value: 8, color: "bg-yellow-500" },
    { title: "Present Today", value: 35, color: "bg-green-500" },
    { title: "Salaries Due", value: 5, color: "bg-red-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="min-h-screen bg-green-900 text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold text-green-400">
          Tailwind is working!
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
