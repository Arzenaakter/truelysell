"use client";
import React from "react";
import { useForm } from "react-hook-form";

const CommentForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid lg:grid-cols-2 gap-5 items-center ">
          <div>
            <label className="block mb-1 font-medium text-gray-600">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-600">
            Message
          </label>
          <textarea
            rows={3}
            placeholder="Enter you comment here ..."
            {...register("content")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />
        </div>

        {/* Buttons */}
        <div className=" mt-4 text-sm">
          <button
            type="submit"
            className="px-4 py-2 bg-(--dark) text-white rounded-md"
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
