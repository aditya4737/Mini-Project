import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    
  };

  return (
    <header className="bg-white">
      <div className="w-full flex h-16 items-center gap-8 px-4 sm:px-6 lg:px-8">

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link to="/" className="text-black transition hover:text-gray-700"><b>Home</b></Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              {/* Check if the user is logged in */}
              {user?.email ? (
                <div className="flex items-center gap-4">
                  <span className="text-black">{user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Link
                    className="block rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                    to="/Signin"
                  >
                    Login
                  </Link>

                  <Link
                    className="hidden rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gray-100 sm:block"
                    to="/Signup"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            <button
              className="block rounded bg-white p-2.5 text-black transition hover:bg-gray-100 hover:text-gray-700 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="fixed top-0 right-0 h-full w-64 bg-white p-4">
            <button
              className="mb-4 text-black hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              Close
            </button>

            <nav aria-label="Mobile navigation">
              <ul className="space-y-4 text-sm">
                <li>
                  <Link to="/" className="text-black transition hover:text-gray-700"> Home </Link>
                </li>
                <li>
                  <Link to="/About" className="text-black transition hover:text-gray-700"> About </Link>
                </li>
                <li>
                  <Link to="/Services" className="text-black transition hover:text-gray-700"> Services </Link>
                </li>
                {user?.email ? (
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-black transition hover:text-gray-700"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link to="/Signin" className="text-black transition hover:text-gray-700"> Login </Link>
                    </li>
                    <li>
                      <Link to="/Signup" className="text-black transition hover:text-gray-700"> Register </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
