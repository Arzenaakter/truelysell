"use client";
import Editor from "@/components/shared/Editor";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

const UpdateBlogPage = ({ params, searchParams }) => {
  const { action } = use(params);
  const { id } = use(searchParams);
  const isEdit = action === "edit";
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState("");
  const [allCategoryData, setAllCategoryData] = useState([]);

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
      Title: "",
      Slug: "",
      BlogCategoryId: "",
      Tags: "",
      MetaKeywords: "",
      MetaDescription: "",
      Content: "",
      IsActive: false,
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

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getblogcategories`,

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

        setAllCategoryData(result?.data || []);
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
  const getSingleBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}blog/getblogbyid/${id}`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.ok) {
        const { data } = await response.json();

        setValue("Title", data.title || "");
        setValue("Slug", data.slug || "");
        setValue("BlogCategoryId", data.blogCategoryId || "");
        setValue("Tags", data.tags || "");
        setValue("MetaKeywords", data.metaKeywords || "");
        setValue("MetaDescription", data.metaDescription || "");
        setValue("Content", data.content || "");
        setValue("IsActive", data.isActive || false);
        setPreview(
          `${process.env.NEXT_PUBLIC_API_ADMIN_URL}files/blog/${data.blogThumbnail}`
        );

        setLoading(false);
      } else {
        const errorData = await response.json();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();

    if (isEdit && id) {
      getSingleBlogs();
    }
  }, [isEdit, id]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("Title", data.Title);
    formData.append("Slug", data.Slug || "");
    formData.append("BlogCategoryId", data.BlogCategoryId);
    formData.append("Tags", data.Tags);
    formData.append("MetaKeywords", data.MetaKeywords);
    formData.append("MetaDescription", data.MetaDescription);
    formData.append("Content", data.Content);
    formData.append("IsActive", data.IsActive);

    if (data.BlogThumbnailFile && data.BlogThumbnailFile.length > 0) {
      for (const img of data.BlogThumbnailFile) {
        formData.append("BlogThumbnailFile", img);
      }
    }
    if (id) {
      formData.append("Id", id);
    }
    try {
      setLoading(true);

      const endpoint = isEdit
        ? `${process.env.NEXT_PUBLIC_API_ADMIN_URL}blog/update/${id}`
        : `${process.env.NEXT_PUBLIC_API_ADMIN_URL}blog/create`;

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok && result.message) {
        toast.success(result.message);
        router.push("/admin/blogs");
        reset();
      } else {
        toast.error(result.error || "Failed to add blog. Please try again.");
      }
    } catch {
      toast.error("An error occurred while adding the blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className=" ">
        <div className=" p-4   ">
          <h5>{isEdit ? "Update" : "Add"} Blog</h5>
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
            </div>
          </div>
          {/*  */}
          <div className=" gap-6 mb-6">
            {/* Category */}
            <div>
              <label
                htmlFor="BlogCategoryId"
                className="block text-sm  text-gray-800"
              >
                Category
              </label>
              <select
                id="BlogCategoryId"
                {...register("BlogCategoryId", {
                  required: isEdit ? false : "Category is required",
                })}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
              >
                <option value="" className="">
                  Select category
                </option>
                {allCategoryData.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.BlogCategoryId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.BlogCategoryId.message}
                </p>
              )}
            </div>
          </div>
          {/*  */}
          <div className=" grid lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="Tags" className="block text-sm  text-gray-800">
                Tags
              </label>
              <input
                id="Tags"
                {...register("Tags", {
                  required: isEdit ? false : "Tags is required",
                })}
                className={`mt-1 block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.Tags ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.Tags && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.Tags.message}
                </p>
              )}
            </div>

            {/* keywords */}
            <div>
              <label
                htmlFor="MetaKeywords"
                className="block text-sm  text-gray-800"
              >
                Meta Keywords
              </label>
              <input
                id="MetaKeywords"
                {...register("MetaKeywords", {
                  required: isEdit ? false : "keywords is required",
                })}
                className={`mt-1 block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.MetaKeywords ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.MetaKeywords && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.MetaKeywords.message}
                </p>
              )}
            </div>
          </div>

          <div className="  mb-6">
            {/* description */}
            <div>
              <label
                htmlFor="MetaDescription"
                className="block text-sm  text-gray-800"
              >
                Meta Description
              </label>
              <textarea
                id="MetaDescription"
                {...register("MetaDescription", {
                  required: isEdit ? false : "description is required",
                })}
                className={`mt-1 block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.MetaDescription ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.MetaDescription && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.MetaDescription.message}
                </p>
              )}
            </div>
          </div>
          {/*  */}
          <div className=" mb-6">
            <label className="block text-sm  text-gray-800 ">
              Blog Thumbnail
            </label>

            <div className="mt-1">
              <button
                type="button"
                onClick={() => fileInputRef?.current?.click()}
                className="px-3 py-5 bg-gray-50  w-full border-gray-300 border border-dashed rounded-md text-sm flex justify-center"
              >
                <div>
                  <FaUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <span className="relative bg-white rounded-md font-medium text-gray-600 hover:text-blue-500 focus-within:outline-none  text-sm">
                    Upload a file
                  </span>
                </div>
              </button>
            </div>
            {preview && (
              <div className="relative my-5 inline-block">
                <img
                  src={preview}
                  alt="preview"
                  className="w-20 h-20  object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview("");
                    setValue("BlogThumbnailFile", null);
                  }}
                  className=" text-white bg-red-500 p-1 rounded m-1 absolute top-0 right-0 z-20"
                >
                  <FaRegTrashCan />
                </button>
              </div>
            )}

            <input
              type="file"
              accept="image/png, image/jpeg"
              ref={(el) => {
                fileInputRef.current = el;
                register("BlogThumbnailFile");
              }}
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setPreview(URL.createObjectURL(files[0]));
                setValue("BlogThumbnailFile", files, { shouldValidate: true });
              }}
              className="hidden"
            />

            {errors.BlogThumbnailFile && (
              <p className="text-red-500 text-xs mt-1">
                {errors.BlogThumbnailFile.message}
              </p>
            )}
          </div>

          {/* page content */}
          <div>
            <label
              htmlFor="Content"
              className="block text-sm  text-gray-800 mb-1"
            >
              Content
            </label>

            <Editor
              value={watch("Content")}
              onChange={(content) => setValue("Content", content)}
            />

            {errors.Content && (
              <p className="mt-1 text-sm text-red-600">
                {errors.Content.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 ps-6">
          <input
            type="checkbox"
            {...register("IsActive")}
            className="toggle toggle-success "
          />
          <label className="text-sm font-medium text-gray-600">Is Active</label>
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
