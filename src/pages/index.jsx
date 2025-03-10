import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      <div className="md:p-6 space-y-6">
        {/* Overview Info */}
        <div className="bg-base-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">
            Livestock Management Overview
          </h2>
          <p className="text-sm">
            The GPS & Health Monitoring System leverages AI-powered anomaly
            detection to monitor livestock health and movement patterns. By
            analyzing GPS data and vital signs, the system can detect signs of
            illness, injury, or distress—alerting farmers to potential threats
            or diseases before they escalate. The AI also identifies early
            disease patterns, enabling preventive measures to reduce losses and
            improve overall herd health. With real-time insights and automated
            alerts, farmers can make data-driven decisions, ensuring better
            livestock management and security.
          </p>
        </div>

        {/* Livestock Stats Section (Now using a Card) */}
        <div className="card bg-base-100 shadow-lg border border-base-300 p-6">
          <h2 className="text-lg font-bold mb-4">Livestock Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-base-200 p-4 rounded-lg">
              <h3 className="text-sm text-gray-500">Total Livestock</h3>
              <p className="text-2xl font-bold">1,234</p>
              <Link
                href="/manage-livestock"
                className="btn btn-xs btn-soft btn-accent mt-2"
              >
                Add Livestock
              </Link>
            </div>

            <div className="bg-base-200 p-4 rounded-lg">
              <h3 className="text-sm text-gray-500">Healthy Livestock</h3>
              <p className="text-2xl font-bold">1,200</p>
              <Link
                href="/health-monitoring"
                className="btn btn-xs btn-soft btn-error mt-2"
              >
                View Health Status
              </Link>
            </div>

            <div className="bg-base-200 p-4 rounded-lg">
              <h3 className="text-sm text-gray-500">Alerts Triggered</h3>
              <p className="text-2xl font-bold text-error">45</p>
              <p className="text-xs text-gray-500">Past 7 Days</p>
            </div>
          </div>
        </div>

        {/* Livestock Headers & Management Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Headers Managed</h2>
              <p>8 Active Headers</p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-soft">Manage Headers</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Livestock Growth Rate</h2>
              <p>+5.2% This Month</p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-soft">View Reports</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Recent Alerts</h2>
              <p>3 Critical Alerts</p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-warning btn-soft">
                  View Alerts
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="btn btn-accent btn-soft btn-block">
            View Livestock Map
          </button>
          <button className="btn btn-accent btn-soft btn-block">
            Manage Livestock
          </button>
          <button className="btn btn-accent btn-soft btn-block">
            Check Health Insights
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
