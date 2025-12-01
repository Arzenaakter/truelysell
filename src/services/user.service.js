"use client";
import http from "./http";

export const UserService = {
  getAll: (page, pageSize) =>
    http.get(
      `users/getall?PageNumber=${
        page - 1
      }&SearchText=&SortBy=FirstName&SortDirection=asc&PageSize=${pageSize}`
    ),

  getById: (id) => http.get(`users/getuserbyid/${id}`),

  create: (data) => http.post("users/create", data),

  update: (id, data) => http.put(`users/update/${id}`, data),

  delete: (id) => http.delete(`users/delete/${id}`),

  getRoles: () => http.get("dropdown/getroles"),
};
