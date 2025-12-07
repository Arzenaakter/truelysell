"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";
import { apiService } from "@/services/apiService";
import { useForm } from "react-hook-form";

export const useAdminWallet = (pageSize = 10) => {
  const [allData, setAllData] = useState([]);
  const [singleWallet, setsingleWallet] = useState(null);
  const { reset } = useForm({});

  const {
    setLoading,
    currentPage,
    setTotalRecords,
    selectedId,
    isModalOpen,
    setIsModalOpen,
  } = useAppContext();

  const fetchWallet = async (page = 1) => {
    setLoading(true);
    try {
      const res = await apiService.get(
        `wallet/getall?PageNumber=${
          page - 1
        }&SearchText=&SortBy=Id&SortDirection=desc&PageSize=${pageSize}`
      );
      setAllData(res.data);
      setTotalRecords(res.numberOfRecords);
    } catch {
      setAllData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (selectedId && isModalOpen) {
      (async () => {
        try {
          const res = await apiService.get(
            `wallet/getcouponbyid/${selectedId}`
          );

          setsingleWallet(res.data);
        } catch {}
      })();
    } else {
      setsingleWallet(null);
    }
  }, [selectedId, isModalOpen]);

  const saveWallet = async (data) => {
    const payload = {
      Name: data.Name,
      CouponCode: data.CouponCode,
      DiscountValue: Number(data.DiscountValue),
      UsageLimit: Number(data.UsageLimit),
      ValidUntil: data.ValidUntil,
      ServiceId: data.ServiceId,
      IsActive: data.IsActive,
      CouponType: data.CouponType,
      ProviderId: data.ProviderId,
      CategoryId: data.CategoryId,
      ...(selectedId && { Id: selectedId }),
    };

    try {
      if (selectedId) {
        const res = await apiService.put(
          `wallet/update/${selectedId}`,
          payload
        );

        if (res.message) {
          fetchWallet();
          setIsModalOpen(false);
          toast.success(res.message);
          reset();
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await apiService.post("wallet/create", payload);

        if (res.message) {
          toast.success(res.message);
          fetchWallet();
          setIsModalOpen(false);
        } else {
          toast.error(res.error);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return {
    allData,
    setAllData,
    singleWallet,
    saveWallet,
  };
};
