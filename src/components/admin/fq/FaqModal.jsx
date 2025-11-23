"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

const FaqModal = ({ isOpen, onClose, onSubmit, Id }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: {
      Title: "",
      Details: "",
      Position: null,
      IsActive: true,
    },
  });

  const isEditMode = Boolean(Id);
  const getSingleFaq = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}faq/getfaqsbyid/${Id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      const result = await response.json();

      if (response.ok && result.data) {
        const testData = result.data;
        setValue("Title", testData.title || "");
        setValue("Details", testData.details || "");
        setValue("IsActive", testData.isActive);
        setValue("Position", testData.position);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (Id) {
      getSingleFaq();
    } else {
      reset();
    }
  }, [Id, reset]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 ">
      <div
        className=" w-full max-w-md rounded-xl shadow-lg p-6 relative my-5  bg-white 
       overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h6 className="text-lg font-semibold mx-auto">
            {isEditMode ? "Edit Faq" : "Add Faq"}
          </h6>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(async (data) => {
            await onSubmit(data);
            reset();
          })}
          className="space-y-4"
        >
          {/* Name */}
          <input
            type="text"
            placeholder="Title"
            {...register("Title")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />

          {/* Content */}
          <textarea
            rows={3}
            placeholder="Details"
            {...register("Details")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />

          <input
            type="number"
            placeholder="Position"
            {...register("Position")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />

          {/* Status */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Status</label>
            <input
              type="checkbox"
              {...register("IsActive")}
              className="toggle toggle-success"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4 text-sm">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-(--primary-blue) text-white rounded-md"
            >
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FaqModal;
