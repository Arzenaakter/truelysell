"use client";
const baseURL = process.env.NEXT_PUBLIC_API_ADMIN_URL;

async function request(url, method = "GET", body) {
  const token = localStorage.getItem("user");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (body) options.body = JSON.stringify(body);

  const res = await fetch(baseURL + url, options);
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "An error occurred");
  return data;
}

export default {
  get: (url) => request(url, "GET"),
  post: (url, body) => request(url, "POST", body),
  put: (url, body) => request(url, "PUT", body),
  delete: (url) => request(url, "DELETE"),
};
