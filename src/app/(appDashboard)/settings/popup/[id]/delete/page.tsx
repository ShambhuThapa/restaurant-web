"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DeleteModal } from "@/components";

import { useDeletePopup } from "@/hooks/api/popUp/useDeletePopup";

const Page = () => {
  const params: any = useParams();
  const router = useRouter();
  const { mutate, isSuccess } = useDeletePopup();

  const [openModal, setOpenModal] = useState(true);

  const closePopupModal = () => {
    setOpenModal(false);
    router.push("/settings/popup");
  };

  const handleDelete = () => {
    params?.id && mutate(params?.id);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/settings/popup");
    }
  }, [isSuccess]);
  return (
    <DeleteModal
      show={openModal}
      onModalClose={closePopupModal}
      onSubmitHandler={handleDelete}
    />
  );
};

export default Page;
