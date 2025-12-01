"use client";

import Loader from "@/components/shared/Loader";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaStar } from "react-icons/fa";
import { useUsers } from "./_hooks/useUsers";
import AddUserModal from "./_components/AddUserModal";
import UserTable from "./_components/UserTable";

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
