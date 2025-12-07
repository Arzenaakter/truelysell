import DeleteButton from "@/components/shared/DeleteButton";
import NoFoundData from "@/components/shared/NoFoundData";
import Pagination from "@/components/shared/Pagination";
import { useAppContext } from "@/context/AppContext";
import { FiEdit } from "react-icons/fi";

const UserTable = ({ allData, setAllData, pageSize }) => {
  const {
    setSelectedId,
    currentPage,
    setCurrentPage,
    totalRecords,
    setIsModalOpen,
  } = useAppContext();

  return (
    <div className=" mb-10">
      <div className="overflow-x-auto mb-5">
        <table className="w-full min-w-screen text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-sm uppercase">
            <tr>
              <th className="py-5 px-3">#</th>
              <th className="py-5 px-3">Name </th>
              <th className="py-5 px-3">Mobile </th>
              <th className="py-5 px-3">email </th>
              <th className="py-5 px-3">role </th>
              <th className="py-5 px-3">created</th>
              <th className="py-5 px-3">Status</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {allData &&
              allData.map((item, inx) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-200/80 hover:bg-gray-100 transition"
                >
                  <td className="py-4 px-3">{inx + 1}</td>

                  <td className="py-4 px-3 ">
                    <div className="flex items-center gap-2 lg:flex-row flex-col">
                      {item.name}
                    </div>
                  </td>
                  <td className="py-4 px-3">{item.mobileNo}</td>
                  <td className="py-4 px-3">{item.email}</td>
                  <td className="py-4 px-3">{item.role}</td>

                  <td className="py-4 px-3 font-medium">{item.createdDate}</td>
                  <td
                    className={`py-4 px-3 font-semibold ${
                      item.status == "Active"
                        ? "text-green-700"
                        : "text-blue-700"
                    }`}
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
                        endpoint={`users/delete/${item?.id}`}
                        type="user"
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

export default UserTable;
