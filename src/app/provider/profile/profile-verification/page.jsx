"use client";

import { useState } from "react";
import { FiPhone, FiMail, FiTrash2 } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import toast from "react-hot-toast";

// PRELOADED DEFAULT DATA
const initialItems = [
  {
    id: 1,
    type: "phone",
    title: "Phone Number Verification",
    desc: "Authentication for Login, OTP, Settings, transfers",
    icon: <FiPhone className="text-4xl text-gray-500" />,
    status: "Not Verified",
    buttonText: "Verify",
  },
  {
    id: 2,
    type: "email",
    title: "Email Address Verification",
    desc: "For account Login & Retrieve of your Account",
    icon: <FiMail className="text-4xl text-gray-500" />,
    status: "Not Verified",
    buttonText: "Verify",
  },
  {
    id: 3,
    type: "NID or Birth certificate",
    title: "NID or Birth certificate Verification",
    desc: "You will not able to place order until the real name is confirmed",
    icon: <HiOutlineDocumentText className="text-4xl text-gray-500" />,
    status: "Not Verified",
    buttonText: "Upload Document",
  },
  {
    id: 4,
    type: "Trade License",
    title: "Trade License Verification",
    desc: "You will not able to place order until the real name is confirmed",
    icon: <HiOutlineDocumentText className="text-4xl text-gray-500" />,
    status: "Not Verified",
    buttonText: "Upload Document",
  },
  {
    id: 5,
    type: "BIN/TIN",
    title: "BIN/TIN Verification",
    desc: "You will not able to place order until the real name is confirmed",
    icon: <HiOutlineDocumentText className="text-4xl text-gray-500" />,
    status: "Not Verified",
    buttonText: "Upload Document",
  },
  {
    id: 6,
    type: "Photo",
    title: "Photo Verification",
    desc: "You will not able to place order until the real name is confirmed",
    icon: <HiOutlineDocumentText className="text-4xl text-gray-500" />,
    status: "Not Verified",
    buttonText: "Upload Document",
  },
];

const ProfileVerificationPage = () => {
  const [items, setItems] = useState(initialItems);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState(null);

  // ============= VERIFY API CALL =================
  const handleVerify = async (type) => {
    try {
      const res = await fetch(`/api/verify/${type}`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error("Failed");

      setItems((prev) =>
        prev.map((i) => (i.type === type ? { ...i, status: "Verified" } : i))
      );

      toast.success("Verified successfully!");
    } catch (err) {
      toast.error("Verification failed");
    }
  };

  // ============= DELETE VERIFICATION =================
  const handleDelete = async (type) => {
    try {
      const res = await fetch(`/api/verify/${type}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed");

      setItems((prev) =>
        prev.map((i) =>
          i.type === type ? { ...i, status: "Not Verified" } : i
        )
      );

      toast.success("Verification removed!");
    } catch (err) {
      toast.error("Delete failed!");
    }
  };

  // ============= UPLOAD DOCUMENT (MODAL SUBMIT) =================
  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.fileInput.files[0];

    if (!file) return toast.error("Please select a file");

    const formData = new FormData();
    formData.append("document", file);

    try {
      const res = await fetch(`/api/verify/upload-document`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      setItems((prev) =>
        prev.map((i) =>
          i.type === "document" ? { ...i, status: "Pending" } : i
        )
      );

      toast.success("Document uploaded! Waiting for approval");
      setOpenModal(false);
    } catch (err) {
      toast.error("Upload failed!");
    }
  };

  // ============= OPEN MODAL FOR DOCUMENT UPLOAD =============
  const openUploadModal = () => {
    setSelectedDocType("document");
    setOpenModal(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4 className="text-lg font-semibold">Profile Verification</h4>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 p-6 rounded-xl shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="flex gap-4 items-start">
              {item.icon}
              <div>
                <h6 className="text-lg font-semibold">{item.title}</h6>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
            </div>

            <hr className="my-5 text-gray-200" />

            <div className="flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded text-xs ${
                  item.status === "Verified"
                    ? "bg-green-100 text-green-600"
                    : item.status === "Pending"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                • {item.status}
              </span>

              <div className="flex items-center gap-3">
                {item.type !== "document" ? (
                  <button
                    onClick={() => handleVerify(item.type)}
                    className="bg-gray-900 text-white px-4 py-1 rounded-lg text-[12px] hover:bg-(--dark) transition"
                  >
                    {item.buttonText}
                  </button>
                ) : (
                  <button
                    onClick={openUploadModal}
                    className="bg-gray-900 text-white px-4 py-1 rounded-lg text-[12px] hover:bg-(--dark) transition"
                  >
                    {item.buttonText}
                  </button>
                )}

                <button
                  onClick={() => handleDelete(item.type)}
                  className="text-(--dark) hover:text-red-500 transition"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===================== DOCUMENT UPLOAD MODAL ===================== */}
      {openModal && (
        <div className="fixed inset-0 bg-(--dark)/50 flex items-center justify-center z-50">
          <div className="bg-white w-[350px] p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Upload Document</h3>

            <form onSubmit={handleUpload}>
              <input
                type="file"
                name="fileInput"
                className="border w-full p-2 rounded"
              />

              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileVerificationPage;
