"use client";

import { useState } from "react";
import AllServicesTable from "./AllServicesTable";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const tabs = [
  { name: "All Services", component: <AllServicesTable serviceStatus="all" /> },
  { name: "Active", component: <AllServicesTable serviceStatus="Active" /> },
  {
    name: "Inactive",
    component: <AllServicesTable serviceStatus="Inactive" />,
  },
  {
    name: "Pending",
    component: <AllServicesTable serviceStatus="Pending" />,
  },
  {
    name: "Deleted",
    component: <AllServicesTable serviceStatus="Deleted" />,
  },
];

export default function AllServiceComponent() {
  const [activeTab, setActiveTab] = useState("All Services");

  const activeTabObj = tabs.find((tab) => tab.name === activeTab);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h4>All Services</h4>
        <Link
          href={"/admin/services/add-service"}
          className="bg-(--primary-blue) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Create Service
        </Link>
      </div>
      {/* Tab Navigation */}
      <nav className="flex space-x-6 border-b  border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.name
                ? "text-(--primary-blue)"
                : "text-gray-600 hover:text-(--primary-blue)"
            }`}
          >
            {tab.name}
            {activeTab === tab.name && (
              <span className="absolute left-0 -bottom-px w-full h-0.5 bg-(--primary-blue) rounded"></span>
            )}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="mt-4">
        <div className="mt-4">
          {activeTabObj && (
            <AllServicesTable
              key={activeTabObj.name}
              serviceStatus={
                activeTabObj.name === "All Services" ? "all" : activeTabObj.name
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
