"use client";
import { useAppContext } from "@/context/AppContext";
import React, { use, useEffect, useState } from "react";

const BlogViewPage = ({ searchParams }) => {
  const { id } = use(searchParams);
  const { loading, setLoading } = useAppContext();
  const [blogData, setBlogData] = useState(null);
  const getSingleBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}blog/getblogbyid/${id}`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.ok) {
        const { data } = await response.json();
        console.log("blog data", data);
        setBlogData(data);
        setLoading(false);
      } else {
        const errorData = await response.json();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getSingleBlogs();
    }
  }, [id]);
  return <div>blog id: {id}</div>;
};

export default BlogViewPage;
