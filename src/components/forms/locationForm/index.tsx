"use client";

import React, { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Divider } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { LocationSchema, Tlocation } from "@/lib/validation/locationSchema";
import { useAddLocation } from "@/hooks/api/location/useAddLocation";
import { useEditLocation } from "@/hooks/api/location/useEditLocation";
import { useGetLocation } from "@/hooks/api/location/useGetLocation";
import { Header } from "@/components/ui/header";
import { Input } from "@/components/ui/input";

interface ILocationForm {
  closeLocationModel: () => void;
}
export const LocationForm = ({ closeLocationModel }: ILocationForm) => {
  const router = useRouter();
  const { id } = useParams();

  const { mutate, isSuccess, isPending: isAddLoading } = useAddLocation();
  const {
    mutate: mutateUpdate,
    isSuccess: isEditSuccess,
    isPending: isEditLoading,
  } = useEditLocation();
  const { data, isSuccess: isDataSucces } = useGetLocation(id as string);

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Tlocation>({
    resolver: zodResolver(LocationSchema),
    mode: "onBlur",
    defaultValues: {
      locationName: "",
      postalCode: "",
      minPrice: "",
      minDeliveryTime: "",
    },
  });

  const isEdit = useMemo(() => Boolean(id), [id]);

  const onSubmit: SubmitHandler<Tlocation> = (data) => {
    if (isEdit) {
      mutateUpdate({
        ...data,
        id: id as string,
        postalCode: parseInt(data.postalCode),
        minPrice: parseInt(data.minPrice),
      });
    } else {
      mutate({
        ...data,
        postalCode: parseInt(data.postalCode),
        minPrice: parseInt(data.minPrice),
      });
    }
  };
  useEffect(() => {
    if (isDataSucces) {
      setValue("locationName", data.locationName);
      setValue("postalCode", String(data.postalCode));
      setValue("minPrice", String(data.minPrice));
      setValue("minDeliveryTime", data.minDeliveryTime);
    }
    !isEdit && reset();
  }, [isDataSucces, data, setValue, isEdit, reset]);

  useEffect(() => {
    if (isSuccess || isEditSuccess) {
      router.push("/settings/location");
    }
    !isEdit && reset();
  }, [isSuccess, isEditSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-3 pt-5 pb-10">
      <Header className="py-0 text-center text-primary">
        {isEdit ? "Edit Location" : "Add Location"}
      </Header>
      <Divider variant="full" className="bg-neutral-200 px-4" />
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 pt-2">
        <Input
          errorClassName="text-red-500"
          label="Location Name"
          name="locationName"
          type="text"
          placeholder="Location Name"
          labelClassName="text-black"
          className="rounded-md"
          register={register}
          error={errors?.locationName?.message}
        />
        <Input
          errorClassName="text-red-500"
          label="Postal Code"
          name="postalCode"
          type="number"
          placeholder="Postal Code"
          labelClassName="text-black"
          className="rounded-md"
          register={register}
          error={errors?.postalCode?.message}
        />
        <Input
          errorClassName="text-red-500"
          label="Minimum Price"
          name="minPrice"
          type="number"
          placeholder="Minimum Price"
          labelClassName="text-black"
          className="rounded-md"
          register={register}
          error={errors?.minPrice?.message}
        />
        <Input
          errorClassName="text-red-500"
          label="Minimum Delivery Time"
          name="minDeliveryTime"
          type="text"
          placeholder="Minimim Delivery Time"
          labelClassName="text-black"
          className="rounded-md"
          register={register}
          error={errors?.minDeliveryTime?.message}
        />
      </div>
      <div className="flex lg:felx-row flex-reverse gap-4 mt-10 ">
        <Button
          label="Cancel"
          variant={"secondary"}
          type="button"
          className="rounded-md"
          onClick={closeLocationModel}
        />
        <Button
          label={isEdit ? "Update" : "Add"}
          className="rounded-md"
          disabled={!isValid || !isDirty}
          isLoading={isAddLoading || isEditLoading}
        />
      </div>
    </form>
  );
};

export default LocationForm;
