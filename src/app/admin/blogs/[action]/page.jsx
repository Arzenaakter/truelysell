"use client";
import Editor from "@/components/shared/Editor";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";

const UpdateBlogPage = ({ params, searchParams }) => {
  const { action } = use(params);
  const { id } = use(searchParams);
  const isEdit = action === "edit";
  const router = useRouter();
  const fileInputRef = useRef(null);
  const { user, userId, loading, setLoading } = useAppContext();
  const [thumbnailPreview, setThumbnailPreview] = useState();

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

  const nameValue = watch("Title");

  useEffect(() => {
    if (nameValue && !isEdit) {
      const generatedSlug = nameValue
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      setValue("Slug", generatedSlug);
    }
  }, [nameValue, setValue, isEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data) => {
    console.log("Form Data Submitted: ", data);
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}service/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user ? user : ""}`,
          },
          body: JSON.stringify({
            ...data,
            userId: userId ?? "",
          }),
        }
      );

      if (response.ok) {
        toast.success("Service added successfully");
        router.push("/admin/services");
      } else {
        toast.error("Failed to add service. Please try again.");
      }
    } catch {
      toast.error(
        "An error occurred while adding the service. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className=" ">
        <div className=" p-4   ">
          <h5>Add Blog</h5>
          <div className="border-b border-gray-200/80 my-6"></div>
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* title */}
            <div>
              <label htmlFor="Title" className="block text-sm  text-gray-800">
                Title
              </label>
              <input
                id="Title"
                {...register("Title", {
                  required: isEdit ? false : "Title is required",
                })}
                className={`mt-1 block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.Title ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.Title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.Title.message}
                </p>
              )}
            </div>
            {/* slug  */}
            <div>
              <label htmlFor="Slug" className="block text-sm  text-gray-800">
                Slug
              </label>
              <input
                id="Slug"
                {...register("Slug")}
                className={`mt-1 block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.Slug ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.Slug && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.Slug.message}
                </p>
              )}
            </div>
          </div>
          {/*  */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
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
            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm  text-gray-800"
              >
                Category
              </label>
              <select
                id="category"
                {...register("category")}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
              >
                <option value="" className="">
                  Select category
                </option>
                <option value="">category 1</option>
              </select>
            </div>
          </div>
          {/*  */}
          <div className=" grid lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="tags" className="block text-sm  text-gray-800">
                Tags
              </label>
              <input
                id="tags"
                {...register("tags", {})}
                className={`mt-1 block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.tags ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
            </div>

            {/* keywords */}
            <div>
              <label
                htmlFor="keywords"
                className="block text-sm  text-gray-800"
              >
                Meta Keywords
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
          </div>

          <div className="  mb-6">
            {/* description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm  text-gray-800"
              >
                Meta Description
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
          <div className=" mb-6">
            <label className="block text-sm  text-gray-800 ">
              Blog Thumbnail
            </label>
            <div
              onClick={handleImageClick}
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-blue-200 border-dashed rounded-lg cursor-pointer hover:border-blue-400 transition-colors duration-200"
            >
              <div className="space-y-1 text-center">
                {thumbnailPreview ? (
                  <div className="relative w-full h-48">
                    <Image
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      width={1000}
                      height={500}
                      className="object-contain w-ful h-full"
                    />
                  </div>
                ) : (
                  <>
                    <FaUpload className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="flex flex-col items-center text-sm justify-center text-gray-600">
                      <span className="relative bg-white rounded-md font-medium text-gray-600 hover:text-blue-500 focus-within:outline-none">
                        Upload a file
                      </span>
                      {/* <p className="text-xs text-blue-500">
                        Supported formates: JPEG, PNG
                      </p> */}
                    </div>
                  </>
                )}
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
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
            <span>{isEdit ? "Update Blog" : "Add Blog"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlogPage;
