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
            <a href="/">Overview</a>
          </li>

          {/* Livestock Management */}
          <li className="menu-title">
            <span>Livestock</span>
          </li>
          <li>
            <a href="/map">Livestock Map</a>
          </li>
          <li>
            <a href="/livestock">Health Monitoring</a>
          </li>
          <li>
            <a href="/manage">Manage Livestock</a>
          </li>
          <li>
            <a href="/headers">Manage Headers</a>
          </li>

          {/* Alerts & History */}
          <li className="menu-title">
            <span>Alerts</span>
          </li>
          <li>
            <a href="/alerts">Alerts History</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainLayout;
