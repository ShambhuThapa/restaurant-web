"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Header, SwiperNextButton, SwiperPrevButton } from "@/components";
import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import ReactPlayer from "react-player";

import { useGetInstaFeed } from "@/hooks/api/instaFeed/useGetInstaFeeds";

const InstaGramFeeds = () => {
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const [playVedio, setPlayVedio] = useState(false);
  const { data: data } = useGetInstaFeed();

  return (
    <>
      <Header className="text-center lg:my-8 my-2" variant="xl">
        Feed
      </Header>
      <div className="lg:block hidden">
        {data?.data?.length && (
          <div className=" w-full  lg:px-16 px-0   flex gap-x-2 items-center">
            <SwiperPrevButton onClick={() => swiperRef.slidePrev()} />
            <Swiper
              centeredSlides
              slidesPerView="auto"
              effect="fade"
              className="w-full h-[30rem] overflow-hidden grid lg:grid-cols-3"
              loop
              speed={800}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              modules={[EffectCoverflow]}
              onSwiper={(swiper: any) => setSwiperRef(swiper)}
            >
              {data?.data?.map((el: any) => (
                <SwiperSlide key={el.id} className="mx-2 w-full h-full">
                  {!el?.media_url.includes(".mp4") ? (
                    <Image
                      src={el?.media_url}
                      height={600}
                      width={400}
                      alt={el.id}
                      className="object-cover "
                    />
                  ) : (
                    <div
                      onMouseEnter={() => setPlayVedio(el.media_url)}
                      onMouseLeave={() => setPlayVedio(false)}
                    >
                      <ReactPlayer
                        url={el.media_url}
                        playing={playVedio}
                        controls={true}
                        height={400}
                        loop
                        className="cursor-pointer"
                        width="100%"
                      />
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
            <SwiperNextButton onClick={() => swiperRef.slideNext()} />
          </div>
        )}
      </div>
      <div className="lg:hidden block ">
        <div className="grid grid-cols-2  mx-1">
          {data?.data?.map((el: any, index: number) => {
            return (
              <div key={el.id} className="m-1">
                {index < 6 ? (
                  <div>
                    {!el?.media_url.includes(".mp4") ? (
                      <Image
                        src={el?.media_url}
                        height={600}
                        width={600}
                        alt={el.id}
                        className="object-cover "
                      />
                    ) : (
                      <ReactPlayer
                        url={el.media_url}
                        playing={playVedio}
                        controls={true}
                        height={400}
                        loop
                        className="cursor-pointer"
                        width="100%"
                      />
                    )}
                  </div>
                ):null}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default InstaGramFeeds;
