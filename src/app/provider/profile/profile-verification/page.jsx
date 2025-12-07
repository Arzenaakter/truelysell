"use client";

import { useState } from "react";
import { FiPhone, FiMail, FiTrash2 } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import toast from "react-hot-toast";

const initialItems = [
  {
    id: 1,
    type: "phone",
    title: "Phone Number Verification",
    desc: "Authentication for Login, OTP, Settings, transfers",
    icon: <FiPhone className="text-3xl text-gray-500" />,
    status: "Not Verified",
    buttonText: "Send OTP",
  },
  {
    id: 2,
    type: "email",
    title: "Email Address Verification",
    desc: "For account Login & Retrieve of your Account",
    icon: <FiMail className="text-3xl text-gray-500" />,
    status: "Not Verified",
    buttonText: "Send OTP",
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

  const [inputs, setInputs] = useState({
    phone: "",
    email: "",
  });

  const [otp, setOtp] = useState({
    phone: "",
    email: "",
  });

  const [otpStage, setOtpStage] = useState({
    phone: false,
    email: false,
  });

  // ============= SEND OTP (Phone & Email) =================
  const handleSendOtp = async (type) => {
    const value = inputs[type];

    if (!value) return toast.error(`Please enter ${type}`);

    try {
      const res = await fetch(`/api/verify/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, value }),
      });

      if (!res.ok) throw new Error("OTP failed");

      setOtpStage((prev) => ({ ...prev, [type]: true }));

      toast.success("OTP sent successfully!");
    } catch (err) {
      toast.error("Failed to send OTP");
    }
  };

  // ============= VERIFY OTP =================
  const handleVerifyOtp = async (type) => {
    const code = otp[type];

    if (!code) return toast.error("Enter OTP");

    try {
      const res = await fetch(`/api/verify/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, code }),
      });

      if (!res.ok) throw new Error("Verification failed");

      setItems((prev) =>
        prev.map((i) => (i.type === type ? { ...i, status: "Verified" } : i))
      );

      toast.success("Verified successfully!");

      // Reset OTP state
      setOtpStage((prev) => ({ ...prev, [type]: false }));
      setOtp((prev) => ({ ...prev, [type]: "" }));
    } catch (err) {
      toast.error("Invalid OTP");
    }
  };

  // ============= DELETE VERIFICATION =================
  const handleDelete = async (type) => {
    try {
      await fetch(`/api/verify/${type}`, { method: "DELETE" });

      setItems((prev) =>
        prev.map((i) =>
          i.type === type ? { ...i, status: "Not Verified" } : i
        )
      );

      toast.success("Verification removed!");
    } catch {
      toast.error("Delete failed!");
    }
  };

  return (
    <div>
      <h4 className="text-lg font-semibold mb-8">Profile Verification</h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 p-6 rounded-xl shadow-sm bg-white hover:shadow-md transition"
          >
            {/* Top */}
            <div className="flex gap-4 items-start">
              {item.icon}
              <div>
                <h6 className="text-lg font-semibold">{item.title}</h6>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
            </div>

            <hr className="my-5 text-gray-200" />

            {/* STATUS BADGE */}
            <span
              className={`px-3 py-1 rounded text-xs ${
                item.status === "Verified"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              • {item.status}
            </span>

            <div className="mt-4">
              {/* ================= PHONE OR EMAIL ================= */}
              {["phone", "email"].includes(item.type) && (
                <div>
                  <input
                    type={item.type === "phone" ? "number" : "email"}
                    placeholder={`Enter your ${item.type}`}
                    value={inputs[item.type]}
                    onChange={(e) =>
                      setInputs({ ...inputs, [item.type]: e.target.value })
                    }
                    className="w-full border border-gray-200 p-2 rounded mb-3 focus:outline-none"
                  />

                  {/* OTP Input */}
                  {otpStage[item.type] && (
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp[item.type]}
                      onChange={(e) =>
                        setOtp({ ...otp, [item.type]: e.target.value })
                      }
                      className="w-full border border-gray-200 p-2 rounded mb-3 focus:outline-none"
                    />
                  )}

                  {/* BUTTONS */}
                  {!otpStage[item.type] ? (
                    <button
                      onClick={() => handleSendOtp(item.type)}
                      className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm hover:bg-black"
                    >
                      Send OTP
                    </button>
                  ) : (
                    <button
                      onClick={() => handleVerifyOtp(item.type)}
                      className="w-full bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700"
                    >
                      Verify OTP
                    </button>
                  )}
                </div>
              )}

              {/* ================= DOCUMENT CARDS ================= */}
              {item.type !== "phone" && item.type !== "email" && (
                <button className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm">
                  {item.buttonText}
                </button>
              )}
            </div>

            {/* DELETE BUTTON */}
            {/* <button
              onClick={() => handleDelete(item.type)}
              className="mt-3 flex justify-end text-gray-600 hover:text-red-500"
            >
              <FiTrash2 size={16} />
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileVerificationPage;
