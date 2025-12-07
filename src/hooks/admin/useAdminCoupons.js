"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";
import { apiService } from "@/services/apiService";
import { useForm } from "react-hook-form";

export const useAdminCoupons = (pageSize = 10) => {
  const [allData, setAllData] = useState([]);
  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [singleCoupon, setSingleCoupon] = useState(null);
  const { reset } = useForm({});

  const {
    setLoading,
    currentPage,
    setTotalRecords,
    selectedId,
    isModalOpen,
    setIsModalOpen,
  } = useAppContext();

  useEffect(() => {
    (async () => {
      try {
        const res = await apiService.get("dropdown/getservices");
        setServices(res.data);
      } catch {}
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const res = await apiService.get("dropdown/getcategories");
        setCategories(res.data);
      } catch {}
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const res = await apiService.get("dropdown/getproviders");
        setProviders(res.data);
      } catch {}
    })();
  }, []);

  const fetchCoupons = async (page = 1) => {
    setLoading(true);
    try {
      const res = await apiService.get(
        `coupon/getall?PageNumber=${
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
    fetchCoupons(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (selectedId && isModalOpen) {
      (async () => {
        try {
          const res = await apiService.get(
            `coupon/getcouponbyid/${selectedId}`
          );

          setSingleCoupon(res.data);
        } catch {}
      })();
    } else {
      setSingleCoupon(null);
    }
  }, [selectedId, isModalOpen]);

  const saveCoupon = async (data) => {
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
          `coupon/update/${selectedId}`,
          payload
        );

        if (res.message) {
          fetchCoupons();
          setIsModalOpen(false);
          toast.success(res.message);
          reset();
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await apiService.post("coupon/create", payload);

        if (res.message) {
          toast.success(res.message);
          fetchCoupons();
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
    providers,
    categories,
    services,
    singleCoupon,
    saveCoupon,
  };
};
