"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  DropDown,
  Input,
  Modal,
  TextArea,
} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { XCircle } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { contactSchema, IContact } from "@/lib/validation/contactSchema";
import { useAddContactMessage } from "@/hooks/api/contactMessage/useAddContactMessage";
import  PrivacyPolicy  from "@/app/privacyPolicy/page";


export const ContactForm = () => {
  const [isPolicy, setPolicy] = useState(false);
  const { mutate, isSuccess, isPending: isAddLoading } = useAddContactMessage();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm<IContact>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      message: "",
      policy: false,
    },
  });

  const onSubmit: SubmitHandler<IContact> = (data) => {
    if (data.policy == false) {
      setError("policy", { message: "please read and accept privacy policy" });
      return;
    }
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8 lg:px-12 px-3 lg:order-1 order-2">
          <Input
            label="Name"
            className="text-dark"
            placeholder="Name"
            name="name"
            type="text"
            register={register}
            error={errors?.name?.message as string}
          />
          <Input
            label="Email"
            name="email"
            placeholder="Email"
            className="text-dark"
            type="text"
            register={register}
            error={errors?.email?.message as string}
          />
          <TextArea
            label="Message"
            name="message"
            errorClassName=""
            placeholder="Enter Message"
            rows={5}
            className="text-dark"
            register={register}
            error={errors?.message?.message as string}
          />
          <Checkbox
          register={register}
          leftLabel="I have read the "
          rightLabel=" and agree to it."
          linkLabel={"privacy policy"}
          linkClick={() => setPolicy(true)}
          name="policy"
          error={errors?.policy?.message as string}/>

          <div className="pt-4 w-[12rem]">
            <Button
              label="SEND"
              type="submit"
              disabled={!isValid || !isDirty}
              isLoading={isAddLoading}
              variant={"secondary"}
              className="bg-white text-black py-6 px-10"
            />
          </div>
        </div>
      </form>
      <Modal
        show={isPolicy}
        onModalClose={() => setPolicy(false)}
        className="sm:max-w-6xl"
      >
        <XCircle
          className="text-primary absolute lg:right-5 right-[2px] lg:top-5 top-1 cursor-pointer"
          size={40}
          onClick={() => setPolicy(false)}
        />
        <PrivacyPolicy />
      </Modal>
    </>
  );
};
