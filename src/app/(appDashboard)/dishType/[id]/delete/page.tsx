"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DeleteModal } from "@/components";

import { useDeleteDishType } from "@/hooks/api/dishType/useDeleteDishType";

const Page = () => {
  const params: any = useParams();
  const router = useRouter();

  const { mutate, isSuccess } = useDeleteDishType();
  const [openModal, setOpenModal] = useState(true);

  const closeModal = () => {
    setOpenModal(false);
    router.back();
  };

  const handleDelete = () => {
    params?.id && mutate(params?.id);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/dishType");
    }
  }, [isSuccess]);

  return (
    <DeleteModal
      show={openModal}
      onModalClose={closeModal}
      onSubmitHandler={handleDelete}
    />
  );
};

export default Page;
