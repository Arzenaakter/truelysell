// "use client";
// import { useEffect, useState } from "react";
// import { UserService } from "@/services/user.service";
// import toast from "react-hot-toast";
// import { useAppContext } from "@/context/AppContext";

// export const useUsers = (pageSize = 10) => {
//   const [allData, setAllData] = useState([]);
//   const [singleUseer, setSingleUseer] = useState([]);
//   const [roles, setRoles] = useState([]);

//   const { setLoading, currentPage, setTotalRecords, selectedId } =
//     useAppContext();

//   const fetchSingleUser = async () => {
//     const res = await UserService.getById(selectedId);
//     console.log("single user", res);
//     setSingleUseer(res.data);
//   };
//   const fetchRoles = async () => {
//     const res = await UserService.getRoles();
//     setRoles(res.data);
//   };

//   const fetchUsers = async (page) => {
//     setLoading(true);
//     try {
//       const res = await UserService.getAll(page, pageSize);
//       setAllData(res.data);
//       setTotalRecords(res.numberOfRecords);
//     } catch (err) {
//       setAllData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSingleUser();
//   }, []);

//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   useEffect(() => {
//     fetchUsers(currentPage);
//   }, [currentPage]);

//   const saveUser = async (payload, isEdit, id) => {
//     try {
//       if (isEdit) {
//         await UserService.update(id, payload);
//         toast.success("User updated successfully");
//       } else {
//         await UserService.create(payload);
//         toast.success("User created successfully");
//       }
//       fetchUsers(currentPage);
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   return {
//     allData,
//     roles,
//     saveUser,
//   };
// };

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
        await UserService.update(selectedId, payload);
        toast.success("User updated successfully");
      } else {
        await UserService.create(payload);
        toast.success("User created successfully");
      }

      fetchUsers(currentPage);
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // DELETE
  const deleteUser = async (id) => {
    try {
      await UserService.delete(id);
      toast.success("User deleted");
      fetchUsers(currentPage);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return {
    allData,
    roles,
    singleUser,
    saveUser,
    deleteUser,
  };
};
