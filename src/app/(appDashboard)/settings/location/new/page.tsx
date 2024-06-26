"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Modal } from "@/components/ui/modal";
import LocationForm from "@/components/forms/locationForm";

const Page = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(true);

  const closeLocationModal = () => {
    setOpenModal(false);
    router.push("/settings/location");
  };

  return (
    <Modal show={openModal} onModalClose={closeLocationModal}>
      <LocationForm closeLocationModel={closeLocationModal} />
    </Modal>
  );
};

export default Page;
