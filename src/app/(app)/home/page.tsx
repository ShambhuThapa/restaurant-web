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
              Rechtstreeks van onze chef <br /> naar jouw plek ! <br /> Bestel
              en Geniet...
            </Header>
            <div className="flex lg:flex-row flex-col  justify-evenly w-full lg:w-[40rem] lg:px-20 px-16 gap-2 lg:gap-0">
              <Link href={"/order"}>
                <div className="px-5 w-full">
                  <Button
                    label="BESTEL NU"
                    labelClassName={`${hammersmith.variable} font-sans text-sm font-thin tracking-[0.2rem]		 `}
                  />
                </div>
              </Link>
              <Link href={"/menu"}>
                <Button
                  label="ONTDEK MENU"
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
            body="Bij ons draait alles om versheid en kwaliteit. Gezien de delicatesse van het
gerecht, bereiden we uw sushi altijd à la minute met verse ingrediënten. Elke
bestelling wordt zorgvuldig verpakt, zelfs gefrituurde sushirolls wachten tot het
laatste moment. Zo geniet u van de authentieke smaak alsof het rechtstreeks uit
uw eigen keuken komt."
          />

          <Divider className="bg-dark-100/10" />

          <ProductCart
            reverse
            imageUrl="/images/imageTwo.png"
            mobileImageUrl="/images/imageTwoMobile.png"
            header="Warme gerechten"
            body="Warme gerechten worden met dezelfde zorg behandeld als onze sushi. Onze
          chef selecteert handmatig groenten en vlees van een halal-gecertificeerde
          leverancier. Een gouden regel voor al onze warme gerechten? Ze worden lastminute verpakt, zodat ze heerlijk warm zijn wanneer je ze opent in je eetkamer. "
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
                verse ingredienten
              </Header>
              <p
                className={cn(
                  `${playfair_Display.variable} font-customFont px-12 text-sm`
                )}
              >
                Van knapperige groenten tot zorgvuldig geselecteerde vis, elk
                gerecht wordt doordrenkt met de levendigheid en smaak die alleen
                verse ingrediënten kunnen bieden. Het is niet alleen een
                principe, maar een onmisbare traditie die we hoog houden voor
                een ongeëvenaarde culinaire ervaring.
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
          <InformationCart imageUrl="/images/chef.jpeg" />
        </section>

        <div id="review">
          <ReviewCards />
        </div>
        <div className="flex w-96 m-auto  items-center justify-center">
          <Button
            label="Deel jou mening"
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
