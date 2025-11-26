"use client";

import React, { useState } from "react";
// 1. Import icons from 'react-icons' (Ant Design set)
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

// 2. Data for the FAQ items (no change)
const faqData = [
  {
    question: "What is an on-demand service marketplace?",
    answer:
      "An on-demand service marketplace connects customers with service providers for a wide range of needs, all through a single online platform. Customers can browse, book, and pay for services while service providers can list their services, manage bookings, and receive payments.",
  },
  {
    question: "How can I book a service?",
    answer:
      "Booking is easy! Just browse the service categories, select a provider, choose a date and time, and confirm your booking. You can pay securely through the platform.",
  },
  // ... other faq items ...
  {
    question: "How do I know if a service provider is reliable?",
    answer:
      "We vet all our service providers. You can also check reviews, ratings, and past work portfolios from other customers to make an informed decision.",
  },
  {
    question: "How do I change my account settings?",
    answer:
      "Log in to your account and navigate to the 'Account Settings' or 'Profile' section. From there, you can update your personal information, password, and payment methods.",
  },
  {
    question: "What should I do if I forget my password?",
    answer:
      "On the login page, click the 'Forgot Password?' link. Enter your email address, and we'll send you instructions to reset your password.",
  },
  {
    question: "How do I manage my bookings?",
    answer:
      "You can view, reschedule, or cancel your upcoming bookings from the 'My Bookings' dashboard in your account.",
  },
  {
    question: "What should I do if I have a question for the service provider?",
    answer:
      "You can use our secure messaging system to contact the service provider directly after a booking is confirmed. For pre-booking questions, some providers may have a public Q&A section.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white container mx-auto p-6 lg:p-10 text-gray-500 text-sm">
      <div className="lg:px-20">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-200  last:border-b-0"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="flex justify-between items-center w-full py-5 px-2 md:px-4 text-left focus:outline-none"
            >
              <span
                className={`text-base md:text-lg font-semibold ${
                  openIndex === index ? "text-pink-600" : "text-gray-900"
                }`}
              >
                {item.question}
              </span>
              <span>
                {/* 3. Use the react-icons components */}
                {openIndex === index ? (
                  <AiOutlineMinusCircle className="w-6 h-6 text-pink-600" />
                ) : (
                  <AiOutlinePlusCircle className="w-6 h-6 text-gray-400" />
                )}
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="pb-5 px-2 md:px-4 text-gray-700">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="lg:my-20 my-10">
        <h5 className="text-pink-500 mb-4 text-center">
          Still have a questions?
        </h5>
        <p className="text-center">
          If you cannot find answer to your question in our FAQ, you can always{" "}
          <br />
          contact us. We wil answer to you shortly!
        </p>
      </div>
    </div>
  );
};

export default Faq;
