import { FiHome, FiBriefcase, FiList, FiUser, FiLogOut } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-[200px] bg-gradient-to-b from-indigo-800 to-purple-900 text-white shadow-lg">
        {/* Company Logo/Name */}
        <div className="flex items-center justify-center p-6 border-b border-indigo-600">
          <FaBuilding className="text-2xl mr-2 text-purple-300" />
          <h1 className="text-xl font-bold text-white">HR Portal</h1>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8">
          <SidebarLink
            icon={<FiBriefcase className="text-lg" />}
            text="Post a Job"
            link="post"
          />
          <SidebarLink
            icon={<FiList className="text-lg" />}
            text="Interviews"
            link="interviews"
          />
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0  p-4 border-t border-indigo-600">
          <Link
            to="/"
            className="flex items-center  p-3 rounded-lg w-[150px] cursor-pointer text-indigo-200 hover:bg-indigo-700 hover:text-white transition-all"
          >
            <FiLogOut className="text-lg mr-3" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Reusable Sidebar Link Component
const SidebarLink = ({ icon, text, link, active = false }) => {
  return (
    <Link
      to={`/${link}`}
      className={`flex items-center px-6 py-3 mx-2 my-1 rounded-lg transition-all ${
        active
          ? "bg-indigo-700 text-white shadow-md"
          : "text-indigo-200 hover:bg-indigo-700 hover:text-white"
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span className="font-medium">{text}</span>
      {active && (
        <span className="ml-auto h-2 w-2 bg-purple-400 rounded-full"></span>
      )}
    </Link>
  );
};

export default Sidebar;
