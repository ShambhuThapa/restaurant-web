"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, ErrorMessage, Header, Input } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, MailIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { LogInSchema, TLogin } from "@/lib/validation/logInSchema";
import { useLogin } from "@/hooks/api/dishType/useLogin";
import { useAuth } from "@/hooks/useAuth";
import { poppins } from "@/app/layout";

export const LogInForm = () => {
  const router = useRouter();
  const { mutate, error, isSuccess, isPending } = useLogin();
  const { checkToken, isLoggedIn } = useAuth();

  const [togglePassword, setTogglePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<TLogin>({
    resolver: zodResolver(LogInSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<TLogin> = (data) => {
    mutate(data);
  };

  const renderLeftIcon = () => {
    if (togglePassword) {
      return (
        <EyeIcon
          onClick={() => {
            setTogglePassword(!togglePassword);
          }}
          className="cursor-pointer"
        />
      );
    }
    return (
      <EyeOffIcon
        onClick={() => {
          setTogglePassword(!togglePassword);
        }}
      />
    );
  };

  useEffect(() => {
    if (isSuccess) {
      checkToken();
    }
    if (localStorage.getItem("token")) {
      router.replace("/dashboard");
    }
  }, [isSuccess]);

  if (isLoggedIn) {
    router.replace("/dashboard");
    return;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(poppins.variable, "font-mono")}
    >
      <div className="flex justify-center items-center bg-white h-screen ">
        <div className="flex flex-col  gap-y-5    lg:w-[450px] h-auto w-[90vw]  rounded-lg border border-gray-100 shadow-xl px-6 py-3  ">
          <div className=" flex flex-col gap-y-3  items-center ">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="h-24 w-28  item-center"
            />

            <Header className=" text-gray-800 py-1 normal-case	">Login</Header>
          </div>

          <Input
            placeholder="Email"
            className="rounded-sm"
            type="email"
            name="email"
            labelClassName="text-dark"
            label={"Email"}
            register={register}
            errorClassName="text-red-500"
            error={errors?.email?.message}
            leftIcon={<MailIcon />}
          />

          <Input
            placeholder="Password"
            className="w-full mr-6 rounded-sm"
            type={togglePassword ? "text" : "password"}
            name="password"
            labelClassName="text-dark"
            label={"password"}
            register={register}
            errorClassName="text-red-500"
            error={errors?.password?.message}
            leftIcon={renderLeftIcon()}
          />

          <ErrorMessage>{error?.message}</ErrorMessage>

          <Button
            label="Login"
            disabled={!isValid || !isDirty}
            isLoading={isPending}
            className=" mt-4 mb-6"
          />
        </div>
      </div>
    </form>
  );
};
