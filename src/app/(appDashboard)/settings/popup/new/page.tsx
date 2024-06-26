"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components";

import PopUpForm from "@/components/forms/popup";

const Page = () => {
  const router = useRouter();

  const [openModal, setOpenModal] = useState(true);

  const closeModal = () => {
    setOpenModal(false);
    router.push("/settings/popup");
  };

  return (
    <Modal show={openModal} onModalClose={closeModal}>
      <PopUpForm closePopupModel={closeModal} />
    </Modal>
  );
};

export default Page;
