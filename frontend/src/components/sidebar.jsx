import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Tasks", path: "/tasks" },
    { name: "Attendance", path: "/attendance" },
    { name: "Salary", path: "/salary" },
    { name: "Employees", path: "/employees" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <div className="w-64 bg-black shadow-md h-full flex flex-col">
      <div className="p-6 font-bold text-xl text-red-500 border-b border-gray-700">Office Manager</div>
      <nav className="flex-1 p-4">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded mb-2 ${
                isActive ? "bg-blue-500 text-white" : "text-red-500 hover:bg-gray-800"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
