"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Button, Divider, Header, Input } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { PopsUp, PopsUpEdit, TPopUP } from "@/lib/validation/popUp";
import { useAddPopUp } from "@/hooks/api/popUp/useAddPopUp";
import { useEditPopup } from "@/hooks/api/popUp/useEditPopup";
import { useGetAllPopUp } from "@/hooks/api/popUp/useGetAllPopUp";
import { FileInputButton } from "@/components/ui/fileInputButton";

interface IPopupFrom {
  closePopupModel: () => void;
}

const PopUpForm = ({ closePopupModel }: IPopupFrom) => {
  const router = useRouter();
  const { id } = useParams();
  const { mutate, isSuccess, isPending: isAddLoading } = useAddPopUp();
  const {
    mutate: mutateUpdate,
    isSuccess: isEditSuccess,
    isPending: isEditLoading,
  } = useEditPopup();
  const { data, isSuccess: isDataSucces } = useGetAllPopUp();

  const isEdit = useMemo(() => Boolean(id), [id]);

  const {
    setValue,
    reset,
    watch,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<TPopUP>({
    resolver: zodResolver(isEdit ? PopsUpEdit : PopsUp),
    mode: "onBlur",
    defaultValues: {
      mobileViewImage: {},
      webViewImage: {},
    },
  });
  const webViewImage = watch("webViewImage");
  const mobileViewImage = watch("mobileViewImage");
  const onSubmit: SubmitHandler<TPopUP> = (data) => {
    if (isEdit) {
      mutateUpdate({
        ...data,
        mobileViewImage: data?.mobileViewImage[0],
        webViewImage: data?.webViewImage[0],
        id: id as string,
      });
    } else {
      mutate({
        ...data,
        mobileViewImage: data?.mobileViewImage[0],
        webViewImage: data?.webViewImage[0],
      });
    }
  };
  const goBack = () => {
    router.push("/settings/popup");
  };
  useEffect(() => {
    if (isSuccess || isEditSuccess) {
      goBack();
    }
  }, [isSuccess, isEditSuccess]);

  useEffect(() => {
    if (isDataSucces) {
      setValue("mobileViewImage", data?.mobileViewImageUrl);
      setValue("webViewImage", data?.webViewImageUrl);
    }
    !isEdit && reset();
  }, [isDataSucces, data, setValue, isEdit, reset]);


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="px-3 pt-5 pb-10">
        <Header className="py-0 text-center text-primary">
          {isEdit ? "Edit Popup" : "Add Popup"}
        </Header>
        <Divider variant="full" className="br-neutral-200 px-4" />
        <div className="grid sm-grid-cols-2 grid-cols-1 gap-4 pt-2 mb-2">
          <div className="grid items-center justify-items-center sm:grid-cols-2 grid-cols-1 gap-4 pt-2">
            <div className="w-full">
              <FileInputButton
                register={register}
                name="mobileViewImage"
                btnLabel={"Mobile Image"}
                error={(errors as any)?.mobileViewImage?.message}
              />
              <p className="py-2 text-gray-800">
                Use image of resolution 768x1009
              </p>
            </div>

            {mobileViewImage && mobileViewImage[0] && (
              <Image
                src={
                  typeof mobileViewImage[0] == "object"
                    ? URL.createObjectURL(mobileViewImage[0])
                    : mobileViewImage
                }
                height={250}
                width={250}
                alt="mobileViewImage"
                className="rounded"
              />
            )}
          </div>

          <div className="grid items-center justify-items-center sm:grid-cols-2 grid-cols-1 gap-4 pt-2">
            <div className="w-full">
              <FileInputButton
                register={register}
                name="webViewImage"
                btnLabel={"Web Image"}
                error={(errors as any)?.webViewImage?.message}
              />
              <p className="py-2 text-gray-800">
                Use image of resolution 1920x1080
              </p>
            </div>

            {webViewImage && webViewImage[0] && (
              <Image
                src={
                  typeof webViewImage[0] == "object"
                    ? URL.createObjectURL(webViewImage[0])
                    : webViewImage
                }
                height={250}
                width={250}
                alt="webViewImage"
                className="rounded"
              />
            )}
          </div>
          {/* <Input
            errorClassName="text-red-500"
            label="Header Content"
            name="headerContent"
            type="text"
            placeholder="Header Content"
            labelClassName="text-black"
            className="rounded-md"
            register={register}
            error={errors?.headerContent?.message}
          /> */}
        </div>
        <div className="flex lg:flex-row flex-col-reverse gap-4 mt-5">
          <Button
            type="button"
            label="Cancel"
            variant={"secondary"}
            className="rounded-md"
            onClick={closePopupModel}
          />
          <Button
            label={isEdit ? "Update" : "Add"}
            // disabled={!isValid || !isDirty}
            isLoading={isAddLoading || isEditLoading}
            className="rounded-md"
          />
        </div>
      </form>
    </>
  );
};

export default PopUpForm;
