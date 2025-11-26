import React from "react";
import contatImg from "@/assets/img/bg/bg-contact.jpg";
import Image from "next/image";
const ContactFrom = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-10 flex flex-col lg:flex-row gap-10 items-center">
        {/* Left Image */}
        <div className="w-full">
          <Image
            src={contatImg}
            alt="Cleaning Service"
            className="rounded-lg object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Get In Touch
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none placeholder-gray-400 plaxeholder:text-xs"
            />

            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none placeholder-gray-400 plaxeholder:text-xs"
            />

            <input
              type="text"
              placeholder="Your Phone Number"
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none placeholder-gray-400 plaxeholder:text-xs"
            />

            <select className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none placeholder-gray-400 plaxeholder:text-xs">
              <option className="text-gray-500">Select Services</option>
              <option>Home Cleaning</option>
              <option>Office Cleaning</option>
              <option>Plumbing</option>
              <option>Electrical</option>
            </select>

            <textarea
              placeholder="Type Message"
              rows={2}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none placeholder-gray-400 plaxeholder:text-xs"
            ></textarea>

            <button
              type="submit"
              className="px-6 py-2 bg-(--dark) text-white font-medium rounded-md shadow hover:bg-gray-800 transition inline-flex items-center gap-2"
            >
              Send Message <span className="text-xs">↗</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactFrom;
