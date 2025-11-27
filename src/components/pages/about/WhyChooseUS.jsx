"use client";

import Image from "next/image";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import aboutWhyChooseImg from "@/assets/img/bg/aboutChoose.jpg";
import grpStarIcon from "@/assets/img/icons/group-stars.svg";
import experienceIcon from "@/assets/img/icons/expereience.svg";
import expertIcon from "@/assets/img/icons/expert-team.svg";
import findIcon from "@/assets/img/icons/find-icon.svg";

const arr = [
  {
    id: 1,
    icon: grpStarIcon,
    title: "2583+",
    subtitle: "Satisfied Clients",
  },
  {
    id: 2,
    icon: expertIcon,
    title: "2583+",
    subtitle: "Expert Team",
  },
  {
    id: 3,
    icon: findIcon,
    title: "2583+",
    subtitle: "Project Completed",
  },
  {
    id: 3,
    icon: experienceIcon,
    title: "2583+",
    subtitle: "Years of experience",
  },
];
const accordionData = [
  {
    title: "24/7 Supports",
    content:
      "Access round-the-clock support through our dedicated helpdesk, available 24/7 to address any issues or queries you may have. Whether it’s day or night, our team is here to ensure you receive timely assistance and seamless service.",
  },
  {
    title: "Client’s reviews",
    content:
      "Access round-the-clock support through our dedicated helpdesk, available 24/7 to address any issues or queries you may have. Whether it’s day or night, our team is here to ensure you receive timely assistance and seamless service.",
  },
  {
    title: "Professional Team",
    content:
      "Access round-the-clock support through our dedicated helpdesk, available 24/7 to address any issues or queries you may have. Whether it’s day or night, our team is here to ensure you receive timely assistance and seamless service.",
  },
  {
    title: "Best Services",
    content:
      "Access round-the-clock support through our dedicated helpdesk, available 24/7 to address any issues or queries you may have. Whether it’s day or night, our team is here to ensure you receive timely assistance and seamless service.",
  },
];

const WhyChooseUs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-6 lg:p-10">
      {/* Header Section */}

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Accordion Section */}
        <div className="">
          <div>
            <h4 className=" text-gray-900 ">Why Choose Us</h4>

            <p className="mb-5 text-gray-600 text-sm ">
              Choose us for reliable, personalized service and exceptional
              results.
            </p>
          </div>
          <div className="space-y-6">
            {accordionData.map((item, index) => (
              <div key={index} className=" ">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-900 font-medium  bg-gray-100/90 rounded-md"
                >
                  {item.title}
                  <span className="text-xl">
                    {openIndex === index ? (
                      <IoIosArrowDown />
                    ) : (
                      <IoIosArrowUp />
                    )}
                  </span>
                </button>

                {openIndex === index && (
                  <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed mt-2">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Image Section */}
        <div>
          <Image
            src={aboutWhyChooseImg}
            alt="Why Choose Us"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 items-center justify-center gap-4 my-10 lg:my-14 lg:px-10">
        {arr.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 mt-6 border-r border-dashed border-(--primary) last:border-0"
          >
            <Image src={item.icon} alt={item.subtitle} width={50} height={40} />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 ">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
