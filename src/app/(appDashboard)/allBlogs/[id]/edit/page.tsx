"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { BlogForm } from "@/components/forms";

const Page = () => {
  const router = useRouter();

  const closeModal = () => {
    router.push("/allBlogs");
  };

  return <BlogForm closeModal={closeModal} />;
};

export default Page;
