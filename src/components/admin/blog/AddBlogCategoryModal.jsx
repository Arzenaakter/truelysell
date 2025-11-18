"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddBlogCategoryModal = ({ isOpen, onClose, onSubmit, Id }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: "",
      Slug: "",
      IsActive: true,
    },
  });

  const isEditMode = Boolean(Id);
  const nameValue = watch("Name");
  useEffect(() => {
    if (nameValue && !isEditMode) {
      const generatedSlug = nameValue
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      setValue("Slug", generatedSlug);
    }
  }, [nameValue, setValue, isEditMode]);
  const getBlogCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}blogcategory/getblogcategorybyid/${Id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      const result = await response.json();

      if (response.ok && result.data) {
        const data = result.data;
        setValue("Name", data.name || "");
        setValue("Slug", data.slug || "");
        setValue("IsActive", data.isActive);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (Id) {
      getBlogCategory();
    } else {
      reset();
    }
  }, [Id, reset]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 ">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5  overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h6 className="text-lg font-semibold mx-auto">
            {isEditMode ? "Edit" : "Add"} Blog Category
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
          {/* category */}
          <label htmlFor="slug" className="block text-sm  text-gray-800">
            Category
          </label>
          <input
            type="text"
            placeholder="Category"
            {...register("Name", { required: !isEditMode ?? true })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />
          {/* slug */}
          <label htmlFor="slug" className="block text-sm  text-gray-800">
            Slug
          </label>
          <input
            type="text"
            placeholder="Slug"
            {...register("Slug")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />
          <div className="flex items-center gap-2 ">
            <input
              type="checkbox"
              {...register("IsActive")}
              className="toggle toggle-success "
            />
            <label className="text-sm font-medium text-gray-600">
              Is Active
            </label>
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

export default AddBlogCategoryModal;
