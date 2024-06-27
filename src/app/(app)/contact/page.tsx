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
        <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3532.925745419086!2d85.32805055379865!3d27.68868979805986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sRestaurants!5e0!3m2!1sen!2snp!4v1719460657856!5m2!1sen!2snp" width="500" height="450" style={{border:"0"}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
      <div className="lg:px-28 px-2 py-12">
        <p className="py-3 text-[14px]">
            Ons restaurant bevindt zich op de hoek aan Sint-Franciscusplein(waar
            de dinsdagmarkt plaatsvindt), slechts 2 minuten van de Bredabaan,
            met ruim voldoende parkeergelegenheid.
          </p>
      </div>
    </div>
  );
};

export default Page;
