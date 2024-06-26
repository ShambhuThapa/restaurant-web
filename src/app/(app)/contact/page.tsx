"use client";

import React from "react";
import Image from "next/image";
import { ContactForm, Divider, Header } from "@/components";

const Page = () => {
  return (
    <div className="overflow-hidden  pt-10">
      <div className="bg-dark lg:h-[15rem] h-[10rem]"></div>
      <div className="bg-primary relative  grid lg:grid-cols-2 gap-20 lg:px-28 py-10 ">
        <div>
          <ContactForm />
        </div>
        <div className=" lg:order-2 relative order-1 ">
          <Image
            src="/images/contactimage.png"
            alt="contact"
            width={900}
            height={980}
            className="lg:absolute lg:top-[-8rem] right-2 lg:w-full w-full  lg:h-[1020px]  h-[65rem]"
          />
        </div>
      </div>
      <div className="lg:h-[30rem]  lg:flex-row lg:gap-12  bg-dark lg:px-28 px-2 py-12 flex flex-col gap-6">
        <div className="lg:w-72 h-[17rem] ">
          <Header variant="sm" className="normal-case py-0">
            Annuntiatenstraat 1,
          </Header>
          <Header variant="sm" className="normal-case py-0">
            2170 Merksem
          </Header>
          <Header variant="sm" className="normal-case py-0">
          +32 3 337 92 29 
          </Header>
          <Header variant="sm" className="normal-case py-0 pb-2">
            sushimerksem@gmail.com
          </Header>
          <Divider variant="full" className="h-[1px]" />
          <p className="py-3 text-[14px]">
            Ons restaurant bevindt zich op de hoek aan Sint-Franciscusplein(waar
            de dinsdagmarkt plaatsvindt), slechts 2 minuten van de Bredabaan,
            met ruim voldoende parkeergelegenheid.
          </p>
        </div>
        <div className="bg-[url('/images/map.jpg')] lg:w-60 w-full lg:h-[17rem] h-[15rem] "></div>
      </div>
    </div>
  );
};

export default Page;
