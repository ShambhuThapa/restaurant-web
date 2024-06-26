"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DeleteModal } from "@/components";

import { useDeleteCoupon } from "@/hooks/api/coupan/useDeleteCoupon";

const Page = () => {
  const [openModal, setOpenModal] = useState(true);
  const params: any = useParams();
  const router = useRouter();
  const { mutate, isSuccess } = useDeleteCoupon();

  const handelDelete = () => {
    params?.id && mutate(params?.id);
  };
  const closeCoupanModel = () => {
    setOpenModal(false);
    router.push("/settings/coupon");
  };
  useEffect(() => {
    if (isSuccess) {
      router.push("/settings/coupon");
    }
  }, [isSuccess]);

  return (
    <>
      <DeleteModal
        onSubmitHandler={handelDelete}
        show={openModal}
        onModalClose={closeCoupanModel}
      />
    </>
  );
};
export default Page;
