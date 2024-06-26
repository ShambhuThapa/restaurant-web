"use client";

import React, { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Divider, Header, Input, TextArea } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { DishTypeSchema, TDishType } from "@/lib/validation/dishTypeSchema";
import { useAddDishType } from "@/hooks/api/dishType/useAddDishType";
import { useEditDishType } from "@/hooks/api/dishType/useEditDishType";
import { useGetDishType } from "@/hooks/api/dishType/useGetDishType";

interface IDishTypeForm {
  closeModal: () => void;
}

export const DishTypeForm = ({ closeModal }: IDishTypeForm) => {
  const router = useRouter();
  const { id } = useParams();

  const { mutate, isSuccess, isPending: isAddLoading } = useAddDishType();
  const {
    mutate: mutateUpdate,
    isSuccess: isEditeSuccess,
    isPending: isEditLoading,
  } = useEditDishType();

  const { data, isSuccess: isDataSucces } = useGetDishType(id as string);

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<TDishType>({
    resolver: zodResolver(DishTypeSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const isEdit = useMemo(() => Boolean(id), [id]);

  const onSubmit: SubmitHandler<TDishType> = (data) => {
    if (isEdit) {
      mutateUpdate({ ...data, id: id as string });
    } else {
      mutate(data);
    }
  };

  useEffect(() => {
    if (isSuccess || isEditeSuccess) {
      router.push("/dishType");
    }
  }, [isSuccess, isEditeSuccess]);

  useEffect(() => {
    if (isDataSucces) {
      setValue("name", data.name);
      setValue("description", data.description);
    }
    !isEdit && reset();
  }, [isDataSucces, data, setValue, isEdit, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="px-3 pt-5 pb-10">
        <Header className="py-0 text-center text-primary">
          {isEdit ? "Edit Dish Type" : "Add Dish Type"}
        </Header>
        <Divider variant="full" className="bg-neutral-200 px-4" />
        <div className=" flex flex-col gap-y-4 pt-2">
          <Input
            errorClassName="text-red-500"
            label="Name"
            name="name"
            type="text"
            placeholder="Dish Name"
            labelClassName="text-black"
            className="rounded-md"
            register={register}
            error={errors?.name?.message}
          />
          <TextArea
            label="Discription"
            name="description"
            rows={4}
            labelClassName="text-black"
            className=" rounded-md "
            placeholder="Message..."
            register={register}
            errorClassName="text-red-500"
          />
          <div className=" flex lg:flex-row flex-col-reverse  gap-4 mt-5 ">
            <Button
              type="button"
              label="Cancel"
              variant={"secondary"}
              className="rounded-md "
              onClick={closeModal}
            />
            <Button
              label={isEdit ? "Update" : "Add"}
              disabled={!isValid || !isDirty}
              isLoading={isAddLoading || isEditLoading}
              type="submit"
              className=" rounded-md "
            />
          </div>
        </div>
      </form>
    </>
  );
};
