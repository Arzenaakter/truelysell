"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";
import { apiService } from "@/services/apiService";
import { useForm } from "react-hook-form";

export const useUsers = (pageSize = 10) => {
  const [allData, setAllData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [singleUser, setSingleUser] = useState(null);
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
        const res = await apiService.get("dropdown/getroles");
        setRoles(res.data);
      } catch {}
    })();
  }, []);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const res = await apiService.get(
        `users/getall?PageNumber=${
          page - 1
        }&SearchText=&SortBy=FirstName&SortDirection=asc&PageSize=${pageSize}`
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
    fetchUsers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (selectedId && isModalOpen) {
      (async () => {
        try {
          const res = await apiService.get(`users/getuserbyid/${selectedId}`);
          setSingleUser(res.data);
        } catch {}
      })();
    } else {
      setSingleUser(null);
    }
  }, [selectedId, isModalOpen]);

  const saveUser = async (data) => {
    const payload = {
      FirstName: data.FirstName,
      LastName: data.LastName,
      Email: data.Email,
      MobileNo: data.MobileNo,
      Password: data.Password,
      IsActive: Boolean(data.IsActive),
      UserRoles: [
        {
          RoleId: Number(data.RoleId),
        },
      ],
      ...(selectedId && { Id: selectedId }),
    };

    try {
      if (selectedId) {
        const res = await apiService.put(`users/update/${selectedId}`, payload);

        if (res.message) {
          fetchUsers();
          setIsModalOpen(false);
          toast.success(res.message);
          reset();
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await apiService.post("users/create", payload);

        if (res.message) {
          toast.success(res.message);
          fetchUsers();
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
    roles,
    singleUser,
    saveUser,
  };
};
