"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components";

import { CouponForm } from "@/components/forms/cuponForm";

const Page = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(true);

  const closeModal = () => {
    setOpenModal(false);
    router.push("/settings/coupon");
  };
  return (
    <>
      <Modal show={openModal} onModalClose={closeModal}>
        <CouponForm closeModal={closeModal} />
      </Modal>
    </>
  );
};
export default Page;
