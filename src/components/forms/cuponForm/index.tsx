"use client";

import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { coupanSchema, Tcoupan } from "@/lib/validation/coupanSchema";
import { useAddCoupan } from "@/hooks/api/coupan/useAddCoupan";
import { useEditCoupon } from "@/hooks/api/coupan/useEditCoupan";
import { useGetAllCoupon } from "@/hooks/api/coupan/useGetAllCoupan";
import { Button, Divider, Header, Input } from "@/components/index";

interface Icoupan {
  closeModal: () => void;
}

export const CouponForm = ({ closeModal }: Icoupan) => {
  const router = useRouter();
  const { id } = useParams();

  const { mutate, isSuccess, isPending: isAddLoading } = useAddCoupan();
  const {
    mutate: mutateUpdate,
    isSuccess: isEditSuccess,
    isPending: isEditLoading,
  } = useEditCoupon();
  const { data, isSuccess: isDataSucces } = useGetAllCoupon();

  const {
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Tcoupan>({
    resolver: zodResolver(coupanSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      discount: "",
    },
  });
  const isEdit = useMemo(() => Boolean(id), [id]);

  const onSubmit: SubmitHandler<Tcoupan> = (data) => {
    if (isEdit) {
      mutateUpdate({
        ...data,
        discount: parseInt(data.discount),
        id: id as string,
      });
    } else {
      mutate({ ...data, discount: parseInt(data.discount) });
    }
  };
  const goBack = () => {
    router.push("/settings/coupon");
  };

  useEffect(() => {
    if (isSuccess || isEditSuccess) {
      goBack();
    }
  }, [isSuccess, isEditSuccess]);

  useEffect(() => {
    if (isDataSucces) {
      setValue("name", data?.name);
      setValue("discount", String(data?.discount));
    }
    !isEdit && reset();
  }, [isDataSucces, data, setValue, isEdit, reset]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="px-3 pt-5 pb-10">
        <Header className="py-0 text-center text-primary">
          {isEdit ? "Edit Discount Coupon" : "Add Discount Coupon"}
        </Header>
        <Divider variant="full" className="bg-neutral-200 px-4" />

        <div className="flex flex-col gap-y-4 pt-2">
          <Input
            name="name"
            label="Name"
            type="text"
            register={register}
            placeholder="Name"
            labelClassName="text-balck"
            errorClassName="text-red-500"
            error={errors?.name?.message}
          />
          <Input
            name="discount"
            label="Discount"
            type="number"
            register={register}
            placeholder="Discount"
            labelClassName="text-balck"
            errorClassName="text-red-500"
            error={errors?.discount?.message}
          />
          <div className="flex lg:flex-row flex-col-reverse gap-4 mt-5">
            <Button
              type="button"
              label="Cancel"
              variant={"secondary"}
              className="rounded-md"
              onClick={closeModal}
            />
            <Button
              label={isEdit ? "Update" : "Add"}
              disabled={!isValid || !isDirty}
              isLoading={isAddLoading || isEditLoading}
              className="rounded-md"
            />
          </div>
        </div>
      </form>
    </>
  );
};
