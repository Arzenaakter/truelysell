"use client";
import Link from "next/link";
import { FaEdit, FaTrash, FaRegCircle } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import Pagination from "@/components/shared/Pagination";
import { FadeLoader } from "react-spinners";
import BlogDelete from "../admin/blog/BlogDelete";

const AllBlogs = ({ blogStatus, blgFrom }) => {
  const { loading, setLoading } = useAppContext();

  const [allData, setAllData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const getAllBlogs = async (page = 1) => {
    try {
      setLoading(true);
      const url = blgFrom
        ? `${process.env.NEXT_PUBLIC_API_ADMIN_URL}blog/getall?PageNumber=${
            page - 1
          }&SearchText=&SortBy=Id&SortDirection=desc&PageSize=${pageSize}`
        : `${process.env.NEXT_PUBLIC_API_ADMIN_URL}blog/getall?PageNumber=${
            page - 1
          }&SearchText=&SortBy=Id&SortDirection=desc&PageSize=${pageSize}`;
      const response = await fetch(
        url,

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

        let blogData = result?.data || [];

        if (blogStatus === "Active" || blogStatus === "Inactive") {
          blogData = blogData.filter((item) => item.status === blogStatus);
        }

        setAllData(blogData);
        setTotalRecords(result?.numberOfRecords || 0);
        setLoading(false);
      } else {
        const errorData = await response.json();
        setLoading(false);
        setAllData([]);
        setTotalRecords(0);
      }
    } catch (error) {
      setAllData([]);
      setLoading(false);
      setTotalRecords(0);
    }
  };
  useEffect(() => {
    getAllBlogs(currentPage);
  }, [currentPage, blogStatus]);

  return (
    <div className=" my-10">
      {loading ? (
        <div className="flex justify-center items-center">
          <FadeLoader color="#4c40ed" />
        </div>
      ) : allData && allData.length < 0 ? (
        <div className="p-6 text-center text-gray-500">
          <p className="text-lg">No data Found</p>
        </div>
      ) : (
        <div className=" mb-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allData.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-md shadow-lg border border-gray-200   flex flex-col"
              >
                {/* Blog Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_ADMIN_URL}files/blog/${blog.blogThumbnail}`}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-t-md transform transition-transform duration-500 ease-in-out hover:scale-110"
                  />
                  <span className="absolute top-2 left-2 bg-white text-gray-700 px-3 py-1 text-sm rounded-md shadow">
                    {blog.blogCategoryName}
                  </span>
                </div>

                <div className="p-4 flex flex-col grow">
                  {/* Author + Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <span className="font-medium text-gray-700">
                      {blog.createdUser}
                    </span>
                    <FaRegCalendarAlt className="ml-4" />
                    <span>{blog.createdDate}</span>
                  </div>

                  {/* Title */}
                  <Link
                    href={`/admin/blogs/view?id=${blog.id}`}
                    className="font-semibold text-gray-800 mb-2 cursor-pointer hover:text-(--primary-blue) transition-colors duration-300"
                  >
                    {blog.title}
                  </Link>
                  {/* content */}

                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  {blgFrom === "Admin" && (
                    <div className="mt-auto flex justify-between items-center text-gray-600 text-sm">
                      <Link
                        href={`/admin/blogs/edit?id=${blog?.id}`}
                        className="flex items-center gap-1 hover:text-blue-500"
                      >
                        <FaEdit /> Edit
                      </Link>
                      <BlogDelete
                        endpoint={`blog/delete/${blog?.id}`}
                        type="blog"
                        onComplete={(status) => {
                          if (status) {
                            setAllData((prev) =>
                              prev.filter((b) => b.id !== blog.id)
                            );
                          } else {
                          }
                        }}
                      />

                      <button className="flex items-center gap-1 hover:text-gray-800">
                        <FaRegCircle /> {blog.status}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalRecords={totalRecords}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
