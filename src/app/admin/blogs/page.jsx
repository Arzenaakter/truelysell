"use client";

import { useState } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import AllBlogs from "@/components/shared/AllBlogs";

const tabs = [
  { name: "All", component: <AllBlogs blogStatus="All" blgFrom="Admin" /> },
  {
    name: "Active",
    component: <AllBlogs blogStatus="Active" blgFrom="Admin" />,
  },
  {
    name: "Inactive",
    component: <AllBlogs blogStatus="Inactive" blgFrom="Admin" />,
  },
];

const AllBlogsPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const activeTabObj = tabs.find((tab) => tab.name === activeTab);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h4>All Blog</h4>
        <Link
          href={"/admin/blogs/add-blog"}
          className="bg-(--primary-blue) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Blog
        </Link>
      </div>
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
            <AllBlogs key={activeTabObj.name} blogStatus={activeTabObj.name} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBlogsPage;
