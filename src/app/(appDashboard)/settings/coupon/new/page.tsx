"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Modal } from "@/components/ui/modal";
import { CouponForm } from "@/components/forms/cuponForm";

const Page = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(true);

  const closeModel = () => {
    setOpenModal(false);
    router.push("/settings/coupon");
  };

  return (
    <Modal show={openModal} onModalClose={closeModel}>
      <CouponForm closeModal={closeModel} />
    </Modal>
  );
};

export default Page;
