"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import Editor from "@/components/shared/Editor";
import { useAppContext } from "@/context/AppContext";
import { FaSave, FaTrash } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

const AddPage = () => {
  const router = useRouter();

  const fileInputRef = useRef(null);
  const { user, userId, loading, setLoading } = useAppContext();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      services: [
        { additionalService: "", servicePrice: "", serviceDuration: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services", // must match defaultValues
  });

  const onSubmit = async (data) => {
    console.log("Form Data Submitted: ", data);
    // try {
    //   setLoading(true);

    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_URL}service/`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${user ? user : ""}`,
    //       },
    //       body: JSON.stringify({
    //         ...data,
    //         userId: userId ?? "",
    //       }),
    //     }
    //   );

    //   if (response.ok) {
    //     toast.success("Service added successfully");
    //     router.push("/admin/services");
    //   } else {
    //     toast.error("Failed to add service. Please try again.");
    //   }
    // } catch {
    //   toast.error(
    //     "An error occurred while adding the service. Please try again."
    //   );
    // } finally {
    //   setLoading(false);
    // }
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-36">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-md shadow"
      >
        <div className=" p-4   ">
          <h5>Add Page</h5>
          <div className="border-b border-gray-200/80 my-6"></div>
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* title */}
            <div>
              <label
                htmlFor="serviceTitle"
                className="block text-sm  text-gray-800"
              >
                Title
              </label>
              <input
                id="serviceTitle"
                {...register("serviceTitle", {
                  required: "Service title is required",
                })}
                className={`mt-1 block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.serviceTitle ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.serviceTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.serviceTitle.message}
                </p>
              )}
            </div>
            {/* slug  */}
            <div>
              <label htmlFor="slug" className="block text-sm  text-gray-800">
                Slug
              </label>
              <input
                id="slug"
                {...register("slug", {
                  required: "slugis required",
                })}
                className={`mt-1 block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.slug ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.slug && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.slug.message}
                </p>
              )}
            </div>
          </div>
          {/*  */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* keywords */}
            <div>
              <label
                htmlFor="keywords"
                className="block text-sm  text-gray-800"
              >
                Keywords
              </label>
              <input
                id="keywords"
                {...register("keywords", {
                  required: "keywords is required",
                })}
                className={`mt-1 block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.keywords ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.keywords && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.keywords.message}
                </p>
              )}
            </div>
            {/* language */}
            <div>
              <label
                htmlFor="language"
                className="block text-sm  text-gray-800"
              >
                Language
              </label>
              <select
                id="language"
                {...register("language")}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
              >
                <option value="" className="">
                  Select language
                </option>
                <option value="english">English</option>
              </select>
            </div>
          </div>
          {/*  */}
          <div className=" mb-6">
            {/* description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm  text-gray-800"
              >
                Description
              </label>
              <textarea
                id="description"
                {...register("description", {
                  required: "description is required",
                })}
                className={`mt-1 block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          {/*  */}

          {/* 🔽 Login Type & Hide (Radio Options) */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Login Type */}
            <div>
              <span className="block text-sm text-gray-800 mb-2">
                Login Type
              </span>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    value="topMenu"
                    {...register("loginType", {
                      required: "Login type is required",
                    })}
                    className="accent-green-500 focus:accent-green-600 "
                  />
                  Top Menu
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    value="quickLinks"
                    {...register("loginType")}
                    className="accent-green-500 focus:accent-green-600"
                  />
                  Quick Links
                </label>
              </div>
              {errors.loginType && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.loginType.message}
                </p>
              )}
            </div>

            {/* Hide */}
            <div>
              <span className="block text-sm text-gray-800 mb-2">Hide</span>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    value="show"
                    {...register("hideOption", {
                      required: "Select show or hide",
                    })}
                    className="accent-green-500 focus:accent-green-600"
                  />
                  Show
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    value="hide"
                    {...register("hideOption")}
                    className="accent-green-500 focus:accent-green-600"
                  />
                  Hide
                </label>
              </div>
              {errors.hideOption && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.hideOption.message}
                </p>
              )}
            </div>
          </div>

          {/* page content */}
          <div>
            <label
              htmlFor="pageContent"
              className="block text-sm  text-gray-800 mb-1"
            >
              Content
            </label>
            <Editor
              value={watch("pageContent")}
              onChange={(content) => setValue("pageContent", content)}
            />
            {errors.pageContent && (
              <p className="mt-1 text-sm text-red-600">
                {errors.pageContent.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-end mb-5">
          <button
            type="submit"
            // disabled={loading}
            className="flex items-center gap-2 px-6 py-3  bg-(--primary-blue)  text-white  rounded-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            <span>Add Page</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPage;
