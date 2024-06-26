"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DeleteModal } from "@/components";

import { useDeleteBlog } from "@/hooks/api/blog/useDeleteBlog";

const Page = () => {
  const params: any = useParams();
  const { mutate, isSuccess } = useDeleteBlog();
  const router = useRouter();
  const [openModel, setOpenModal] = useState(true);

  const closeModel = () => {
    setOpenModal(false);
    router.back();
  };
  useEffect(() => {
    if (isSuccess) {
      router.push("/allBlogs");
    }
  }, [isSuccess]);
  const handelDelete = () => {
    params?.id && mutate(params?.id);
  };

  return (
    <div>
      <DeleteModal
        show={openModel}
        onModalClose={closeModel}
        onSubmitHandler={handelDelete}
      />
    </div>
  );
};

export default Page;
