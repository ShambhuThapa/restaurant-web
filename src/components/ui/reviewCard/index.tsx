"use client";

import React, { useState } from "react";
import { Header, SwiperNextButton, SwiperPrevButton } from "@/components";
import { ReviewStatus } from "@/enum";
import { format, parseISO } from "date-fns";
import { Star } from "lucide-react";
import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { cn } from "@/lib/utils";
import { useGetAllReview } from "@/hooks/api/Review/useGetReview";
import { playfair_Display } from "@/app/layout";

export const ReviewCards = () => {
  const { data } = useGetAllReview(ReviewStatus.HOME);
  const [swiperRef, setSwiperRef] = useState<any>(null);

  return (
    <>
      <div className={`${playfair_Display.variable} font-customFont`}>
        <Header
          className={cn("text-center   py-10 lg:mt-0 mt-20", {
            "lg:mb-12 mb-3": !data?.length,
          })}
          variant="xl"
        >
          Reviews
        </Header>
        {data?.length ? (
          <div className=" w-full lg:px-16 px-0  my-10 flex gap-x-2 items-center">
            <SwiperPrevButton onClick={() => swiperRef.slidePrev()} />
            <Swiper
              centeredSlides
              slidesPerView="auto"
              effect="fade"
              className=" w-full  h-[530px] overflow-hidden grid lg:grid-cols-3 grid-cols-1"
              loop
              speed={800}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
              modules={[EffectCoverflow]}
              onSwiper={(swiper: any) => setSwiperRef(swiper)}
            >
              {data?.map((review: any) => (
                <SwiperSlide key={review?.id} className="mx-1">
                  <div className="relative lg:mx-0 sm:mx-10 mx-20 cursor-pointer rounded-md h-[30rem]  w-auto bg-black-900  border-2 border-red-500">
                    <Header className="text-center pt-10 pb-2">
                      {review?.name}
                    </Header>
                    <p className="font-extrabold text-9xl text-center text-primary">
                      “
                    </p>
                    <div className="flex flex-col justify-between -mt-10">
                      <div className="mx-5 text-center  ">
                        <p className=" h-[10.8rem]  overflow-y-clip text-ellipsis ">
                          {review?.message}
                        </p>
                      </div>

                      <div className="flex justify-center items-end   p-4 ">
                        {review?.rating &&
                          [...Array(5)].map((el, index) => (
                            <Star
                              key={index}
                              className={cn("fill-gray-400", {
                                "fill-primary": index < review?.rating,
                              })}
                              size={40}
                              strokeWidth={0}
                            />
                          ))}
                      </div>
                    </div>

                    <Header
                      className="absolute text-center  text-primary  bottom-0 inset-x-0 tracking-[0.2em]"
                      variant="md"
                    >
                      {format(parseISO(review?.createdAt), "dd/MM/yyyy")}
                    </Header>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <SwiperNextButton onClick={() => swiperRef.slideNext()} />
          </div>
        ) : (
          <p className="text-primary text-center pb-10 text-lg">
            No reviews found...
          </p>
        )}
      </div>
    </>
  );
};
