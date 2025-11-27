"use client";
import HeadingSection from "@/components/shared/HeadingSection";
import BlogDetails from "@/components/shared/BlogDetails";
import React, { use } from "react";

const BlogDetailsPage = ({ searchParams }) => {
  const { id } = use(searchParams);
  return (
    <>
      <HeadingSection PageName="Blog Details" />
      <div className="container px-6 lg:px-10 mx-auto py-10">
        <BlogDetails id={id} />
      </div>
    </>
  );
};

export default BlogDetailsPage;
