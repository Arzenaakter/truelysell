"use client";

import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

const AddCouponModal = ({ isOpen, onClose, onSubmit, Id }) => {
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
  const [providers, setProviders] = useState([]);
  const [allCategoryData, setAllCategoryData] = useState([]);
  const { loading, setLoading } = useAppContext();

  const getSingleCoupon = async () => {
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
  const getProviders = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getproviders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setProviders(result.data);
      } else {
        const errorData = await response.json();
      }
    } catch (error) {}
  };
  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getcategories`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("category data", result);
        setAllCategoryData(result?.data);
        setLoading(false);
      } else {
        const errorData = await response.json();
        setLoading(false);
        setAllCategoryData([]);
      }
    } catch (error) {
      setAllCategoryData([]);
      setLoading(false);
    }
  };
  const getServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getservices`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setAllCategoryData(result?.data);
        setLoading(false);
      } else {
        const errorData = await response.json();
        setLoading(false);
        setAllCategoryData([]);
      }
    } catch (error) {
      setAllCategoryData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProviders();
    getCategories();
    // getServices();

    if (Id) {
      getSingleCoupon();
    } else {
      reset();
    }
  }, [isEditMode, Id, reset]);

  const languageOptions = [
    { label: "Car wash", value: "Bangla" },
    { label: "Computer Repair", value: "English" },
  ];

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center  bg-black/50 ">
      <div
        className=" w-full max-w-md rounded-xl shadow-lg p-6 relative my-5  bg-white 
       overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h6 className="text-lg font-semibold mx-auto">
            {isEditMode ? "Edit Coupon" : "Add Coupon"}
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
          <div className="mb-6">
            <label htmlFor="Name" className="block text-sm  text-gray-800">
              Name
            </label>
            <input
              id="Name"
              {...register("Name", { required: !isEditMode && true })}
              placeholder="Name"
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.Name ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="Name" className="block text-sm  text-gray-800">
              Coupon
            </label>
            <input
              id="Coupon"
              {...register("Coupon", { required: !isEditMode && true })}
              placeholder="Coupon"
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.Coupon ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="Type" className="block text-sm  text-gray-800">
              Type
            </label>
            <select
              id="Type"
              {...register("Type", {
                required: !isEditMode && true,
              })}
              className={`mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none `}
            >
              <option value="">Select type</option>
              <option value="">Fixed</option>
              <option value="">Percentage</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="Discount" className="block text-sm  text-gray-800">
              Discount
            </label>
            <input
              id="Discount"
              {...register("Discount", { required: !isEditMode && true })}
              placeholder="Discount"
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.Discount ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="Limit" className="block text-sm  text-gray-800">
              Limit
            </label>
            <input
              id="Limit"
              type="number"
              {...register("Limit", { required: !isEditMode && true })}
              placeholder="Limit"
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.Limit ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="Used" className="block text-sm  text-gray-800">
              Used
            </label>
            <input
              id="Used"
              type="Used"
              {...register("Used", { required: !isEditMode && true })}
              placeholder="Used"
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.Used ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="ValidDate" className="block text-sm  text-gray-800">
              Valid Date
            </label>
            <input
              id="ValidDate"
              type="date"
              {...register("ValidDate", { required: !isEditMode && true })}
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.ValidDate ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
          </div>
          {/* Provider */}
          <div className="mb-6">
            <label
              htmlFor="ServicesName"
              className="block text-sm  text-gray-800"
            >
              Provider
            </label>
            <Select
              id="provider"
              options={providers.map((prov) => ({
                label: prov.name,
                value: prov.id,
              }))}
              onChange={(val) => setValue("provider", val)}
              placeholder="Select Provider "
              className="mt-1"
              classNames={{
                control: () =>
                  `mt-1 block w-full rounded-xl text-gray-600 text-sm border border-gray-300 py-0.5 focus:outline-none `,
              }}
            />
            {errors.provider && (
              <p className="text-red-500 text-xs mt-1">
                {errors.provider.message}
              </p>
            )}
          </div>
          {/* Category */}
          <div className="mb-6">
            <label htmlFor="Category" className="block text-sm  text-gray-800">
              Category
            </label>
            <Select
              id="Category"
              options={allCategoryData.map((cat) => ({
                label: cat.name,
                value: cat.id,
              }))}
              onChange={(val) => setValue("Category", val)}
              placeholder="Select Category"
              className="mt-1"
              classNames={{
                control: () =>
                  `mt-1 block w-full rounded-xl text-gray-600 text-sm border border-gray-300 py-0.5 focus:outline-none `,
              }}
            />
            {errors.Category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.Category.message}
              </p>
            )}
          </div>
          {/* service */}
          <div className="mb-6">
            <label
              htmlFor="ServicesName"
              className="block text-sm  text-gray-800"
            >
              Services Name
            </label>
            <Select
              id="ServicesName"
              options={languageOptions}
              onChange={(val) => setValue("ServicesName", val)}
              isMulti
              placeholder="Select Services Name"
              className="mt-1"
              classNames={{
                control: () =>
                  `mt-1 block w-full rounded-xl text-gray-600 text-sm border border-gray-300 py-0.5 focus:outline-none `,
              }}
            />
            {errors.ServicesName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.ServicesName.message}
              </p>
            )}
          </div>

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

export default AddCouponModal;
