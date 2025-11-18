"use client";

import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import toast from "react-hot-toast";
import Select from "react-select";
import LocationSelect from "../admin/service/LocationSelect";

const ProfileForm = ({ isEditMode, id }) => {
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
      JobTitle: "",
      Ratings: 0,
      Content: "",
      IsActive: true,
    },
  });

  const [preview, setPreview] = useState("");
  const [allUpazila, setAllUpazila] = useState([]);
  const [allDistrict, setAllDistrict] = useState([]);
  const [allDivision, setAllDivision] = useState([]);
  const fileInputRef = useRef(null);

  const getSingleUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}testimonial/getSingleUsersbyid/${id}`,
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

        setValue("Name", testData.name || "");
        setValue("Content", testData.content || "");
        setValue("IsActive", testData.isActive);
        setValue("JobTitle", testData.jobTitle);
        setValue("Ratings", testData.ratings);
        setValue("PersonImage", testData.imageUrl || "");
        if (testData.imageUrl) {
          setPreview(
            `${process.env.NEXT_PUBLIC_API_ADMIN_URL}files/testimonial/${testData.imageUrl}`
          );
        } else {
          setPreview("");
        }
      }
    } catch (error) {}
  };
  const getUpazilaByDistrict = async (districtIds = []) => {
    setAllUpazila([]);
    if (!districtIds.length || districtIds[0] === 0) {
      setIsUpazilaDisabled(true);
      return;
    }
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getupazilabydistrict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
          body: JSON.stringify(districtIds),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch upazilas");
      const result = await response.json();
      setAllUpazila(result?.data || []);
      setIsUpazilaDisabled(false);
    } catch (error) {
      setAllUpazila([]);
      setIsUpazilaDisabled(true);
    } finally {
      setLoading(false);
    }
  };

  const getDistrictByDivision = async (divisionIds = []) => {
    setAllDistrict([]);
    setAllUpazila([]);
    setValue("districtId", "");
    setValue("upazilaId", "");
    setIsUpazilaDisabled(true);

    if (!divisionIds.length || divisionIds[0] === 0) {
      setIsDistrictDisabled(true);
      return;
    }
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getdistrictbydivision`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
          body: JSON.stringify(divisionIds),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch districts");
      const result = await response.json();

      setAllDistrict(result?.data || []);
      setIsDistrictDisabled(false);
    } catch (error) {
      setIsDistrictDisabled(true);
      setAllDistrict([]);
    } finally {
      setLoading(false);
    }
  };

  const getAllDivision = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getdivisions`,

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
        setAllDivision(result?.data);
        setLoading(false);
      } else {
        const errorData = await response.json();
        setLoading(false);
        setAllDivision([]);
      }
    } catch (error) {
      setAllDivision([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDivision();
    if (id) {
      getSingleUser();
    } else {
      reset();
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    const isEditing = !!id;
    const formData = new FormData();
    formData.append("Name", data.Name);
    formData.append("Content", data.Content);
    formData.append("Ratings", Number(data.Ratings));
    formData.append("JobTitle", data.JobTitle);
    formData.append("IsActive", data.IsActive ? "true" : "false");
    if (data.PersonImage) {
      formData.append("PersonImage", data.PersonImage);
    }
    const endpoint = isEditing
      ? `${process.env.NEXT_PUBLIC_API_ADMIN_URL}testimonial/update/${id}`
      : `${process.env.NEXT_PUBLIC_API_ADMIN_URL}testimonial/create`;
    const method = isEditing ? "PUT" : "POST";
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(
          isEditing ? "User updated successfully" : "User created successfully"
        );
        setIsModalOpen(false);
        setid(null);
        getSingleUsers(currentPage);
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const languageOptions = [
    { label: "Bangla", value: "Bangla" },
    { label: "English", value: "English" },
  ];
  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold mx-auto">
            {isEditMode ? "Edit " : "Add "} Profile Information
          </h4>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-10">
          {/* Upload */}
          <h6>Profile Picture</h6>
          <div className="flex items-center gap-3">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <BsPersonCircle size={40} className="text-gray-500" />
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef?.current?.click()}
                className="px-3 py-1 bg-(--primary-blue)/10 text-blue-500 border border-(--primary-blue)/10 rounded-md text-sm"
              >
                Upload
              </button>
              {preview && (
                <button
                  type="button"
                  onClick={() => {
                    setPreview("");
                    setValue("image", null);
                  }}
                  className="px-3 py-1 text-red-500 border border-red-500 rounded-md text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/png, image/jpeg"
            ref={(el) => {
              fileInputRef.current = el;
              register("PersonImage", {
                required: !isEditMode ? "Image is required" : false,
              });
            }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPreview(URL.createObjectURL(file));
                setValue("PersonImage", file, { shouldValidate: true });
              }
            }}
            className="hidden"
          />
          {errors.PersonImage && (
            <p className="text-red-500 text-xs mt-1">
              {errors.PersonImage.message}
            </p>
          )}

          <h5 className="mt-10">General Information</h5>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm  text-gray-800">
                Name
              </label>
              <input
                type="text"
                {...register("Name", {
                  required: !isEditMode ? "Name is required" : false,
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.Name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Name.message}
                </p>
              )}
            </div>
            {/* User Name */}
            <div>
              <label htmlFor="name" className="block text-sm  text-gray-800">
                User Name
              </label>
              <input
                type="text"
                {...register("Name", {
                  required: !isEditMode ? "Name is required" : false,
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.Name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Name.message}
                </p>
              )}
            </div>
            {/* Email */}
            <div>
              <label htmlFor="name" className="block text-sm  text-gray-800">
                Email
              </label>
              <input
                type="email"
                {...register("Name", {
                  required: !isEditMode ? "Name is required" : false,
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.Name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Name.message}
                </p>
              )}
            </div>
            {/* Mobile */}
            <div>
              <label htmlFor="name" className="block text-sm  text-gray-800">
                Mobile Number
              </label>
              <input
                type="tel"
                {...register("Name", {
                  required: !isEditMode ? "Name is required" : false,
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.Name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Name.message}
                </p>
              )}
            </div>
            {/* Gender */}
            <div>
              <label htmlFor="name" className="block text-sm  text-gray-800">
                Gender
              </label>
              <select
                id="providerId"
                {...register("providerId", {
                  required: !isEditMode && "Provider is required",
                })}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
              >
                <option value="" className="">
                  Select a provider
                </option>
                <option value="male" className="">
                  Male
                </option>
                <option value="female" className="">
                  Female
                </option>
              </select>
              {errors.Name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Name.message}
                </p>
              )}
            </div>
            {/* Date of Birth */}
            <div>
              <label htmlFor="name" className="block text-sm  text-gray-800">
                Date of birth
              </label>
              <input
                type="date"
                {...register("Name", {
                  required: !isEditMode ? "Name is required" : false,
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.Name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Name.message}
                </p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="name" className="block text-sm  text-gray-800">
              Your Bio
            </label>
            <textarea
              rows={3}
              {...register("Content", {
                required: !isEditMode ? "Content is required" : false,
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
            />
            {errors.Content && (
              <p className="text-red-500 text-xs mt-1">
                {errors.Content.message}
              </p>
            )}
          </div>
          <h5 className="mt-10">Permanent Address</h5>
          <div>
            <label htmlFor="name" className="block text-sm  text-gray-800">
              Address
            </label>
            <input
              type="text"
              {...register("Name", {
                required: !isEditMode ? "Name is required" : false,
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
            />
            {errors.Name && (
              <p className="text-red-500 text-xs mt-1">{errors.Name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Country */}
            <div>
              <label htmlFor="name" className="block text-sm  text-gray-800">
                Country
              </label>
              <input
                type="text"
                {...register("Name", {
                  required: !isEditMode ? "Name is required" : false,
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.Name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Name.message}
                </p>
              )}
            </div>
            <LocationSelect
              allDivision={allDivision}
              allDistrict={allDistrict}
              allUpazila={allUpazila}
              getDistrictByDivision={getDistrictByDivision}
              getUpazilaByDistrict={getUpazilaByDistrict}
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
            />
          </div>

          <div className="flex items-center justify-between gap-2 ">
            <h5 className="mt-10">Shop Address</h5>
            <div className="flex items-center gap-2 ">
              <input
                type="checkbox"
                {...register("isActive")}
                className="toggle toggle-success "
              />
              <label className="text-sm font-medium text-gray-600">
                Same as permanent address
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm  text-gray-800">
                Shop Address
              </label>
              <input
                type="text"
                {...register("Name", {
                  required: !isEditMode ? "Name is required" : false,
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.Name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="name" className="block text-sm  text-gray-800">
                Shop Name
              </label>
              <input
                type="text"
                {...register("Name", {
                  required: !isEditMode ? "Name is required" : false,
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.Name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block text-sm  text-gray-800">
                Country
              </label>
              <input
                type="text"
                {...register("Name", {
                  required: !isEditMode ? "Name is required" : false,
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.Name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Name.message}
                </p>
              )}
            </div>
            <LocationSelect
              allDivision={allDivision}
              allDistrict={allDistrict}
              allUpazila={allUpazila}
              getDistrictByDivision={getDistrictByDivision}
              getUpazilaByDistrict={getUpazilaByDistrict}
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
            />
          </div>

          {/* language and currency */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/*   Currency Code */}
            <div>
              <label htmlFor="name" className="block text-sm  text-gray-800">
                Currency Code
              </label>
              <select
                id="providerId"
                {...register("providerId", {
                  required: !isEditMode && "Provider is required",
                })}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
              >
                <option value="" className="">
                  Select a provider
                </option>
                <option value="male" className="">
                  Dollar
                </option>
                <option value="female" className="">
                  BDT
                </option>
              </select>
              {errors.Name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Name.message}
                </p>
              )}
            </div>
            {/* Date of Birth */}
            <div>
              <label htmlFor="name" className="block text-sm  text-gray-800">
                Language
              </label>
              <Select
                id="Language"
                options={languageOptions}
                onChange={(val) => setValue("languages", val)}
                isMulti
                placeholder="Select Language"
                className="mt-1"
                classNames={{
                  control: () =>
                    `mt-1 block w-full rounded-xl text-gray-600 text-sm border border-gray-300 py-0.5 focus:outline-none `,
                }}
              />
              {errors.Name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Name.message}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4 text-sm">
            <button
              type="button"
              onClick={() => reset()}
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

export default ProfileForm;
