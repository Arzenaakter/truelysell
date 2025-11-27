"use client";
import React from "react";

const arr = [
  {
    id: 1,
    name: "John Smith",
    job: "Electrician",
    price: 20,
    rating: 4.5,
    reviews: 320,
    img: "https://images.pexels.com/photos/5853541/pexels-photo-5853541.jpeg",
  },
  {
    id: 2,
    name: "Michael",
    job: "Carpenter",
    price: 50,
    rating: 4.7,
    reviews: 228,
    img: "https://images.pexels.com/photos/5974414/pexels-photo-5974414.jpeg",
  },
  {
    id: 3,
    name: "Antoinette",
    job: "Cleaner",
    price: 25,
    rating: 4.6,
    reviews: 130,
    img: "https://images.pexels.com/photos/4239147/pexels-photo-4239147.jpeg",
  },
  {
    id: 4,
    name: "Thompson",
    job: "Mechanic",
    price: 30,
    rating: 4.4,
    reviews: 95,
    img: "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg",
  },
];

const TopProvider = () => {
  return (
    <div className="container mx-auto px-6 lg:px-10">
      <p className="text-gray-600 mb-1">Meet Our Experts</p>
      <h1 className="text-3xl font-bold mb-6">Top Provider</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {arr.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
          >
            {/* Image */}
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-56 object-cover rounded-lg"
            />

            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <div className="flex items-center mt-3 gap-2">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <span className="text-green-500 text-sm">✔</span>
                </div>

                <p className="text-gray-500 text-sm">{item.job}</p>
              </div>
              <p className="text-gray-800 font-semibold mt-1">
                ${item.price}.00
                <span className="text-gray-500 text-sm"> /hr</span>
              </p>
            </div>

            <div className="flex items-center gap-1 mt-2 text-yellow-500 text-sm">
              {"★".repeat(Math.floor(item.rating))}
              {"☆".repeat(5 - Math.floor(item.rating))}
              <span className="text-gray-500 ml-1 text-xs">
                ({item.reviews})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProvider;
