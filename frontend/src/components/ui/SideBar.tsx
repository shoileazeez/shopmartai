"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Visual Search", href: "/visual-search" },
  { label: "My Orders", href: "/orders" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-xl shadow"
      >
        ☰
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-full w-64 bg-white border-r
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="h-16 flex items-center px-6 text-xl font-bold text-purple-600">
          ShopSmart AI
        </div>

        <nav className="px-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex px-4 py-3 rounded-xl text-sm font-medium
                ${
                  active
                    ? "bg-purple-50 text-purple-700"
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* PRO PLAN */}
        <div className="p-4 mt-auto">
          <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-4">
            <h4 className="font-semibold">✨ Pro Plan</h4>
            <p className="text-sm opacity-90">
              Unlimited AI searches & visual matching.
            </p>
            <button className="mt-3 w-full bg-white text-purple-700 py-2 rounded-xl text-sm font-medium">
              Upgrade Now
            </button>
          </div>

          <button className="mt-4 text-sm text-neutral-500">
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
