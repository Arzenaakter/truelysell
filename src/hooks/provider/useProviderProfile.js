"use client";
import { useEffect } from "react";

export const useProviderProfile = () => {
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
  return {};
};
