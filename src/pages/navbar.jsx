import { Link } from "react-router-dom";  
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50 p-2">
      <div className="flex justify-between items-center mx-4">
          <Link to="/" className="text-xl font-bold text-blue-600">Pick Park</Link>
          
          {!user?.role && (
          <div className="flex space-x-4">
            <Link to="/admin-login" className="hover:text-blue-500 transition-colors">admin-login</Link>
            <Link to="/officer-login" className="hover:text-blue-500 transition-colors">officer-login</Link>
          </div>
          )}
            {user?.role && (
              <div className="flex items-center space-x-4">
                {user?.role === "officer" && (
                  <div className="flex space-x-4">
                    <Link to="/cars" className="hover:text-blue-500 transition-colors">cars</Link>
                  </div>
                )}
                {user?.role === "admin" && (
                  <div className="flex space-x-4">
                    <Link to="/admin" className="hover:text-blue-500 transition-colors">admin</Link>
                    <Link to="/admin/register-officer" className="hover:text-blue-500 transition-colors">officers</Link>
                    <Link to="/cars" className="hover:text-blue-500 transition-colors">cars</Link>
                    <Link to="/report" className="hover:text-blue-500 transition-colors">report</Link>
                  </div>
                )}
                <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="text-white font-medium px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none"
                    >
                      {user.name}
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md z-50">
                        <button
                          onClick={() => {
                            logout();
                            setDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
             </div>
            )}
      </div>
    </nav>
  );
}
