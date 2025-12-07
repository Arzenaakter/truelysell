"use client";

const baseAdminURL = process.env.NEXT_PUBLIC_API_ADMIN_URL;
const baseProviderURL = process.env.NEXT_PUBLIC_API_PROVIDER_URL;
const baseCustomerURL = process.env.NEXT_PUBLIC_API_CUSTOMER_URL;
const basePublicURL = process.env.NEXT_PUBLIC_API_AUTH_URL;

const getBaseURL = () => {
  const role = localStorage.getItem("userRole");

  if (role === "Admin") return baseAdminURL;
  if (role === "Provider") return baseProviderURL;
  if (role === "Customer") return baseCustomerURL;

  return basePublicURL;
};

const request = async (url, method = "GET", body = null) => {
  const token = localStorage.getItem("user");

  const isFormData = body instanceof FormData;

  const options = {
    method,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",

      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
    body: isFormData ? body : body ? JSON.stringify(body) : null,
  };

  const response = await fetch(getBaseURL() + url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "Something went wrong");
  }

  return data;
};

export const apiService = {
  get: (url) => request(url, "GET"),
  post: (url, data) => request(url, "POST", data),
  put: (url, data) => request(url, "PUT", data),
  delete: (url) => request(url, "DELETE"),
};
