"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Button,
  Divider,
  Header,
  InformationCart,
  Modal,
  ProductCart,
  ReviewForm,
} from "@/components";

import { ReviewCards } from "@/components/ui/reviewCard";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/controller";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useFilterWebSiteInfo } from "@/hooks/api/webSiteInfo/useGetWebSiteInfo";
import InstaGramFeeds from "@/components/ui/instagramFeeds";
import {
  hammersmith,
  playfair_Display,
  playfair_Display_Sc,
} from "@/app/layout";

const Page = () => {
  const { data } = useFilterWebSiteInfo();

  const [showModal, setShowModal] = useState(false);

  const handleModel = () => {
    setShowModal(true);
  };

  const closeReviewModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section
        className={`${playfair_Display.variable} font-customFont overflow-hidden`}
      >
        <div className="relative pb-20">
          <div className="relative w-full">
            <div className="absolute z-10  bottom-0    h-40 w-full bg-gradient-to-t from-dark " />
            <Image
              height={2000}
              width={2000}
              className="w-full h-[62rem] hidden lg:block"
              alt="cover-image"
              src={"/images/Homepageimage.jpg"}
            />
            <Image
              height={600}
              width={600}
              className="w-full h-[45rem] mt-32 lg:hidden block"
              alt="cover-image"
              src={"/images/HomepageimageMobile.jpg"}
            />
          </div>
          <div className="w-full py-12 uppercase absolute lg:bg-dark/50 top-48 lg:top-64 flex flex-col lg:gap-y-14 gap-y-5 justify-center items-center">
            <Header
              variant="lg"
              className={cn(
                `${playfair_Display_Sc.variable} font-customFontSc text-center lg:w-[40rem] w-full leading-10 font-semibold  bg-dark/50 lg:bg-transparent lg:px-0 `
              )}
            >
             Directly from our chef <br /> to your place! <br /> Order and Enjoy...
            </Header>
            <div className="flex lg:flex-row flex-col  justify-evenly w-full lg:w-[40rem] lg:px-20 px-16 gap-2 lg:gap-0">
              <Link href={"/order"}>
                <div className="px-5 w-full">
                  <Button
                    label="ORDER NOW"
                    labelClassName={`${hammersmith.variable} font-sans text-sm font-thin tracking-[0.2rem]		 `}
                  />
                </div>
              </Link>
              <Link href={"/menu"}>
                <Button
                  label="DISCOVER MENU"
                  labelClassName={`${hammersmith.variable} font-sans text-sm font-thin tracking-[0.2rem]		 `}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="">
          <ProductCart
            imageUrl="/images/imageOne.png"
            mobileImageUrl="/images/imageOneMobile.png"
            header="SUSHI"
            body="With us, everything revolves around freshness and quality.
             Given the delicacy of the dish, we always prepare
             your sushi à la minute with fresh ingredients. Every order is carefully packed,
              even fried sushi rolls wait until the last moment. This way, you can enjoy the
               authentic taste as if it comes straight from your own kitchen."
          />

          <Divider className="bg-dark-100/10" />

          <ProductCart
          reverse
          imageUrl="/images/imageTwo.png"
          mobileImageUrl="/images/imageTwoMobile.png"
          header="Warm Dishes"
          body="Warm dishes are treated with the same care as our sushi. Our chef hand-selects vegetables and meat from a halal-certified supplier. A golden rule for all our warm dishes? They are packed last minute, so they are wonderfully warm when you open them in your dining room."
          />

          <Divider className="bg-dark-100/10" />
        </div>

        <section className="flex justify-center items-center py-16">
          <div className="w-[50rem] flex flex-col gap-10 justify-center items-center">
            <div className="text-center ">
              <Header
                className={cn(
                  `${playfair_Display_Sc.variable} font-customFontSc pb-14`
                )}
                variant="lg"
              >
               Fresh Ingredients
              </Header>
              <p
                className={cn(
                  `${playfair_Display.variable} font-customFont px-12 text-sm`
                )}
              >
                From crispy vegetables to carefully selected fish, each dish is infused with the vibrancy and flavor that only fresh ingredients can offer. It is not just a principle but an indispensable tradition that we uphold for an unparalleled culinary experience
              </p>
            </div>
            <div className="grid grid-cols-3 grid-flow-col-1 lg:gap-28 gap-4">
              <img
                height={100}
                width={500}
                className="w-full h-full "
                alt="cover-image1"
                src={"/images/dishImage1.jpeg"}
              />
              <Image
                height={100}
                width={500}
                className="w-full h-full "
                alt="cover-image2"
                src={"/images/dishImg2.jpeg"}
              />
              <Image
                height={100}
                width={600}
                className="w-full h-full "
                alt="cover-image3"
                src={"/images/dishImg3.jpeg"}
              />
            </div>
          </div>
        </section>
        <Divider className="my-0 bg-dark-100/10" />

        <section className="py-28 lg:mt-20 mb-10">
          <InformationCart imageUrl="/images/chef.jpg" />
        </section>

        <div id="review">
          <ReviewCards />
        </div>
        <div className="flex w-96 m-auto  items-center justify-center">
          <Button
            label="Share your opinion"
            onClick={handleModel}
            className={cn(
              `${playfair_Display_Sc.variable} font-customFontSc flex justify  center sm:w-auto w-52 sm:-ml-0 -ml-3`
            )}
          />
        </div>
        <Divider className="my-14 bg-dark-100/10" />
        <InstaGramFeeds />

        <Link
          className="flex w-96 m-auto lg:-mt-0 -mt-28 items-center justify-center"
          href={data?.instagram ? data?.instagram : "#"}
          target="_blank"
        >
          <Button
            label="Visit instagram.."
            className={cn(
              `${hammersmith.variable} font-sans flex justify center sm:w-auto w-60`
            )}
          />
        </Link>
      </section>

      <Modal
        show={showModal}
        onModalClose={closeReviewModal}
        className="p-0 m-0"
      >
        <ReviewForm onSubmitSuccess={closeReviewModal} />
      </Modal>
    </>
  );
};

export default Page;
