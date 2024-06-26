"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DeleteModal } from "@/components";

import { useDeleteLocation } from "@/hooks/api/location/useDeleteLocation";

const Page = () => {
  const params: any = useParams();
  const { mutate, isSuccess } = useDeleteLocation();
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
      router.push("/settings/location");
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
