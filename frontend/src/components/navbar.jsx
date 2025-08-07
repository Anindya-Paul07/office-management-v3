import React, { useState } from 'react';
import {
  Bars3Icon,
  ArrowsPointingOutIcon,
  GlobeAltIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-blue-100
 shadow-sm px-6 py-4 flex justify-between items-center">
      {/* Left section */}
      <div className="flex items-center gap-4">
       
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 relative">
       

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center hover:ring-2 ring-blue-300"
          >
            <UserCircleIcon className="h-7 w-7 text-blue-500" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-red-500 hover:bg-red-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
