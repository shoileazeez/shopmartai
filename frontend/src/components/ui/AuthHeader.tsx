"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/src/components/layout/AuthContext";

export default function AuthHeader() {
  const { user, logout } = useAuth();
  const [greeting, setGreeting] = useState("Good morning");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <header className="bg-white border-b">
      <div className="flex items-center justify-between px-6 py-4">
        {/* LEFT */}
        <div>
          <h1 className="text-xl font-semibold">
            {greeting},{" "}
            <span className="font-bold">
              {user?.email?.split("@")[0] ?? "Guest"}
            </span>
          </h1>
          <p className="text-sm text-neutral-500">
            Here’s what’s happening with your store today.
          </p>
        </div>

        {/* CENTER SEARCH */}
        <div className="hidden lg:flex flex-1 mx-10">
          <input
            className="input"
            placeholder="Search orders, items..."
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          {/* Notifications */}
          <button className="relative">
            <svg
              className="w-6 h-6 text-neutral-600"
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
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2"
            >
              <img
                src="/default-avatar.png"
                alt="Avatar"
                className="w-9 h-9 rounded-full"
              />
              <span className="hidden md:block text-sm font-medium">
                {user?.email}
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-md z-50">
                <button
                  onClick={() => (window.location.href = "/account")}
                  className="block w-full text-left px-4 py-2 hover:bg-neutral-100"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-neutral-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="px-6 pb-4 lg:hidden">
        <input className="input" placeholder="Search..." />
      </div>
    </header>
  );
}
