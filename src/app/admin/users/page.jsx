"use client";
import Loader from "@/components/shared/Loader";
import { useAppContext } from "@/context/AppContext";
import { FaPlus, FaStar } from "react-icons/fa";
import { useUsers } from "@/hooks/useUsers";
import AddUserModal from "./_components/AddUserModal";
import UserTable from "./_components/UserTable";
import NoFoundData from "@/components/shared/NoFoundData";

const UsersPage = () => {
  const pageSize = 10;
  const { loading, isModalOpen, setIsModalOpen } = useAppContext();
  const { allData, setAllData, saveUser } = useUsers();

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Users</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--primary-blue) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add User
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : allData && allData.length < 0 ? (
        <NoFoundData />
      ) : (
        <UserTable
          allData={allData}
          setAllData={setAllData}
          pageSize={pageSize}
        />
      )}

      {isModalOpen && <AddUserModal onSubmit={saveUser} />}
    </div>
  );
};

export default UsersPage;
