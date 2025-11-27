import React from "react";
import Image from "next/image";
import BGAbout from "@/assets/img/about-bg.png";
import { FaCheckCircle } from "react-icons/fa";
const AboutBestSolution = () => {
  return (
    <div className="py-10 lg:py-20 ">
      <div className="container mx-auto px-6 lg:px-10 ">
        <div className="grid md:grid-cols-2 ">
          {/* Left Side: Image */}
          <div className="relative">
            <Image
              src={BGAbout}
              alt="Service image"
              width={500}
              height={600}
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
            <div className="absolute top-4 left-4 text-white text-lg bg-blue-800 px-4 py-2 rounded-lg">
              12+ years of experiences
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="flex flex-col justify-center">
            <p className=" font-semibold text-gray-900 ">ABOUT OUR COMPANY</p>
            <h2 className=" mb-4">Best Solution For Cleaning Services</h2>
            <p className=" text-gray-700 mb-4 text-sm">
              Welcome to Truelysell, your premier destination for connecting
              with top-rated service providers and finding the perfect match for
              your needs. Our platform is designed to simplify the process of
              discovering, evaluating, and hiring trusted professionals across a
              wide range of services, from home improvement and IT support to
              personal care and more.
            </p>
            <p className=" text-gray-700 mb-4 text-sm">
              At Truelysell, our mission is to bridge the gap between service
              providers and customers by offering a seamless and efficient
              marketplace experience. We aim to empower both parties by
              providing a reliable platform where quality, transparency, and
              customer satisfaction are our top priorities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 text-gray-700 text-sm">
              <p className="flex items-center gap-1 mb-1">
                <FaCheckCircle />
                We prioritize quality and reliability
              </p>
              <p className="flex items-center gap-1 mb-1">
                <FaCheckCircle />
                Clear, detailed service listings & reviews
              </p>
              <p className="flex items-center gap-1 ">
                <FaCheckCircle />
                Saves your time and effort
              </p>
              <p className="flex items-center gap-1">
                <FaCheckCircle />
                Smooth and satisfactory experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBestSolution;
