"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  ErrorMessage,
  Header,
  Input,
  TextArea,
} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { reviewSchema, TReview } from "@/lib/validation/reviewschama";
import { useAddReview } from "@/hooks/api/Review/useAddReview";

interface IReview {
  onSubmitSuccess: () => void;
}

export const ReviewForm = ({ onSubmitSuccess }: IReview) => {
  const { mutate, isSuccess, isPending } = useAddReview();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<TReview>({
    resolver: zodResolver(reviewSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      message: "",
      rating: 0,
    },
  });

  const onSubmit: SubmitHandler<TReview> = (data) => {
    if (rating <= 0) {
      setError("rating", { message: "Rating must be greater then zero" });
      return;
    }
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      onSubmitSuccess();
    }
  }, [isSuccess, reset]);

  const handelRatingClick = (currentRating: number) => {
    setRating(currentRating);
    setValue("rating", currentRating);
  };
  return (
    <>
      <div className="lg:px-7 px-3">
        <Header className="py-0 text-center mt-6 text-primary">
          Review Form
        </Header>
        <Divider variant="full" className="bg-neutral-100 px-4" />
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <Input
            errorClassName="text-red-500"
            label="Name"
            name="name"
            type="text"
            placeholder="Full name"
            labelClassName="text-gray-800"
            register={register}
            error={errors?.name?.message}
          />
          <Input
            errorClassName="text-red-500"
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            labelClassName="text-gray-800 mt-5"
            register={register}
            error={errors?.email?.message as string}
          />
          <TextArea
            label="Message:"
            name="message"
            rows={4}
            placeholder="Message..."
            labelClassName="text-gray-800 mt-5"
            register={register}
            errorClassName="text-red-500"
            error={errors?.message?.message}
          />
          <br />
          <div className="flex lg:flex-row flex-col items-center justify-center gap-2 pb-5">
            <p className="font-bold text-gray-600 text-start">{rating} Stars</p>
            <div className="flex">
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                  <div
                    key={index}
                    className={`cursor-pointer`}
                    onClick={() => handelRatingClick(currentRating)}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(0)}
                  >
                    <div className="lg:block hidden">
                      <Star
                        size={45}
                        strokeWidth={0}
                        fill={cn(`
                     ${
                       index < hover
                         ? "#FEDE00"
                         : index < rating
                           ? "#FEDE00"
                           : "gray"
                     }`)}
                      />
                    </div>
                    <div className="lg:hidden block">
                      <Star
                        size={35}
                        strokeWidth={0}
                        fill={cn(`
                     ${
                       index < hover
                         ? "#FEDE00"
                         : index < rating
                           ? "#FEDE00"
                           : "gray"
                     }`)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <ErrorMessage>{errors?.rating?.message}</ErrorMessage>
          </div>
          <div className="flex flex-col gap-y-3">
            <Button
              label="Submit"
              disabled={!isValid || !isDirty}
              isLoading={isPending}
            />
            <Button
              type="button"
              label="Cancel"
              variant={"secondary"}
              className=" mb-6"
              onClick={onSubmitSuccess}
            />
          </div>
        </form>
      </div>
    </>
  );
};
