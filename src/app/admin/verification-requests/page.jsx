"use client";

import { useState } from "react";
import Link from "next/link";

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
              <th className="py-5 px-3">Provider Name</th>
              <th className="py-5 px-3">View Request</th>
            </tr>
          </thead>

          <tbody className="text-[13px]">
            {allData.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{index + 1}</td>
                <td className="py-4 px-3">{item.userName}</td>
                <td className="py-4 px-3">
                  <Link
                    href={`/admin/verification-requests/all-request?id=${item.id}`}
                    className="text-blue-600 underline"
                  >
                    View Request
                  </Link>
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
