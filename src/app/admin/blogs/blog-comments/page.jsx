"use client";

import BlogCommentModal from "@/components/admin/blog/BlogCommentModal";
import DeleteButton from "@/components/shared/DeleteButton";
import Pagination from "@/components/shared/Pagination";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { FadeLoader } from "react-spinners";

const BlogCommentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allData, setAllData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const { loading, setLoading } = useAppContext();
  const pageSize = 10;

  const getBlogComments = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_ADMIN_URL
        }blogcomment/getall?PageNumber=${
          page - 1
        }&SearchText=&SortBy=Id&SortDirection=desc&PageSize=${pageSize}`,

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
        setAllData(result?.data);
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
    getBlogComments(currentPage);
  }, [currentPage]);

  const handleBlogComment = async (data) => {
    const isEditing = !!selectedId;

    const payload = {
      Content: data.Content,
    };

    if (isEditing) {
      payload.Id = selectedId;
    }

    const endpoint = isEditing
      ? `${process.env.NEXT_PUBLIC_API_ADMIN_URL}blogcomment/update/${selectedId}`
      : `${process.env.NEXT_PUBLIC_API_ADMIN_URL}blogcomment/create`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.message) {
        toast.success(result.message);
        setIsModalOpen(false);
        setSelectedId(null);
        getBlogComments(currentPage);
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h4>Blog Comments</h4>
      </div>

      {/* table */}
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
          <div className="overflow-x-auto mb-5">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-sky-600/10 text-gray-800 text-sm uppercase">
                <tr>
                  <th className="py-5 px-3">#</th>
                  <th className="py-5 px-3">User name </th>
                  <th className="py-5 px-3">phone </th>
                  <th className="py-5 px-3">content </th>
                  <th className="py-5 px-3">create at </th>
                  <th className="py-5 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {allData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-200/80 hover:bg-gray-100 transition"
                  >
                    <td className="py-4 px-3">{index + 1}</td>

                    <td className="py-4 px-3 ">{item.customerName}</td>
                    <td className="py-4 px-3">{item.customerPhone}</td>

                    <td className="py-4 px-3">{item.content}</td>

                    <td className="py-4 px-3 ">{item.createdDate}</td>

                    <td className="py-4 px-2 font-medium">
                      <div className=" flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedId(item.id);
                            setIsModalOpen(true);
                          }}
                          className="bg-gray-200 text-gray-500 hover:bg-(--primary-blue) hover:text-white p-2 h-8 w-8 rounded-full flex items-center justify-center gap-2"
                        >
                          <FiEdit size={25} />
                        </button>
                        <DeleteButton
                          endpoint={`blogcomment/delete/${item?.id}`}
                          type="blog comment"
                          onComplete={(status) => {
                            if (status) {
                              setAllData((prev) =>
                                prev.filter((b) => b.id !== item.id)
                              );
                            } else {
                            }
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalRecords={totalRecords}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      <BlogCommentModal
        isOpen={isModalOpen}
        onSubmit={handleBlogComment}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedId(null);
        }}
        Id={selectedId}
      />
    </div>
  );
};

export default BlogCommentsPage;
