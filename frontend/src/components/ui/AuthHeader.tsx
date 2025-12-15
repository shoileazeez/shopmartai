import { useState, useEffect } from "react";
import { tokenStorage } from "../utils/tokens";

interface User {
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export default function AuthHeader() {
  const [user, setUser] = useState<User>({
    firstName: "John",
    lastName: "Doe",
    avatarUrl: "/default-avatar.png",
  });
  const [greeting, setGreeting] = useState("Good morning");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Compute greeting based on current time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  // TODO: Replace with real API call to fetch user info
  useEffect(() => {
    // Example: fetch("/api/accounts/me")...
    setUser({
      firstName: "John",
      lastName: "Doe",
      avatarUrl: "/default-avatar.png",
    });
  }, []);

  const handleLogout = () => {
    tokenStorage.clear();
    window.location.href = "/login";
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Left: Greeting */}
          <div className="flex-shrink-0 text-lg font-semibold">
            {greeting}, {user.firstName}
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 px-4 hidden md:flex">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-md text-black focus:outline-none"
            />
          </div>

          {/* Right: Notifications + User */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative focus:outline-none">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z"
                />
              </svg>
              {/* Example notification badge */}
              <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src={user.avatarUrl}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden sm:inline">{user.firstName}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50">
                  <button
                    onClick={() => {
                      window.location.href = "/account";
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-md text-black focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
}
