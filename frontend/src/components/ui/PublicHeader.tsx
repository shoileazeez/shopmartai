"use client";

import { useState } from "react";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
}

const sections: NavItem[] = [
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

export default function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container-app">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-purple-600">
            ShopSmart AI
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 mx-6">
            <input
              className="input"
              placeholder="Describe a product or upload an image..."
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {sections.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-neutral-700 hover:text-purple-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {open && (
          <div className="md:hidden py-4 space-y-2">
            <input className="input" placeholder="Search..." />
            {sections.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-2 py-2 rounded hover:bg-neutral-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
