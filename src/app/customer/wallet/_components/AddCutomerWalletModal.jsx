"use client";
import { useAppContext } from "@/context/AppContext";
import { useAdminWallet } from "@/hooks/customer.js/useCustomerWallet";
import Image from "next/image";
import stripe from "@/assets/img/payment/card-05.png";
import paypal from "@/assets/img/payment/card-06.png";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const AddCutomerWalletModal = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: "",
    },
  });
  const { selectedId, onClose } = useAppContext();
  const { singleWallet } = useAdminWallet();
  const isEditMode = Boolean(selectedId);

  useEffect(() => {
    if (singleWallet && selectedId) {
      reset({
        Name: singleWallet.name,
      });
    } else {
      reset({
        Name: "",
      });
    }
  }, [singleWallet, selectedId]);
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 ">
      <div
        className=" w-full max-w-md rounded-xl shadow-lg p-6 relative my-5  bg-white 
       overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h6 className="text-lg font-semibold mx-auto">
            {isEditMode ? "Edit Wallet" : "Add Wallet"}
          </h6>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-6">
            <label htmlFor="amount" className="block text-sm  text-gray-800">
              Amount
            </label>
            <input
              id="amount"
              {...register("amount", { required: !isEditMode && true })}
              placeholder="amount"
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.amount ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div>
              {" "}
              <Image src={paypal} alt="" />
            </div>
            <div>
              <Image src={stripe} alt="" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4 text-sm">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-(--primary-blue) text-white rounded-md"
            >
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCutomerWalletModal;
