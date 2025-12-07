"use client";

import { useAppContext } from "@/context/AppContext";
import { useAdminCoupons } from "@/hooks/admin/useAdminCoupons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

const AddCouponModal = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: "",
      CouponCode: "",
      DiscountValue: 0,
      UsageLimit: 0,
      usedCount: 0,
      ValidUntil: "",
      ServiceId: null,
      IsActive: true,
      CouponType: "",
      ProviderId: null,
      CategoryId: null,
    },
  });
  const { selectedId, onClose } = useAppContext();
  const { singleCoupon, providers, categories, services } = useAdminCoupons();
  const isEditMode = Boolean(selectedId);

  useEffect(() => {
    if (singleCoupon && selectedId) {
      reset({
        Name: singleCoupon.name,
        CouponCode: singleCoupon.couponCode,
        DiscountValue: singleCoupon.discountValue,
        UsageLimit: singleCoupon.usageLimit,
        UsedCount: singleCoupon.usedCount,
        ValidUntil: singleCoupon.validUntil,
        ServiceId: singleCoupon.serviceId,
        IsActive: singleCoupon.isActive,
        CouponType: singleCoupon.couponType,
        ProviderId: singleCoupon.providerId,
        CategoryId: singleCoupon.categoryId,
      });
    } else {
      reset({
        Name: "",
        CouponCode: "",
        DiscountValue: 0,
        UsageLimit: 0,
        usedCount: 0,
        ValidUntil: "",
        ServiceId: null,
        IsActive: true,
        CouponType: "",
        ProviderId: null,
        CategoryId: null,
      });
    }
  }, [singleCoupon, selectedId]);

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <label
              htmlFor="CouponCode"
              className="block text-sm  text-gray-800"
            >
              Coupon
            </label>
            <input
              id="CouponCode"
              {...register("CouponCode", { required: !isEditMode && true })}
              placeholder="Coupon Code"
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.CouponCode ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="CouponType"
              className="block text-sm  text-gray-800"
            >
              Type
            </label>
            <select
              id="CouponType"
              {...register("CouponType", {
                required: !isEditMode && true,
              })}
              className={`mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none `}
            >
              <option value="">Select type</option>
              <option value="Fixed">Fixed</option>
              <option value="Percentage">Percentage</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="DiscountValue"
              className="block text-sm  text-gray-800"
            >
              Discount
            </label>
            <input
              id="DiscountValue"
              {...register("DiscountValue", { required: !isEditMode && true })}
              placeholder="DiscountValue"
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.DiscountValue ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="UsageLimit"
              className="block text-sm  text-gray-800"
            >
              Limit
            </label>
            <input
              id="UsageLimit"
              type="number"
              {...register("UsageLimit", { required: !isEditMode && true })}
              placeholder="UsageLimit"
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.UsageLimit ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="usedCount" className="block text-sm  text-gray-800">
              Used
            </label>
            <input
              id="usedCount"
              type="number"
              {...register("usedCount", { required: !isEditMode && true })}
              placeholder="used "
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.usedCount ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="ValidUntil"
              className="block text-sm  text-gray-800"
            >
              Valid Date
            </label>
            <input
              id="ValidUntil"
              type="date"
              {...register("ValidUntil", { required: !isEditMode && true })}
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.ValidUntil ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
          </div>
          {/* Provider */}
          <div className="mb-6">
            <label
              htmlFor="ProviderId"
              className="block text-sm  text-gray-800"
            >
              Provider
            </label>
            <select
              id="ProviderId"
              {...register("ProviderId", {
                required: !isEditMode && "Provider is required",
              })}
              className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
            >
              <option value="" className="">
                Select provider
              </option>
              {providers?.map((item) => (
                <option key={item.id} value={item.id} className="">
                  {item.name}
                </option>
              ))}
            </select>

            {errors.ProviderId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.ProviderId.message}
              </p>
            )}
          </div>
          {/* Category */}
          <div className="mb-6">
            <label
              htmlFor="CategoryId"
              className="block text-sm  text-gray-800"
            >
              Category
            </label>
            <select
              id="CategoryId"
              {...register("CategoryId", {
                required: !isEditMode && "CategoryId is required",
              })}
              className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
            >
              <option value="" className="">
                Select Category
              </option>
              {categories?.map((item) => (
                <option key={item.id} value={item.id} className="">
                  {item.name}
                </option>
              ))}
            </select>

            {errors.CategoryId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.CategoryId.message}
              </p>
            )}
          </div>
          {/* service */}
          <div className="mb-6">
            <label htmlFor="ServiceId" className="block text-sm  text-gray-800">
              Services Name
            </label>
            <select
              id="ServiceId"
              {...register("ServiceId", {
                required: !isEditMode && "ServiceId is required",
              })}
              className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
            >
              <option value="" className="">
                Select Services Name
              </option>
              {services?.map((item) => (
                <option key={item.id} value={item.id} className="">
                  {item.name}
                </option>
              ))}
            </select>

            {errors.ServiceId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.ServiceId.message}
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
