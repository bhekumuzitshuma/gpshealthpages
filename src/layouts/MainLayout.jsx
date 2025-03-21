import Link from "next/link";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Top Bar for Mobile */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-base-200">
          {/* Hamburger Menu */}
          <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold">GPS & Health Monitor</h1>
            <p className="text-sm text-gray-500">
              AI powered precision farming
            </p>
          </div>
          {/* Placeholder for alignment */}
          <div className="w-6"></div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4">{children}</div>
      </div>

      {/* Drawer Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Logo and Tagline */}
          <div className="mb-6 p-4">
            <h1 className="text-xl font-bold">GPS & Health Monitor</h1>
            <p className="text-sm text-gray-500">
              AI-powered precision farming
            </p>
          </div>

          {/* Dashboard Overview */}
          <li>
            <Link href="/" legacyBehavior>
              <a>Overview</a>
            </Link>
          </li>

          {/* Livestock Management */}
          <li className="menu-title">
            <span>Livestock</span>
          </li>
          <li>
            <Link href="/map" legacyBehavior>
              <a>Livestock Map</a>
            </Link>
          </li>
          <li>
            <Link href="/health-monitoring" legacyBehavior>
              <a>Health Monitoring</a>
            </Link>
          </li>
          <li>
            <a href="/manage-livestock">Manage Livestock</a>
          </li>
          <li>
            <a href="/manage-headers">Manage Headers</a>
          </li>

          {/* Alerts & History */}
          <li className="menu-title">
            <span>Alerts</span>
          </li>
          <li>
            <Link href="/weather-hazard-alerts" legacyBehavior>
              <a>Weather Hazard Alerts</a>
            </Link>
            <Link href="/alerts" legacyBehavior>
              <a>Alerts History</a>
            </Link>
          </li>

          {/* Alerts & History */}
          <li className="menu-title">
            <span>Geofencing</span>
          </li>
          <li>
            <Link href="/geofencing" legacyBehavior>
              <a>Set Geofences</a>
            </Link>
            <Link href="/movement-patterns" legacyBehavior>
              <a>Movement Patterns</a>
            </Link>
          </li>

          {/* Alerts & History */}
          <li className="menu-title">
            <span>Users</span>
          </li>
          <li>
            <Link href="/staff" legacyBehavior>
              <a>Manage Staff</a>
            </Link>
          </li>

          {/* Footer Credits */}
          <div className="mt-auto p-4 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Bhekumuzi Tshuma</p>
            <a
              href="https://www.linkedin.com/in/bhekumuzitshuma/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:underline"
            >
              Connect on LinkedIn
            </a>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default MainLayout;
