import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-grey-500 shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Welcome, Admin</h1>
      <div className="text-sm text-blue-600">Office Management System</div>
    </header>
  );
};

export default Navbar;
