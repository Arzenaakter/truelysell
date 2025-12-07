"use client";

import AddCouponModal from "@/app/admin/coupons/_components/AddCouponModal";
import DeleteButton from "@/components/shared/DeleteButton";
import Loader from "@/components/shared/Loader";
import NoFoundData from "@/components/shared/NoFoundData";
import Pagination from "@/components/shared/Pagination";
import { useAppContext } from "@/context/AppContext";
import { couponsData } from "@/data/json/coupons";
import { useAdminCoupons } from "@/hooks/admin/useAdminCoupons";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { FadeLoader } from "react-spinners";
import AdminCouponsTable from "./_components/AdminCouponsTable";

const CouponsPage = () => {
  const { loading, isModalOpen, setIsModalOpen } = useAppContext();
  const { allData, setAllData, saveCoupon, providers, categories, services } =
    useAdminCoupons();
  const pageSize = 10;

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Coupons</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--primary-blue) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Coupon
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : allData && allData.length < 0 ? (
        <NoFoundData />
      ) : (
        <AdminCouponsTable
          allData={allData}
          setAllData={setAllData}
          providers={providers}
          categories={categories}
          services={services}
          pageSize={pageSize}
        />
      )}

      {isModalOpen && <AddCouponModal onSubmit={saveCoupon} />}
    </div>
  );
};

export default CouponsPage;
