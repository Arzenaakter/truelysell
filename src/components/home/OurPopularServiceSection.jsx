"use client";
import React, { useState } from "react";
import TitleWithSubTitle from "../shared/TitleWithSubTitle";
import ViewAllButton from "../shared/ViewAllButton";
import ComputerServiceTab from "./ComputerServiceTab";

const tabs = [
  { name: "Computer Service", component: <ComputerServiceTab /> },
  { name: "Removals", component: <ComputerServiceTab /> },
  { name: "Man & Van", component: <ComputerServiceTab /> },
  { name: "Furniture Assembly", component: <ComputerServiceTab /> },
  { name: "Electrical", component: <ComputerServiceTab /> },
  { name: "Electrical", component: <ComputerServiceTab /> },
  { name: "Plumbing", component: <ComputerServiceTab /> },
  { name: "More Service", component: <ComputerServiceTab /> },
];

const OurPopularServiceSection = () => {
  const [activeTab, setActiveTab] = useState("Computer Service");
  return (
    <div className="py-16  text-center">
      <TitleWithSubTitle
        heading="Our Popular "
        headingClr=" Services"
        subTitle="Each listing is designed to be clear and concise, providing customers"
      />
      <div className="w-full  ">
        {/* Tabs Header */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab.name)}
              className={`px-4 py-1.5 rounded font-medium transition-all
              ${
                activeTab === tab.name
                  ? "bg-linear-to-r from-(--primary) to-(--primary-blue) text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="w-full">
          {tabs.find((t) => t.name === activeTab)?.component}
        </div>
      </div>

      <ViewAllButton pageLink="/" />
    </div>
  );
};

export default OurPopularServiceSection;
