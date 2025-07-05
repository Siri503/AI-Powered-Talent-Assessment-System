import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineFileText,
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineRocket,
} from "react-icons/ai";
import { FiBriefcase } from "react-icons/fi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <header className="bg-indigo-700 text-white fixed w-full z-50 shadow-lg">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <AiOutlineRocket className="text-2xl mr-2" />
              <span className="text-xl font-bold">CareerLaunch</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/home"
                className="hover:bg-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <AiOutlineHome className="mr-1" /> Home
              </Link>
              <Link
                to="/alljobs"
                className="hover:bg-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <AiOutlineSearch className="mr-1" /> All Jobs
              </Link>

              <button
                onClick={handleLogout}
                className="hover:bg-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <AiOutlineLogout className="mr-1" /> Logout
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hover:text-indigo-200 focus:outline-none"
            >
              {isOpen ? (
                <AiOutlineClose size={24} />
              ) : (
                <AiOutlineMenu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-indigo-800`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/home"
            className="hover:bg-indigo-700  px-3 py-2 rounded-md text-base font-medium flex items-center"
          >
            <AiOutlineHome className="mr-2" /> Home
          </Link>
          <Link
            to="/jobs"
            className="hover:bg-indigo-700  px-3 py-2 rounded-md text-base font-medium flex items-center"
          >
            <AiOutlineSearch className="mr-2" /> All Jobs
          </Link>
          <Link
            to="/applied-jobs"
            className="hover:bg-indigo-700  px-3 py-2 rounded-md text-base font-medium flex items-center"
          >
            <FiBriefcase className="mr-2" /> Applied Jobs
          </Link>
          <Link
            to="/interviews"
            className="hover:bg-indigo-700  px-3 py-2 rounded-md text-base font-medium flex items-center"
          >
            <AiOutlineCalendar className="mr-2" /> Interviews
          </Link>
          <Link
            to="/profile"
            className="hover:bg-indigo-700  px-3 py-2 rounded-md text-base font-medium flex items-center"
          >
            <AiOutlineUser className="mr-2" /> Profile
          </Link>
          <button
            onClick={handleLogout}
            className="hover:bg-indigo-700  w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center"
          >
            <AiOutlineLogout className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
