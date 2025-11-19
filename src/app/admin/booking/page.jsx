"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import Pagination from "@/components/shared/Pagination";
import { FadeLoader } from "react-spinners";
import Link from "next/link";
import toast from "react-hot-toast";

const BookingPage = () => {
  const [allData, setAllData] = useState([]);
  const [allStatusData, setAllStatusData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, setLoading } = useAppContext();
  const pageSize = 10;

  const getAllData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_ADMIN_URL
        }booking/getall?statusId=0&PageNumber=${
          page - 1
        }&SortBy=BookingDate&SortDirection=desc&PageSize=${pageSize}`,

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
  const getBookingStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getbookingstatus`,

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

        setAllStatusData(result?.data);

        setLoading(false);
      } else {
        const errorData = await response.json();
        setLoading(false);
        setAllStatusData([]);
      }
    } catch (error) {
      setAllStatusData([]);
      setLoading(false);
    }
  };
  useEffect(() => {
    getBookingStatus();
    getAllData(currentPage);
  }, [currentPage]);

  const getPaymentStatusFromStatus = (statusId) => {
    switch (statusId) {
      case 1:
        return "Pending";
      case 2:
        return "Inprogress";
      case 3:
        return "Completed";
      case 4:
        return "Cancelled";
      default:
        return "Pending";
    }
  };

  const updateBookingStatus = async (bookingId, statusId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}booking/updatestatus/${bookingId}/${statusId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );

      const result = await response.json();
      if (response.ok && result.message) {
        const newPaymentStatus = getPaymentStatusFromStatus(statusId);

        setAllData((prev) =>
          prev.map((item) =>
            item.id === bookingId
              ? {
                  ...item,
                  statusId: statusId,
                  paymentStatus: newPaymentStatus,
                }
              : item
          )
        );

        toast.success(result.message);
      } else {
        toast.error(result.error || "Failed to update status");
        setLoading(false);
        setAllStatusData([]);
      }
    } catch (error) {
      setLoading(false);
      toast.error(result.error || "Failed to update status");
      setAllStatusData([]);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Booking List </h4>
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
            <table className="min-w-screen text-sm text-left text-gray-600">
              <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
                <tr>
                  <th className="py-5 px-3">#</th>

                  <th className="py-5 px-3">Booking Id</th>
                  <th className="py-5 px-3">Schedule Time</th>
                  <th className="py-5 px-3">Booking Time</th>
                  <th className="py-5 px-3">Provider</th>
                  <th className="py-5 px-3 ">User</th>
                  <th className="py-5 px-3">Service</th>
                  <th className="py-5 px-3">Amount</th>
                  <th className="py-5 px-3">Payment Status</th>
                  <th className="py-5 px-3">payment Date</th>
                  <th className="py-5 px-3">Booking View</th>
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
                    <td className="py-4 px-3">{item.id}</td>

                    <td className="py-4 px-3">{item.scheduleTime}</td>
                    <td className="py-4 px-3">{item.bookingTime}</td>
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        {item.providerName}
                      </div>
                    </td>

                    <td className="py-4 px-3">{item.userName}</td>

                    <td className="py-4 px-3">{item.serviceName}</td>

                    <td className="py-4 px-3 font-medium">{item.amount}</td>

                    <td className={`py-4 px-3 font-medium `}>
                      <button
                        className={`${
                          item.paymentStatus === "Completed"
                            ? "text-green-600 bg-green-100 p-2 rounded "
                            : item.status === "Pending"
                            ? "text-yellow-600 bg-yellow-100 p-2 rounded"
                            : item.status === "Inprogress"
                            ? "text-blue-600 bg-blue-100 p-2 rounded"
                            : "text-red-600 bg-red-100 p-2 rounded"
                        }`}
                      >
                        {item.paymentStatus}
                      </button>
                    </td>
                    <td className="py-4 px-3 font-medium">
                      {item.paymentDate}
                    </td>
                    <td className="py-4 px-3 font-medium">
                      <Link
                        href={`/admin/booking/view?id=${item.id}`}
                        className="text-sm underline text-blue-600"
                      >
                        View Details
                      </Link>
                    </td>

                    <td className="py-4 px-2 font-medium">
                      <select
                        onChange={(e) =>
                          updateBookingStatus(item.id, Number(e.target.value))
                        }
                        className=" rounded-md text-gray-600 text-xs border border-gray-300 p-1  focus:outline-none "
                      >
                        <option value="" className="">
                          Select Status
                        </option>
                        {allStatusData &&
                          allStatusData.length > 0 &&
                          allStatusData.map((statusItem) => (
                            <option
                              key={statusItem.id}
                              value={statusItem.id}
                              selected={statusItem.id === item.statusId}
                            >
                              {statusItem.name}
                            </option>
                          ))}
                      </select>
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
    </div>
  );
};

export default BookingPage;
