import React from "react";
import Image from "next/image";
import serve from "@/assets/img/repair-img.png";
import { MdOutlineArrowCircleRight } from "react-icons/md";
const BestServices = () => {
  return (
    <main className="flex items-center justify-center  mb-10 ">
      <div className="max-w-6xl w-full flex items-center justify-between bg-[#0f172a] lg:h-[310px] rounded-xl shadow-lg p-10 relative">
        {/* Left Content */}
        <div className="text-white ">
          <p className="text-white font-bold lg:text-4xl lg:w-[80%]  ">
            Looking for the Best Service Finder & Bookings
          </p>
          <p className="mt-4 text-gray-300 text-xs lg:w-[80%]">
            We offer a comprehensive directory of top-rated service providers,
            detailed profiles, and customer reviews to help you make the best
            choice for your needs.
          </p>
          <button className="mt-6 flex items-center gap-1 bg-white px-4 py-2 rounded-md text-(--dark) text-xs">
            <span className=""> Get Started</span>
            <MdOutlineArrowCircleRight />
          </button>
        </div>

        {/* Right Image */}
        <div className="absolute right-0 bottom-0">
          <Image src={serve} className="w-[400px]" />
        </div>
      </div>
    </main>
  );
};

export default BestServices;
