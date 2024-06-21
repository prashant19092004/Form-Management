import React, { useState } from 'react';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="">
      <ul className="flex space-x-4">
        <li className="relative">
          <button 
            onClick={toggleDropdown}
            className="text-white focus:outline-none"
          >
            <img className='h-10 w-10 rounded-full object-cover' src='https://images.unsplash.com/photo-1474447976065-67d23accb1e3?q=80&w=1285&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='' />
          </button>
          {isOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-gray-700 text-white shadow-lg">
              <li className="px-4 py-2 hover:bg-gray-600">Web Development</li>
              <li className="px-4 py-2 hover:bg-gray-600">App Development</li>
              <li className="px-4 py-2 hover:bg-gray-600">SEO</li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default ProfileDropdown;