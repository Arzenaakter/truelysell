"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const testimonials = [
  {
    id: 1,
    name: "Sophia Martinez",
    designation: "Nurse",
    profilePic:
      "https://images.pexels.com/photos/8460095/pexels-photo-8460095.jpeg",
    comments:
      "Amazing service! The team was professional and very supportive throughout the entire process.",
  },
  {
    id: 2,
    name: "Daniel Roberts",
    designation: "Web Developer",
    profilePic: "https://images.unsplash.com/photo-1603415526960-f7e0328e3caa",
    comments:
      "Highly recommend! Everything was smooth, fast, and extremely well organized.",
  },
  {
    id: 3,
    name: "Emily Johnson",
    designation: "Teacher",
    profilePic: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    comments:
      "Great experience! The staff was friendly and guided me step-by-step. Truly helpful.",
  },
  {
    id: 4,
    name: "Michael Brown",
    designation: "Mechanical Engineer",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    comments:
      "Very professional and trustworthy. I found exactly what I was looking for. Thank you!",
  },
  {
    id: 5,
    name: "Aisha Rahman",
    designation: "Graphic Designer",
    profilePic: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    comments:
      "Exceptional service! The team went beyond expectations to help me achieve my goals.",
  },
  {
    id: 6,
    name: "Lucas Green",
    designation: "Business Analyst",
    profilePic:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    comments:
      "Very satisfied with the process. Easy, convenient, and incredibly professional.",
  },
];

const Testimonials = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth",
      });
    }
  };
  return (
    <section className=" mt-10 lg:my-20 bg-gray-50 py-10 lg:py-16">
      <div className="container mx-auto px-6 lg:px-10 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Testimonials
        </h2>
        <p className="mt-2 text-gray-600">
          Our clients rave about our seamless service, exceptional quality, and
          unmatched customer support.
        </p>

        {/* slider */}
        <div className="relative max-w-6xl mx-auto mt-10 overflow-visible ">
          {/* Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-white text-gray-800 rounded-full shadow-lg hover:bg-gray-100"
          >
            <GoArrowLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-white text-gray-800 rounded-full shadow-lg hover:bg-gray-100"
          >
            <GoArrowRight size={20} />
          </button>

          {/* Cards Slider */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto no-scrollbar space-x-6 scroll-smooth"
          >
            {testimonials.map((item) => (
              <div key={item.id} className="pt-12">
                {/* Wrapper with overflow-visible — image can float */}
                <div className="relative bg-white border border-gray-200 rounded-lg min-w-[375px] overflow-visible">
                  {/* Floating Image */}
                  <div className="absolute inset-x-0 -top-12 flex justify-center">
                    <Image
                      src={item.profilePic}
                      alt=""
                      width={120}
                      height={120}
                      className="w-28 h-28 rounded-full object-cover shadow-md"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 text-center mt-16 space-y-2">
                    <p className="text-sm text-gray-500">{item.comments}</p>
                    <p className="font-semibold text-gray-700">{item.name}</p>
                    <p className="text-gray-500 font-semibold">
                      {item.designation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div
            ref={sliderRef}
            className="flex overflow-x-auto no-scrollbar scroll-smooth space-x-4 "
          >
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="relative min-w-[375px] bg-white border border-gray-200 rounded-md overflow-visible pb-6"
              >
                <div className="flex justify-center -mt-14 z-20 relative">
                  <Image
                    src={item.profilePic}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="w-28 h-28 rounded-full object-cover shadow-md"
                  />
                </div>

                <div className="p-6 text-center space-y-2 mt-2">
                  <p className="text-sm text-gray-500">{item.comments}</p>
                  <p className="font-semibold text-gray-700">{item.name}</p>
                  <p className="text-gray-500 font-semibold">
                    {item.designation}
                  </p>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
