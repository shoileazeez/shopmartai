import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
}

interface PublicHeaderConfig {
  title: string;
  sections: {
    about: NavItem[];
    newArrivals: NavItem[];
    products: NavItem[];
    cta: NavItem[];
  };
}

const publicHeaderConfig: PublicHeaderConfig = {
  title: "ShopSmart AI",
  sections: {
    about: [{ label: "About", href: "/about" }],
    newArrivals: [{ label: "New Arrivals", href: "/new-arrivals" }],
    products: [{ label: "Products", href: "/products" }],
    cta: [
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
    ],
  },
};

export default function PublicHeader() {
  const { title, sections } = publicHeaderConfig;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Left: Title */}
          <div className="text-2xl font-bold">{title}</div>

          {/* Center: Desktop Search */}
          <div className="hidden md:flex flex-1 px-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Right: Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {Object.values(sections).map((group, index) =>
              group.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {item.label}
                </a>
              ))
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {/* Mobile Search */}
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />

            {/* Mobile Nav Links */}
            {Object.values(sections).map((group, index) =>
              group.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-blue-600 hover:text-blue-800 px-2 py-1"
                >
                  {item.label}
                </a>
              ))
            )}
          </div>
        )}
      </div>
    </header>
  );
}
