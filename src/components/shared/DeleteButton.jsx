"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashCan } from "react-icons/fa6";

const DeleteButton = ({ endpoint, type, onComplete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    toast.custom((t) => (
      <div className="bg-white shadow-lg  rounded-lg p-4 flex flex-col gap-3 w-72">
        <p className="text-gray-700 font-medium text-sm">
          Are you sure you want to delete this {type}?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-100 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              confirmDelete();
            }}
            className="px-3 py-1 text-sm rounded-md bg-(--primary-blue) text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    ));
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}${endpoint}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );

      const data = await res.json().catch(() => null);

      if (data.error) {
        toast.error(data?.error || `Failed to delete ${type}`);
        onComplete(false);
        return;
      }

      toast.success(`${type} deleted successfully`);
      onComplete(true);
    } catch (error) {
      toast.error("Something went wrong");
      onComplete(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      title="Delete"
      className="bg-gray-200 text-gray-500 p-2 h-7 w-7 hover:bg-(--primary-blue) hover:text-white  rounded-full flex items-center  justify-center  gap-2"
    >
      <FaRegTrashCan size={25} />
    </button>
  );
};

export default DeleteButton;
