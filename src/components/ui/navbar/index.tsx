"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import { getDay } from "date-fns";
import { Menu as MenuIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useGetRestaurantStatus } from "@/hooks/api/restaurantStatus/useGetRestaurentStatus";
import { playfair_Display } from "@/app/layout";

const navigation = [
  { name: "Home", href: "/home" },
  { name: "Reviews", href: "/home#review" },
  { name: "Order", href: "/order" },
  { name: "Contact", href: "/contact" },
  { name: "Blogs", href: "/blogs" },
  { name: "Menu", href: "/menu" },
];


const restaurantStatus = {
  open: "We are currently open. Place your order easily through our order platform or call us at +977 12345.",
  close:
    "We are currently closed. You can now place your order through our order platform.",
};


export const Navbar = ({ header }: { header: string }) => {
  const pathname = usePathname();
  const { data: status } = useGetRestaurantStatus();

  // const currentTime = new Date();
  // const openingHoursStart = new Date();
  // openingHoursStart.setHours(16, 0, 0);
  // const openingHoursEnd = new Date();
  // openingHoursEnd.setHours(21, 45, 0);
  // const isWednesday = getDay(currentTime) == 3;

  // const isOpen =
  //   currentTime >= openingHoursStart &&
  //   currentTime <= openingHoursEnd &&
  //   !isWednesday;

  return (
    <div className="absolute z-50 w-full">
      {/* destop navigation */}

      <div
        className={cn(" text-white   lg:fixed hidden lg:block w-[100vw]", {})}
      >
        {/* banner */}
        <div className="w-full  z-[30] h-auto py-2  lg:px-0 px-7 bg-white flex gap-x-4 items-center justify-center">
          <span
            className={cn("h-7 sm:w-7 w-12  bg-primary rounded-full", {
              "bg-green-500": !status?.isClosed,
              "bg-primary": status?.isClosed,
            })}
          />
          <p
            className={`text-sm text-gray-900 ${playfair_Display.variable} font-customFont`}
          >
            {!status?.isClosed ? (
              <p>{restaurantStatus["open"]}</p>
            ) : (
              <p>{restaurantStatus["close"]}</p>
            )}
          </p>
        </div>

        <div className="absolute  top-10 z-[-1]  h-20 w-full  bg-gradient-to-b from-dark/90 "></div>

        <nav className="z-10">
          <ul
            role="list"
            className="flex py-4 justify-center items-center gap-x-10 z-10"
          >
            {navigation?.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    pathname.includes(item.href)
                      ? "bg-primary  animate-scaleIn"
                      : "hover:text-white  hover:bg-dark/70 transition delay-75 ease-out hover:border hover:border-dark-100/30 ",
                    "group tracking-[0.19em] font-semibold uppercase flex gap-x-3   py-[4px] px-8 text-xs  border border-transparent"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Link href={"/home"}>
        <Image
          src="/logo.png"
          alt="logo"
          height={350}
          width={350}
          className="w-36 h-36 cursor-pointer  top-[49px] z-10 relative left-10 lg:block hidden"
        />
      </Link>

      {/* mobile navigation */}
      <Menu>
        {({ open }) => (
          <>
            <div
              className={cn("lg:hidden   bg-dark/90 shadow-lg fixed  w-full ", {
                " border-b pb-0 border-dark-200 shadow-2xl": open,
              })}
            >
              {/* banner */}
              <div className="w-full  z-[30] h-auto py-2  lg:px-0 px-7 bg-white flex gap-x-4 items-center justify-center">
                <span
                  className={cn("h-7 sm:w-7 w-12  bg-primary rounded-full", {
                    "bg-green-500": !status?.isClosed,
                    "bg-primary": status?.isClosed,
                  })}
                />
                <p
                  className={`text-sm text-gray-900 ${playfair_Display.variable} font-customFont`}
                >
                   {!status?.isClosed ? (
                   <p>{restaurantStatus["open"]}</p>
                   ) : (
                   <p>{restaurantStatus["close"]}</p>)}
                </p>
              </div>
              <div className="px-4 pb-2">
                <div
                  className={cn("flex justify-between bg-none pt-2", {
                    "border-b pb-3 border-dark-100/80": open,
                  })}
                >
                  <Link href={"/home"}>
                    <Image
                      src="/logo.png"
                      alt="logo"
                      height={100}
                      width={100}
                      className="w-20 h-20"
                    />
                  </Link>
                  <Menu.Button>
                    {!open ? (
                      <Image
                        className={cn("text-white animate-slideUpAndFade")}
                        alt="menu"
                        height={40}
                        width={40}
                        src={"/icons/menuBar.png"}
                      />
                    ) : (
                      <X
                        size={40}
                        className={cn("text-primary animate-fadeIn")}
                      />
                    )}
                  </Menu.Button>
                </div>
                <nav className="z-10  ">
                  <Menu.Items
                    className={cn(
                      " flex flex-col py-4 justify-center items-center gap-x-10 z-10",
                      {
                        "animate-enterFromLeft": open,
                        "animate-exitToRight": !open,
                      }
                    )}
                  >
                    {navigation?.map((item) => (
                      <Menu.Item key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            pathname.includes(item.href)
                              ? "bg-dark-100 text-primary  "
                              : "hover:text-primary transition delay-75 ease-out text-white  hover:bg-dark-200/10",
                            "group font-bold  gap-x-3 uppercase  w-[100vw] text-center inline-block py-3 px-4 text-base  leading-6"
                          )}
                        >
                          {item.name}
                        </Link>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </nav>
              </div>
            </div>
          </>
        )}
      </Menu>
    </div>
  );
};
