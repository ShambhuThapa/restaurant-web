"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components";

import { DishTypeForm } from "@/components/forms";

const Page = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(true);

  const closeModal = () => {
    setOpenModal(false);
    router.push("/dishType");
  };

  return (
    <Modal show={openModal} onModalClose={closeModal}>
      <DishTypeForm closeModal={closeModal} />
    </Modal>
  );
};

export default Page;
