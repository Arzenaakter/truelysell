"use client";
import HeadingWithAddButton from "@/components/shared/HeadingWithAddButton";
import { useState } from "react";
import MyServices from "@/components/provider/myServicesComponents/MyServices";

import { services } from "@/data/json/provider-my-services";

const activeServices = services.filter(
  (service) => service.status === "Active"
);
const inActiveServices = services.filter(
  (service) => service.status === "Inactive"
);
const pendingService = services.filter(
  (service) => service.status === "Pending"
);
const draftService = services.filter((service) => service.status === "Draft");

const tabs = [
  { name: "Active Services", component: <MyServices data={activeServices} /> },
  {
    name: "Inactive Services",
    component: <MyServices data={inActiveServices} />,
  },
  {
    name: "Pending Services",
    component: <MyServices data={pendingService} />,
  },
  {
    name: "Draft Services",
    component: <MyServices data={draftService} />,
  },
];

const MyServicesPage = () => {
  const [activeTab, setActiveTab] = useState("Active Services");

  const ActiveComponent =
    tabs.find((tab) => tab.name === activeTab)?.component || (() => null);
  return (
    <div>
      <HeadingWithAddButton
        heading="My Services"
        pageLink="/provider/my-services/add-service"
        btnName="Service"
      />

      <div className="w-full">
        {/* Tab Navigation */}
        <nav className="flex space-x-6 my-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.name
                  ? "text-white  bg-[var(--dark)] px-4 py-2 rounded"
                  : "bg-gray-200 hover:text-white text-gray-700 hover:bg-[var(--dark)] px-4 py-2 rounded "
              }`}
            >
              {tab.name}
              {/* {activeTab === tab.name && (
                <span className="absolute left-0 -bottom-[1px] w-full h-0.5 bg-[var(--primary-blue)] rounded"></span>
              )} */}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div className="mt-4">{ActiveComponent}</div>
      </div>
    </div>
  );
};

export default MyServicesPage;
