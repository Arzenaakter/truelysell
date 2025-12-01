"use client";
import { useEffect, useState } from "react";
import { UserService } from "@/services/user.service";
import toast from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";

export const useUsers = (pageSize = 10) => {
  const [allData, setAllData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [singleUser, setSingleUser] = useState(null);

  const {
    setLoading,
    currentPage,
    setTotalRecords,
    selectedId,
    isModalOpen,
    setIsModalOpen,
  } = useAppContext();

  // Fetch roles once
  useEffect(() => {
    (async () => {
      try {
        const res = await UserService.getRoles();
        setRoles(res.data);
      } catch {}
    })();
  }, []);

  // Fetch all users when page changes
  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const res = await UserService.getAll(page, pageSize);
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

  // Fetch single user automatically when modal opens for edit
  useEffect(() => {
    if (selectedId && isModalOpen) {
      (async () => {
        try {
          const res = await UserService.getById(selectedId);
          setSingleUser(res.data);
        } catch {}
      })();
    } else {
      setSingleUser(null);
    }
  }, [selectedId, isModalOpen]);

  // ADD / EDIT User
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
        const res = await UserService.update(selectedId, payload);

        if (res.message) {
          fetchUsers();
          setIsModalOpen(false);
          toast.success(res.message);
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await UserService.create(payload);

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
