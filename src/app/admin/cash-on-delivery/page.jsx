"use client";

import Pagination from "@/components/shared/Pagination";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

const CashOnDeliveryPage = () => {
  const [allData, setAllData] = useState([]);
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
        }cashondelivery/getall?statusId=0&PageNumber=${
          page - 1
        }&SortBy=date&SortDirection=desc&PageSize=${pageSize}`,

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
    getAllData(currentPage);
  }, [currentPage]);
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Reviews </h4>
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
            <table className="min-w-screen  text-sm text-left text-gray-600">
              <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
                <tr>
                  <th className="py-5 px-3">#</th>
                  <th className="py-5 px-3">Booking Code</th>

                  <th className="py-5 px-3">Service </th>
                  <th className="py-5 px-3">Provider Name</th>
                  <th className="py-5 px-3">User Name</th>
                  <th className="py-5 px-3">Amount</th>
                  <th className="py-5 px-3">Date</th>
                  <th className="py-5 px-3">Service Status</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {allData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-200/80 hover:bg-gray-100 transition"
                  >
                    <td className="py-4 px-3">{index + 1}</td>
                    <td className="py-4 px-3">{item.bookingCode}</td>
                    <td className="py-4 px-3 ">{item.serviceName}</td>
                    <td className="py-4 px-3 ">{item.provider}</td>
                    <td className="py-4 px-3 ">{item.customerName}</td>
                    <td className="py-4 px-3">{item.amount}</td>

                    <td className="py-4 px-3">{item.date}</td>
                    <td className="py-4 px-2 ">{item.serviceStatus}</td>
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

export default CashOnDeliveryPage;
