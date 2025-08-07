import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Squares2X2Icon,
  UserIcon,
  UserGroupIcon,
  AdjustmentsVerticalIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  ClockIcon,
  BuildingOffice2Icon,
  DocumentTextIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-72 bg-[#1E293B] text-white h-screen flex flex-col shadow-md">
      <div className="p-6 text-2xl font-bold text-blue-400 border-b border-blue-700">
        W3 Management
      </div>

      <nav className="flex-1 px-2 py-4 overflow-y-auto space-y-1">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="text-xs uppercase text-gray-400 px-4 pt-4 pb-1 tracking-wider">
              {section.title}
            </div>
            {section.items.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="flex items-center justify-between w-full px-4 py-2 rounded hover:bg-blue-500 transition"
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.subItems ? (
                    openMenus[item.label] ? (
                      <ChevronDownIcon className="h-4 w-4" />
                    ) : (
                      <ChevronRightIcon className="h-4 w-4" />
                    )
                  ) : null}
                </button>
                {item.subItems && openMenus[item.label] && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((sub) => (
                      <SubNavItem key={sub.label} to={sub.to} label={sub.label} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-blue-700 text-sm text-gray-400">
        © 2025 W3 Management
      </div>
    </div>
  );
};

const SubNavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-1 rounded text-sm transition ${
        isActive ? "bg-blue-500 text-white" : "hover:bg-blue-600 text-gray-200"
      }`
    }
  >
    {label}
  </NavLink>
);

const sections = [
  {
    title: "Dashboard",
    items: [
      {
        label: "Dashboard",
        icon: <Squares2X2Icon className="h-5 w-5" />,
        subItems: [
          { label: "Overview", to: "/" },
          { label: "Reports", to: "/reports" },
        ],
      },
    ],
  },
  {
    title: "Employees",
    items: [
      {
        label: "Employees",
        icon: <UserIcon className="h-5 w-5" />,
        subItems: [
          { label: "All Employees", to: "/employees" },
          { label: "Add New Employee", to: "/employees/add" },
          { label: "Departments", to: "/departments" },
          { label: "Designations", to: "/designations" },
        ],
      },
    ],
  },
  {
    title: "Tasks",
    items: [
      {
        label: "Tasks",
        icon: <AdjustmentsVerticalIcon className="h-5 w-5" />,
        subItems: [
          { label: "Task List", to: "/tasks" },
          { label: "Assign Task", to: "/tasks/assign" },
          { label: "Task Calendar", to: "/tasks/calendar" },
        ],
      },
      {
        label: "Task Management",
        icon: <ClipboardDocumentListIcon className="h-5 w-5" />,
        subItems: [
          { label: "Assigned Tasks", to: "/tasks/assigned" },
          { label: "In Progress", to: "/tasks/in-progress" },
          { label: "Completed", to: "/tasks/completed" },
          { label: "Overdue Tasks", to: "/tasks/overdue" },
        ],
      },
    ],
  },
  {
    title: "Salaries",
    items: [
      {
        label: "Payroll",
        icon: <CurrencyDollarIcon className="h-5 w-5" />,
        subItems: [
          { label: "Salary List", to: "/salaries" },
          { label: "Generate Payslip", to: "/salaries/generate" },
          { label: "Allowances & Deductions", to: "/salaries/adjustments" },
          { label: "Payroll Settings", to: "/salaries/settings" },
        ],
      },
    ],
  },
  {
    title: "Leave",
    items: [
      {
        label: "Leave Management",
        icon: <ArrowsRightLeftIcon className="h-5 w-5" />,
        subItems: [
          { label: "Leave Requests", to: "/leave/requests" },
          { label: "Approve/Reject Leave", to: "/leave/approval" },
          { label: "Leave Balance", to: "/leave/balance" },
          { label: "Leave Policy", to: "/leave/policy" },
        ],
      },
    ],
  },
  {
    title: "Attendance",
    items: [
      {
        label: "Attendance",
        icon: <CalendarDaysIcon className="h-5 w-5" />,
        subItems: [
          { label: "Daily Attendance", to: "/attendance/daily" },
          { label: "Monthly Report", to: "/attendance/monthly" },
          { label: "Late Entries", to: "/attendance/late" },
          { label: "Manual Entry", to: "/attendance/manual" },
        ],
      },
    ],
  },
  {
    title: "Assets",
    items: [
      {
        label: "Office Assets",
        icon: <BuildingOffice2Icon className="h-5 w-5" />,
        subItems: [
          { label: "Asset List", to: "/assets" },
          { label: "Add Asset", to: "/assets/add" },
          { label: "Maintenance Logs", to: "/assets/maintenance" },
        ],
      },
    ],
  },
  {
    title: "Documents",
    items: [
      {
        label: "Documents",
        icon: <DocumentTextIcon className="h-5 w-5" />,
        subItems: [
          { label: "Employee Documents", to: "/documents/employees" },
          { label: "Company Policies", to: "/documents/policies" },
          { label: "Upload / Manage", to: "/documents/manage" },
        ],
      },
    ],
  },
  {
    title: "Users",
    items: [
      {
        label: "User Management",
        icon: <ShieldCheckIcon className="h-5 w-5" />,
        subItems: [
          { label: "Roles & Permissions", to: "/users/roles" },
          { label: "Admin Users", to: "/users/admins" },
          { label: "Login History", to: "/users/logins" },
        ],
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        label: "Settings",
        icon: <Cog6ToothIcon className="h-5 w-5" />,
        subItems: [
          { label: "Company Info", to: "/settings/company" },
          { label: "Working Hours", to: "/settings/hours" },
          { label: "Holidays / Weekends", to: "/settings/holidays" },
          { label: "Email Notifications", to: "/settings/notifications" },
        ],
      },
    ],
  },
];

export default Sidebar;
