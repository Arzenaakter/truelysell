"use client";

import AddCouponModal from "@/components/admin/coupon/AddCouponModal";
import DeleteButton from "@/components/shared/DeleteButton";
import Pagination from "@/components/shared/Pagination";
import { useAppContext } from "@/context/AppContext";
import { couponsData } from "@/data/json/coupons";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { FadeLoader } from "react-spinners";

const CouponsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allData, setAllData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const { loading, setLoading } = useAppContext();
  const pageSize = 10;

  const getCoupons = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}faq/getall?PageNumber=${
          page - 1
        }&SearchText=&SortBy=Title&SortDirection=asc&PageSize=${pageSize}`,

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
    getCoupons(currentPage);
  }, [currentPage]);

  const handleCoupon = async (data) => {
    const isEditing = !!selectedId;

    const payload = {
      Title: data.Title,
      Details: data.Details,
      Position: data.Position,
      IsActive: data.IsActive,
    };

    if (isEditing) {
      payload.Id = selectedId;
    }

    const endpoint = isEditing
      ? `${process.env.NEXT_PUBLIC_API_ADMIN_URL}faq/update/${selectedId}`
      : `${process.env.NEXT_PUBLIC_API_ADMIN_URL}faq/create`;

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
        getCoupons(currentPage);
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Coupons</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--primary-blue) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Coupon
        </button>
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
            <table className="w-full min-w-screen text-sm text-left text-gray-600">
              <thead className="bg-sky-600/10 text-gray-800 text-sm uppercase">
                <tr>
                  <th className="py-5 px-3">#</th>
                  <th className="py-5 px-3">Name </th>
                  <th className="py-5 px-3">Code</th>
                  <th className="py-5 px-3">Type</th>
                  <th className="py-5 px-3">Discount</th>
                  <th className="py-5 px-3">limit</th>
                  <th className="py-5 px-3">used</th>
                  <th className="py-5 px-3">valid date</th>
                  <th className="py-5 px-3">service name</th>
                  <th className="py-5 px-3">status</th>
                  <th className="py-5 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {couponsData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-200/80 hover:bg-gray-100 transition"
                  >
                    <td className="py-4 px-3">{item.id}</td>
                    <td className="py-4 px-3">
                      {}
                      {item.name}
                    </td>

                    <td className="py-4 px-3 font-medium">{item.code}</td>

                    <td className="py-4 px-3">{item.type}</td>
                    <td className="py-4 px-3">{item.discount}</td>
                    <td className="py-4 px-3">{item.limit}</td>
                    <td className="py-4 px-3">{item.used}</td>
                    <td className="py-4 px-3">{item.validDate}</td>
                    <td className="py-4 px-3">{item.serviceName}</td>
                    <td
                      className={`py-4 px-3 font-medium ${
                        item.status === "Action"
                          ? "text-green-500"
                          : "text-blue-500"
                      } `}
                    >
                      {item.status}
                    </td>

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
                          endpoint={`faq/delete/${item?.id}`}
                          type="faq"
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

      <AddCouponModal
        isOpen={isModalOpen}
        onSubmit={handleCoupon}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedId(null);
        }}
        Id={selectedId}
      />
    </div>
  );
};

export default CouponsPage;
