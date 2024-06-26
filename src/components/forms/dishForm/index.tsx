"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Checkbox, DropDown } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import {
  DishEditSchema,
  DishsSchema,
  TDish,
} from "@/lib/validation/dishSchema";
import { useAddDish } from "@/hooks/api/dish/useAddDish";
import { useEditDish } from "@/hooks/api/dish/useEditDish";
import { useFilterDish } from "@/hooks/api/dish/useGetDish";
import { useFilterAllDishType } from "@/hooks/api/dishType/useGetAllDishType";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { FileInputButton } from "@/components/ui/fileInputButton";
import { Header } from "@/components/ui/header";
import { Input } from "@/components/ui/input";

export const DishsForm = () => {
  const router = useRouter();
  const { id } = useParams();
  const { mutate, isSuccess, isPending: isAddLoading } = useAddDish();
  const { data } = useFilterAllDishType();

  const {
    mutate: mutateUpdate,
    isSuccess: isEditeSuccess,
    isPending: isEditLoading,
  } = useEditDish();

  const { data: dishData, isSuccess: isDataSucces } = useFilterDish(
    id as string
  );

  const isEdit = useMemo(() => Boolean(id), [id]);

  const {
    watch,
    reset,
    setError,
    setValue,
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<TDish>({
    resolver: zodResolver(isEdit ? DishEditSchema : DishsSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
      price: "",
      takeAwayDiscount: "",
      vat: "",
      isSupplement: false,
      takeAway: false,
      eatIn: false,
      available: false,
      deliveryDiscount: "",
      dishTypeId: { label: "", value: "" },
      supplement: [{ value: "" }],
      image: {},
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "supplement",
  });
  const image = watch("image");
  const isSupplement = watch("isSupplement");

  const onSubmit: SubmitHandler<TDish> = (data) => {
    let isValid = true;
    if (data?.isSupplement) {
      data.supplement?.forEach((el, ind) => {
        !el.value &&
          setError(`supplement`, {
            message: "Field should not be empty.",
          });
        !el.value && (isValid = false);
        return;
      });
    }

    const filterSupplement = data?.supplement?.map((el) => el.value);
    if (isEdit) {
      isValid &&
        data?.image?.length &&
        mutateUpdate({
          ...data,
          id: id as string,
          price: parseFloat(data.price),
          supplement: filterSupplement,
          takeAwayDiscount: parseInt(data.takeAwayDiscount),
          vat: parseInt(data.vat),
          deliveryDiscount: parseInt(data.deliveryDiscount),
          dishTypeId: data.dishTypeId.value,
          image: data?.image[0],
        });

      isValid &&
        !data?.image?.length &&
        mutateUpdate({
          ...data,
          id: id as string,
          price: parseFloat(data.price),
          supplement: filterSupplement,
          takeAwayDiscount: parseInt(data.takeAwayDiscount),
          vat: parseInt(data.vat),
          deliveryDiscount: parseInt(data.deliveryDiscount),
          dishTypeId: data.dishTypeId.value,
        });
    } else {
      isValid &&
        mutate({
          ...data,
          price: parseFloat(data.price),
          supplement: filterSupplement,
          takeAwayDiscount: parseInt(data.takeAwayDiscount),
          vat: parseInt(data.vat),
          deliveryDiscount: parseInt(data.deliveryDiscount),
          dishTypeId: data.dishTypeId.value,
          image: data?.image[0],
        });
    }
  };
  const goBack = () => {
    router.push("/dish");
  };

  useEffect(() => {
    if (isDataSucces && dishData) {
      Object.entries(dishData).forEach(([key, value]) => {
        setValue(key as any, value);
      });
      setValue(
        "dishTypeId",
        data?.find((el: any) => el.value === dishData.dishTypeId)
      );
    }
  }, [isDataSucces, dishData, data, setValue]);

  useEffect(() => {
    if (isSuccess || isEditeSuccess) {
      goBack();
    }
    !isEdit && reset();
  }, [isSuccess, isEditeSuccess, isEdit]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header className="py-0 text-center text-primary">
          {isEdit ? "Edit Dish" : "Add Dish"}
        </Header>
        <Divider variant="full" className="bg-neutral-200 px-4" />
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 pt-2">
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
          <DropDown
            name="dishTypeId"
            labelClass="text-black"
            control={control}
            label="Dish Type"
            options={data}
            placeholder="Select Dish Type"
            className="rounded-md"
          />
          <Input
            errorClassName="text-red-500"
            label="Description"
            name="description"
            type="text"
            placeholder="Description"
            labelClassName="text-black"
            className="rounded-md"
            register={register}
            error={errors?.description?.message}
          />
          <Input
            errorClassName="text-red-500"
            label="Price"
            name="price"
            type="number"
            placeholder="Price"
            labelClassName="text-black"
            className="rounded-md"
            register={register}
            step=".01"
            error={errors?.price?.message}
          />
          <Input
            errorClassName="text-red-500"
            label="Take Away Discunt "
            name="takeAwayDiscount"
            type="number"
            placeholder="Take away discount in percentage"
            labelClassName="text-black"
            className="rounded-md"
            register={register}
            error={errors?.price?.message}
          />

          <Input
            errorClassName="text-red-500"
            label="Delivery Discount"
            name="deliveryDiscount"
            type="number"
            placeholder="Delivery discount in percentage"
            labelClassName="text-black"
            className="rounded-md"
            register={register}
            error={errors?.deliveryDiscount?.message}
          />
          <Input
            errorClassName="text-red-500"
            label="Vat"
            name="vat"
            type="number"
            placeholder="Vat in percentage"
            labelClassName="text-black"
            className="rounded-md"
            register={register}
            error={errors?.vat?.message}
          />
        </div>
        <div className="grid items-center justify-items-center sm:grid-cols-2 grid-cols-1 gap-4 pt-2">
          <div className="flex flex-col gap-y-2 w-full">
            <FileInputButton
              register={register}
              name="image"
              btnLabel={"Image"}
              error={(errors as any)?.image?.message}
            />
            <p className="pt-1 text-gray-700">
              Note: Use image of 640×1136 resoultion for better view
            </p>
          </div>

          {image && image[0] && (
            <Image
              src={
                typeof image[0] == "object"
                  ? URL.createObjectURL(image[0])
                  : image
              }
              height={250}
              width={250}
              alt="gvy"
              className="rounded"
            />
          )}
        </div>
        <Divider variant="full" className="bg-neutral-200 px-4 mt-8" />
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <Checkbox
            errorClassName="text-red-500"
            label="Supplement"
            name="isSupplement"
            type="checkbox"
            labelClassName="text-black"
            className="rounded-md h-5 w-5"
            register={register}
          />
          <Checkbox
            errorClassName="text-red-500"
            label="Take A way"
            name="takeAway"
            type="checkbox"
            labelClassName="text-black"
            className="rounded-md h-5 w-5"
            register={register}
          />
          <Checkbox
            errorClassName="text-red-500"
            label="Eat IN"
            name="eatIn"
            type="checkbox"
            labelClassName="text-black"
            className="rounded-md h-5 w-5"
            register={register}
          />
          <Checkbox
            errorClassName="text-red-500"
            label="Available"
            name="available"
            type="checkbox"
            labelClassName="text-black"
            className="rounded-md h-5 w-5"
            register={register}
          />
        </div>

        <Divider variant="full" className="bg-neutral-200 px-4" />
        {isSupplement &&
          fields.map((field, index) => {
            return (
              <div
                className="flex gap-x-4 my-3 justify-center items-end"
                key={field.id}
              >
                <Input
                  errorClassName="text-red-500"
                  label="Supplement"
                  name={`supplement.${index}.value`}
                  placeholder="Supplement"
                  labelClassName="text-black"
                  className="rounded-md"
                  register={register}
                />
                <PlusIcon
                  onClick={() =>
                    watch(`supplement.${index}.value`) && append({ value: "" })
                  }
                  size={35}
                  className="text-green-500 rounded-md hover:shadow-md  border  hover:border-gray-300 cursor-pointer"
                />
                {fields?.length > 1 && (
                  <Trash2Icon
                    onClick={() => remove(index)}
                    size={35}
                    className="text-red-500 rounded-md  border hover:shadow-md hover:border-gray-300 cursor-pointer "
                  />
                )}
              </div>
            );
          })}
        <p className="text-red-500 text-base">{errors?.supplement?.message}</p>

        <div className="flex lg:flex-row flex-col-reverse gap-4 mt-10">
          <Button
            label="Cancel"
            variant={"secondary"}
            type="button"
            className="rounded-md"
            onClick={goBack}
          />
          <Button
            className="rounded-md"
            // disabled={!isValid || !isDirty}
            isLoading={isAddLoading || isEditLoading}
            label={isEdit ? "Update" : "Add"}
          />
        </div>
      </form>
    </>
  );
};
