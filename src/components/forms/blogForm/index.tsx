"use client";

import { register } from "module";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Button, Divider, Header, Input, TextArea } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  blogFormSchema,
  blogFormSchemaEdit,
  TBlogFormType,
} from "@/lib/validation/blogFormSchema";
import { useAddBlog } from "@/hooks/api/blog/useAddBlog";
import { useEditBlog } from "@/hooks/api/blog/useEditBlog";
import { useGetBlogs } from "@/hooks/api/blog/useGetBlog";
import { FileInputButton } from "@/components/ui/fileInputButton";

interface IBlogForm {
  closeModal: () => void;
}

export const BlogForm = ({ closeModal }: IBlogForm) => {
  const router = useRouter();
  const { id } = useParams();

  const { mutate, isSuccess, isPending: isAddLoading } = useAddBlog();

  const {
    mutate: mutationUpdate,
    isSuccess: isEditSuccess,
    isPending: isEditLoading,
  } = useEditBlog();

  const { data, isSuccess: isDataSuccess } = useGetBlogs(id as string);

  const isEdit = useMemo(() => Boolean(id), [id]);

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<TBlogFormType>({
    resolver: zodResolver(!isEdit ? blogFormSchema : blogFormSchemaEdit),
    mode: "onBlur",
    defaultValues: {
      title: "",
      image: {},
      body: "",
    },
  });

  const image = watch("image");

  useEffect(() => {
    if (isSuccess || isEditSuccess) {
      goBack();
    }
  }, [isSuccess, isEditSuccess]);

  useEffect(() => {
    if (isDataSuccess) {
      setValue("title", data.title),
        setValue("image", data.imageUrl),
        setValue("body", data.body);
    }
    !isEdit && reset();
  }, [isDataSuccess, isEdit, setValue, reset]);

  const onSubmit: SubmitHandler<TBlogFormType> = (data: any) => {
    if (isEdit) {
      mutationUpdate({ ...data, image: data?.image[0], id: id as string });
      return;
    }

    mutate({ ...data, image: data?.image[0] });
  };
  const goBack = () => {
    router.push("/allBlogs");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header className="py-0 text-center  text-primary">
          {isEdit ? "Edit Blog" : "Add Blog"}
        </Header>
        <Divider variant="full" className="bg-neutral-200 px-4" />
        <div className=" flex flex-col gap-y-4 pt-2 ">
          <div className="grid items-center justify-items-center sm:grid-cols-2 grid-cols-1 gap-4 pt-2">
            <FileInputButton
              register={register}
              name="image"
              btnLabel={"Image"}
              error={(errors as any)?.image?.message}
            />

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
          <Input
            label="Title"
            labelClassName="text-black"
            name="title"
            type="text"
            placeholder="Title"
            className="rounded-md"
            register={register}
            error={errors?.title?.message}
            errorClassName="text-red-500"
          />

          <TextArea
            label="Body"
            name="body"
            rows={12}
            labelClassName="text-black"
            className=" rounded-md "
            placeholder="Message..."
            register={register}
            error={errors?.body?.message}
            errorClassName="text-red-500"
          />
          <div className=" flex lg:flex-row flex-col-reverse  gap-4 mt-5 py-6 ">
            <Button
              type="button"
              label="Cancel"
              variant={"secondary"}
              className="rounded-md "
              onClick={closeModal}
            />
            <Button
              label={isEdit ? "Update" : "Add"}
              type="submit"
              // disabled={!isValid || !isDirty}
              isLoading={isAddLoading || isEditLoading}
              className=" rounded-md "
            />
          </div>
        </div>
      </form>
    </>
  );
};
