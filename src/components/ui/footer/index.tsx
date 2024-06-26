"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  TwitterIcon,
  WebcamIcon,
  YoutubeIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useFilterWebSiteInfo } from "@/hooks/api/webSiteInfo/useGetWebSiteInfo";
import {
  hammersmith,
  playfair_Display,
  playfair_Display_Sc,
} from "@/app/layout";

import RibbonComponent from "../certificateLogo";
import { Divider } from "../divider";
import { Header } from "../header";

export const Footer = () => {
  const { data } = useFilterWebSiteInfo();
  return (
    <>
      <div
        className={`${playfair_Display.variable} font-customFontSc  bg-dark lg:px-20 px-4 flex flex-col  justify-start `}
      >
        <Header className="pb-3">{data?.name}</Header>
        <p className="text-justify">{data?.description}</p>
      </div>
      <section
        className={`${playfair_Display_Sc.variable} font-customFontSc bg-dark lg:px-20 pt-8`}
      >
        <div className="text-center rounded-t-sm  bg-primary text-white">
          <Header variant="lg">Follow us on</Header>
          <div className="flex items-center  gap-10 justify-center">
            <Link href={`${data?.facebook}`} target="_blank">
              <Image
                src="/social/facebook.png"
                alt="facebook"
                height={45}
                width={45}
              />
            </Link>
            <Link href={`${data?.instagram}`} target="_blank">
              <Image
                src="/social/insta.png"
                alt="facebook"
                height={52}
                width={52}
              />
            </Link>
            {data?.twitter && (
              <Link href={`${data?.twitter}`} target="_blank">
                <TwitterIcon size={40} />
              </Link>
            )}
            {data?.twitter && (
              <Link href={`${data?.youtube}`} target="_blank">
                <YoutubeIcon size={40} />
              </Link>
            )}
            {data?.pinterest && (
              <Link href={`${data?.pinterest}`} target="_blank">
                <WebcamIcon size={40} />
              </Link>
            )}
          </div>

          <Divider
            className="lg:hidden py-0 bg-white w-5/6  justify-center"
            containerClassName="flex justify-center"
          />

          <p className="text-base pt-7 lg:py-8  lg:px-2 px-12">
            Openingstijden: Alle dagen behalve woensdag van 16:00 tem 21:45
          </p>
          <Link
            target="_blank"
            href={"https://restaurantguru.com/Sushi-Merksem-Antwerp"}
            className="mx-auto"
          >
            <div className="flex items-center justify-center lg:mb-4 lg:mt-0 mt-4">
              <RibbonComponent />
            </div>
          </Link>
          <Divider className="lg:hidden py-0 mt-10 bg-white " />
          {/* <p className="text-sm pt-7 lg:py-10 px-2">{data?.address}</p> */}
          <div
            className={cn(
              `${hammersmith.variable} font-sans flex lg:flex-row text-wrap gap-3 flex-col lg:mx-36 tracking-wider  justify-around pb-10 px-10`
            )}
          >
            {data?.city ? (
              <p>{`${data?.street}  ${data?.houseNumber},  ${data?.postalCode}  ${data?.city}`}</p>
            ) : (
              "Annnuntiatenstraat 1, 2170 Merksem"
            )}
            <p className="font-extrabold lg:block hidden">|</p>
            <p>+32 3 337 92 29 </p>
            <p className="font-extrabold lg:block hidden">|</p>

            <p>{data?.email || "sushimerksem@gmail.com"}</p>
          </div>
        </div>
      </section>
    </>
  );
};
