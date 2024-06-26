"use client";

import { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { Button, Divider, Header, Input, TextArea } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  TwebSiteInfo,
  WebSiteInfoSchema,
} from "@/lib/validation/webSiteinfoSchema";
import { useEditWebSiteInfo } from "@/hooks/api/webSiteInfo/useEditwebSiteinfo";
import {
  useFilterWebSiteInfo,
  useGetWebSiteInfo,
} from "@/hooks/api/webSiteInfo/useGetWebSiteInfo";

const WebSiteInfoForm = () => {
  const { id } = useParams();
  const { mutate, isSuccess } = useEditWebSiteInfo();
  const { data, isSuccess: isDataSucess } = useFilterWebSiteInfo();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TwebSiteInfo>({
    resolver: zodResolver(WebSiteInfoSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      timeZone: "",
      houseNumber: "",
      postalCode: "",
      city: "",
      street: "",
      address: "",
      description: "",
      facebook: "",
      youtube: "",
      instagram: "",
      pinterest: "",
      twitter: "",
    },
  });
  const onSubmit: SubmitHandler<TwebSiteInfo> = (data) => {
    mutate({
      ...data,
      houseNumber: parseInt(data.houseNumber),
      postalCode: parseInt(data?.postalCode),
      social: {
        facebook: data?.facebook,
        youtube: data?.youtube,
        instagram: data?.instagram,
        pinterest: data?.pinterest,
        twitter: data?.twitter,
      },
    });
  };
  useEffect(() => {
    if (isDataSucess && data) {
      Object.entries(data).forEach(([key, value]) => {
        setValue(key as any, value);
      });
    }
  }, [setValue, data, isDataSucess]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-3 pt-5 pb-10 ">
      <Header className="py-0 text-ceneter text-primary">Web Site Info Form</Header>
      <Divider variant="full" className="bg-neutral-200 px-4" />
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 pt-2">
        <Input
          errorClassName="text-red-500"
          label="Name"
          name="name"
          type="text"
          placeholder="Name"
          labelClassName="text-black"
          className="rounded-md"
          register={register}
          error={errors?.name?.message}
        />
        <Input
          register={register}
          errorClassName="text-red-500"
          label={"Email"}
          name="email"
          type="email"
          placeholder="Email"
          labelClassName="text-black"
          className="rounded-md"
          error={errors?.email?.message}
        />
        <TextArea
          register={register}
          errorClassName="text-red-500"
          label={"Description"}
          rows={10}
          name="description"
          placeholder="Description"
          labelClassName="text-black"
          className="rounded-md"
          error={errors?.description?.message}
        />
        <Input
          register={register}
          errorClassName="text-red-500"
          label={"City"}
          name="city"
          type="text"
          placeholder="City"
          labelClassName="text-black"
          className="rounded-md"
          error={errors?.city?.message}
        />

        <Input
          register={register}
          errorClassName="text-red-500"
          label={"Street"}
          name="street"
          type="text"
          placeholder="Street"
          labelClassName="text-black"
          className="rounded-md"
          error={errors?.street?.message}
        />
        <Input
          register={register}
          errorClassName="text-red-500"
          label={"Postal Code"}
          name="postalCode"
          type="number"
          placeholder="Postal Code"
          labelClassName="text-black"
          className="rounded-md"
          error={errors?.postalCode?.message}
        />
        <Input
          register={register}
          errorClassName="text-red-500"
          label={"House Number"}
          name="houseNumber"
          type="number"
          placeholder="House Number"
          labelClassName="text-black"
          className="rounded-md"
          error={errors?.houseNumber?.message}
        />
        <Input
          register={register}
          errorClassName="text-red-500"
          label={"Address"}
          name="address"
          type="text"
          placeholder="Address"
          labelClassName="text-black"
          className="rounded-md"
          error={errors?.address?.message}
        />
        <Input
          register={register}
          errorClassName="text-red-500"
          label={"Time Zone"}
          name="timeZone"
          type="text"
          placeholder="Time Zone"
          labelClassName="text-black"
          className="rounded-md"
          error={errors?.timeZone?.message}
        />
      </div>
      <Header className="py-0 text-ceneter mt-8">Social</Header>
      <Divider variant="full" className="bg-neutral-200 px-4" />
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 pt-2">
        <Input
          register={register}
          errorClassName="text-red-500"
          label={"Facebook"}
          name="facebook"
          type="text"
          placeholder="Facebook"
          labelClassName="text-black"
          className="rounded-md"
          error={errors?.facebook?.message}
        />
        <Input
          register={register}
          errorClassName="text-red-500"
          label={"Youtube"}
          name="youtube"
          type="text"
          placeholder="Youtube"
          labelClassName="text-black"
          className="rounded-md"
          error={errors?.youtube?.message}
        />
        <Input
          register={register}
          errorClassName="text-red-500"
          label={"Instagram"}
          name="instagram"
          type="text"
          placeholder="Instagram"
          labelClassName="text-black"
          className="rounded-md"
          error={errors?.instagram?.message}
        />
        <Input
          register={register}
          errorClassName="text-red-500"
          label={"Pinterest"}
          name="pinterest"
          type="text"
          placeholder="Pinterest"
          labelClassName="text-black"
          className="rounded-md"
          error={errors?.pinterest?.message}
        />
        <Input
          register={register}
          errorClassName="text-red-500"
          label={"Twitter"}
          name="twitter"
          type="text"
          placeholder="Twitter"
          labelClassName="text-black"
          className="rounded-md"
          error={errors?.twitter?.message}
        />
      </div>

      <div className="flex lg:felx-row flex-reverse gap-4 mt-10">
        <Button
          label="Cancel"
          variant={"secondary"}
          type="button"
          className="rounded-md"
        />
        <Button label="Update" className="rounded-md" />
      </div>
    </form>
  );
};

export default WebSiteInfoForm;
