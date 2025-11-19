"use client";

import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";

// =================== SAMPLE DATA ======================
const initialData = [
  {
    id: 3,
    userName: "Andrew",
    documentType: "Driving Licence",
    documentName: "DrivingLicence.pdf",
    downloadUrl: "/docs/DrivingLicence.pdf",
    rejectionReason: "",
    status: "Pending",
  },
  {
    id: 2,
    userName: "Richard",
    documentType: "Passport",
    documentName: "Passport.pdf",
    downloadUrl: "/docs/Passport.pdf",
    rejectionReason: "",
    status: "Verified",
  },
  {
    id: 3,
    userName: "Richard",
    documentType: "Passport",
    documentName: "Passport.pdf",
    downloadUrl: "/docs/Passport.pdf",
    rejectionReason: "",
    status: "Pending",
  },
  {
    id: 2,
    userName: "Adrian",
    documentType: "Passport",
    documentName: "Passport.pdf",
    downloadUrl: "/docs/Passport.pdf",
    rejectionReason: "Just For Another Testing Purpose..",
    status: "Rejected",
  },
];

const VerificationRequestsPage = () => {
  const [allData, setAllData] = useState(initialData);

  // =================== HANDLE DOWNLOAD ======================
  const handleDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop();
    link.click();
  };

  // =================== HANDLE STATUS UPDATE ======================
  const handleStatusChange = async (id, newStatus) => {
    const updated = allData.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setAllData(updated);

    // ====== API CALL (EXAMPLE) ======
    try {
      const res = await fetch(`/api/verify/update-status/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update");

      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  // =================== HANDLE REJECT ======================
  const handleReject = async (id) => {
    const reason = prompt("Enter rejection reason:");

    if (!reason) return toast.error("Reason is required");

    const updated = allData.map((item) =>
      item.id === id
        ? { ...item, status: "Rejected", rejectionReason: reason }
        : item
    );
    setAllData(updated);

    // ====== API CALL (EXAMPLE) ======
    try {
      const res = await fetch(`/api/verify/reject/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });

      if (!res.ok) throw new Error("Rejected failed");

      toast.success("Document rejected");
    } catch (error) {
      toast.error("Error rejecting");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Verification Requests</h4>
      </div>

      {/* table */}
      <div className="overflow-x-scroll">
        <table className="min-w-screen text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
            <tr>
              <th className="py-5 px-3">#</th>
              <th className="py-5 px-3">User Name</th>
              <th className="py-5 px-3">Document Type</th>
              <th className="py-5 px-3">Document Name</th>
              <th className="py-5 px-3">Download</th>
              <th className="py-5 px-3">Rejection reason</th>
              <th className="py-5 px-3">Status</th>
            </tr>
          </thead>

          <tbody className="text-[13px]">
            {allData.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.id}</td>

                <td className="py-4 px-3">{item.userName}</td>

                <td className="py-4 px-3">{item.documentType}</td>

                <td className="py-4 px-3 underline text-blue-600 cursor-pointer">
                  {item.documentName}
                </td>

                <td className="py-4 px-3">
                  <button
                    onClick={() => handleDownload(item.downloadUrl)}
                    className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded text-white"
                  >
                    <FaDownload />
                  </button>
                </td>

                <td className="py-4 px-3">{item.rejectionReason || "--"}</td>

                <td className="py-4 px-3">
                  {/* VERIFIED */}
                  {item.status === "Verified" && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded">
                      Verified
                    </span>
                  )}

                  {/* REJECTED */}
                  {item.status === "Rejected" && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded">
                      Rejected
                    </span>
                  )}

                  {/* PENDING */}
                  {item.status === "Pending" && (
                    <select
                      onChange={(e) => {
                        if (e.target.value === "Rejected") {
                          handleReject(item.id);
                        } else {
                          handleStatusChange(item.id, e.target.value);
                        }
                      }}
                      className="border px-2 py-1 rounded"
                    >
                      <option>Select Status</option>
                      <option value="Verified">Verify</option>
                      <option value="Rejected">Reject</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerificationRequestsPage;
