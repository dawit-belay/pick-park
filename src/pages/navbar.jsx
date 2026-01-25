import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import AuthModal from "../components/AuthModal";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <>
      <nav className="bg-black/80 backdrop-blur-md border-b border-white/10 fixed w-full top-0 left-0 z-40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400 hover:from-purple-300 hover:to-orange-300 transition-all"
            >
              🚗 Pick Park
            </Link>

            {/* Center Navigation - Only visible if logged in */}
            {user?.role && (
              <div className="hidden sm:flex items-center space-x-8">
                {user?.role === "officer" && (
                  <>
                    <Link
                      to="/cars"
                      className="text-gray-300 hover:text-white font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Parking
                    </Link>
                  </>
                )}
                {(user?.role === "admin" || user?.role === "demo") && (
                  <>
                    <Link
                      to="/admin"
                      className="text-gray-300 hover:text-white font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                      Pricing
                    </Link>
                    {user?.role === "admin" && (
                      <Link
                        to="/admin/register-officer"
                        className="text-gray-300 hover:text-white font-medium transition-colors duration-200 flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3.414a2 2 0 01-2-2V6.414a2 2 0 012-2h15.172a2 2 0 012 2v13.172a2 2 0 01-2 2z" />
                        </svg>
                        Officers
                      </Link>
                    )}
                    <Link
                      to="/cars"
                      className="text-gray-300 hover:text-white font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Vehicles
                    </Link>
                    <Link
                      to="/report"
                      className="text-gray-300 hover:text-white font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Reports
                    </Link>
                  </>
                )}
              </div>
            )}

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {!user?.role ? (
                <button
                  onClick={() => setAuthModal("signin")}
                  className="px-6 py-2 text-sm font-semibold bg-gradient-to-r from-purple-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Sign In
                </button>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:border-white/30 transition-all"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-white font-medium text-sm">{user?.name}</span>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-gray-400 text-xs uppercase tracking-wide">Account</p>
                        <p className="text-white font-semibold mt-1">{user?.name}</p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modals */}
      <AuthModal
        isOpen={authModal === "signin"}
        onClose={() => setAuthModal(null)}
        mode="signin"
      />
    </>
  );
}
