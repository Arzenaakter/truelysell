import DeleteButton from "@/components/shared/DeleteButton";
import Pagination from "@/components/shared/Pagination";
import { useAppContext } from "@/context/AppContext";
import { useAdminCoupons } from "@/hooks/admin/useAdminCoupons";
import React from "react";
import { FiEdit } from "react-icons/fi";

const AdminCouponsTable = ({
  allData,
  setAllData,
  providers,
  categories,
  services,
  pageSize,
}) => {
  const {
    setSelectedId,
    currentPage,
    setCurrentPage,
    totalRecords,
    setIsModalOpen,
  } = useAppContext();

  const getProviderName = (id) => {
    const provider = providers?.find((p) => p.id === id);
    return provider ? provider.name : "N/A";
  };

  const getCategoryName = (id) => {
    const category = categories?.find((c) => c.id === id);
    return category ? category.name : "N/A";
  };

  const getServiceName = (id) => {
    const service = services?.find((s) => s.id === id);
    return service ? service.name : "N/A";
  };

  return (
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
              <th className="py-5 px-3">Provider name</th>
              <th className="py-5 px-3">Category name</th>
              <th className="py-5 px-3">status</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {allData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.id}</td>
                <td className="py-4 px-3">{item.name}</td>

                <td className="py-4 px-3 font-medium">{item.couponCode}</td>

                <td className="py-4 px-3">{item.couponType}</td>
                <td className="py-4 px-3">{item.discountValue}</td>
                <td className="py-4 px-3">{item.usageLimit}</td>
                <td className="py-4 px-3">{item.usedCount}</td>
                <td className="py-4 px-3">{item.validUntil}</td>
                <td className="py-4 px-3">{getServiceName(item.serviceId)}</td>
                <td className="py-4 px-3">
                  {getProviderName(item.providerId)}
                </td>
                <td className="py-4 px-3">
                  {getCategoryName(item.categoryId)}
                </td>
                <td
                  className={`py-4 px-3 font-medium ${
                    item.isActive === true ? "text-green-500" : "text-blue-500"
                  } `}
                >
                  {item.isActive === true ? "Active" : "Inactive"}
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
                      endpoint={`coupon/delete/${item?.id}`}
                      type="coupon"
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
  );
};

export default AdminCouponsTable;
