"use client";

import { FaStar, FaMapMarkerAlt, FaRegHeart } from "react-icons/fa";
import { services } from "@/data/json/provider-my-services";
import { useState } from "react";
const RootServiceComponent = () => {
  const [allData, setAllData] = useState(services);
  return (
    <div>
      <div className="grid lg:grid-cols-12 items-center gap-10 my-10 px-6">
        {/* left side */}
        <div className="lg:col-span-4">
          <div></div>
        </div>
        {/*  right side*/}
        <div className="lg:col-span-8">
          <p className="text-gray-800 text-2xl font-semibold">
            Found{" "}
            <span className="text-(--primary)">{allData.length} Services</span>
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 ">
            {allData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden lg:h-80"
              >
                {/* Image Section */}
                <div className="relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-48 object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
                  />
                  <span className="absolute top-2 left-2 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <div className="absolute top-2 right-2 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded flex items-center gap-1">
                    <FaRegHeart className=" text-sm" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <p className="font-semibold text-gray-800">{item.title}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <FaMapMarkerAlt className="mr-1" />
                      {item.location}
                    </div>
                    <div className=" text-gray-800 text-sm flex items-center gap-1">
                      <FaStar className="text-yellow-400 text-sm" />
                      {item.rating}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="  flex items-center justify-between mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-800">
                        {item.price}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        {item.oldPrice}
                      </span>
                    </div>
                    <button className="bg-(--primary)/10  text-(--primary) font-medium py-1 px-3 rounded">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootServiceComponent;
