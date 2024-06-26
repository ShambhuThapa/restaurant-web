"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DeleteModal } from "@/components";

import { useDeleteDish } from "@/hooks/api/dish/useDeleteDish";

const Page = () => {
  const params: any = useParams();
  const { mutate, isSuccess } = useDeleteDish();
  const router = useRouter();
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
      router.push("/dish");
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
