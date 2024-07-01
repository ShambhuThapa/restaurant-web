"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { Howl } from "howler";
import {
  BellPlusIcon,
  ChevronRightIcon,
  ClipboardIcon,
  EuroIcon,
  HomeIcon,
  InfoIcon,
  Layers3,
  LogOutIcon,
  MapPinIcon,
  Menu,
  MessageCircleMore,
  SettingsIcon,
  StarIcon,
  UtensilsIcon,
  XIcon,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { cn } from "@/lib/utils";
import { useGetTotalOrder } from "@/hooks/api/notification/useGetTotalOrder";
import { useAuth } from "@/hooks/useAuth";

import { poppins } from "../layout";

interface IMenus {
  name: string;
  href?: string;
  icon?: any;
  children?: { name: string; href: string; icon?: any }[];
}

const menus: IMenus[] = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Dish Type", href: "/dishType", icon: Layers3 },
  { name: "Dish", href: "/dish", icon: UtensilsIcon },
  { name: "Orders", href: "/orders", icon: ClipboardIcon },
  { name: "Blogs", href: "/allBlogs", icon: ClipboardIcon },
  {
    name: "Contact Messages",
    href: "/contactMessages",
    icon: MessageCircleMore,
  },
  { name: "Reviews", href: "/allReviews", icon: StarIcon },
  {
    name: "Settings",
    icon: SettingsIcon,
    children: [
      { name: "Location", href: "/settings/location", icon: MapPinIcon },
      { name: "Info", href: "/settings/websiteinfo", icon: InfoIcon },
      { name: "Popup", href: "/settings/popup", icon: BellPlusIcon },
      { name: "Discount Coupon", href: "/settings/coupon", icon: EuroIcon },
    ],
  },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();
  const { isLoggedIn, logout, checkToken } = useAuth();

  const sound = new Howl({
    src: "/sound/successSound.mp3",
    loop: true,
  });
  const { data: totalOrder } = useGetTotalOrder();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Check if the sound is already playing from localStorage
    const isSoundPlaying = localStorage.getItem("isSoundPlaying") === "true";

    if (totalOrder?.orderStatus === "pending" && !isSoundPlaying) {
      sound.play();
      toast.success("New order received.");
      localStorage.setItem("isSoundPlaying", "true");
    } else {
      localStorage.setItem("isSoundPlaying", "false");
    }

    return () => {
      sound.stop();
    };
  }, [totalOrder?.orderStatus]);

  const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(false);

  const activeRoute = React.useCallback(
    (href: string) => {
      let activeClassName = "";
      if (pathName === href) {
        activeClassName = "group bg-primary text-white";
      }
      return activeClassName;
    },
    [pathName]
  );

  useEffect(() => {
    if (localStorage.getItem("token") && !isLoggedIn) {
      checkToken();
    }
    if (!localStorage.getItem("token")) {
      router.replace("/auth/login");
    }
  }, [router, checkToken, isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  // if (totalOrder?.orderStatus === "pending") {
  //   setInterval(() => play(), 2000);
  // }

  return (
    <div className={cn(poppins.variable, "font-mono")}>
      {/* <button onClick={play()}>BBBBBBB</button> */}
      <Transition.Root show={sidebarOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={React.Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={React.Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
              <Transition.Child
                as={React.Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute right-0 top-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="h-0 flex-1 overflow-y-auto  pb-4">
                <div className=" h-28 bg-white shadow-sm">
                  <Image
                    src={"/logo.svg"}
                    alt="restaurant Logo"
                    width={100}
                    height={100}
                    className="z-10 h-full w-full object-contain py-2"
                  />
                </div>

                <nav className="mt-5 space-y-1 px-4 overflow-y-auto">
                  {menus?.map((item) => (
                    <div key={item.name}>
                      {!item?.children?.length && (
                        <Link
                          key={item?.name}
                          href={item?.href || "#"}
                          onClick={() => setSidebarOpen(false)}
                          className={cn(
                            "group flex items-center rounded-md px-4 py-2 hover:bg-primary-400 hover:text-white ",
                            activeRoute(item?.href || "#")
                          )}
                        >
                          {item.icon && (
                            <item.icon
                              className="h-6 w-6 shrink-0 text-gray-900 group-hover:text-white"
                              aria-hidden="true"
                            />
                          )}
                          <span className="mx-2 text-sm font-medium text-gray-900 group-hover:text-white">
                            {item?.name}
                          </span>
                        </Link>
                      )}
                      {item.children && (
                        <Disclosure as="div">
                          {({ open }) => (
                            <>
                              <Disclosure.Button
                                className={cn(
                                  "flex items-center rounded-md p-2  hover:bg-primary-500 hover:text-white ",
                                  activeRoute(item?.href || "#")
                                )}
                              >
                                {item.icon && (
                                  <item.icon
                                    className="group:text-white h-5 w-5  shrink-0 hover:text-white"
                                    aria-hidden="true"
                                  />
                                )}
                                <span className="mx-2 text-sm font-semibold  ">
                                  {item.name}
                                </span>
                                <ChevronRightIcon
                                  className={cn(
                                    open
                                      ? "rotate-90 hover:text-white"
                                      : "hover:text-white",
                                    "ml-auto h-5 w-5 shrink-0 "
                                  )}
                                  aria-hidden="true"
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel
                                as="ul"
                                className="mt-1 w-full px-2"
                              >
                                {item?.children?.map((subItem: any) => (
                                  <li key={subItem.name}>
                                    <Link href={subItem.href}>
                                      <Disclosure.Button
                                        className={cn(
                                          "flex items-center rounded-md p-2  ml-4 w-full  text-left hover:bg-primary-500 hover:text-white ",
                                          activeRoute(item?.href || "#")
                                        )}
                                      >
                                        {subItem.icon && (
                                          <subItem.icon
                                            className="group:text-white h-5 w-5  shrink-0 hover:text-white"
                                            aria-hidden="true"
                                          />
                                        )}
                                        <span className="mx-2 text-sm font-semibold  ">
                                          {subItem.name}
                                        </span>
                                      </Disclosure.Button>
                                    </Link>
                                  </li>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
              <div className=" flex flex-shrink-0 border-t border-gray-100 bg-white p-4 shadow-2xl">
                <Link href="/auth/login" className="group w-full">
                  <div className="flex items-center">
                    <div></div>
                    <div className="ml-3 w-full">
                      <p className="text-base font-medium text-gray-900">
                        {/* {user?.name} */}
                      </p>
                      <div className=" ">
                        <button
                          className=" my-2 flex items-center text-gray-900"
                          onClick={logout}
                        >
                          <LogOutIcon
                            width={24}
                            height={24}
                            className="text-gray-900 group-hover:text-red-500"
                          />
                          <p className="ml-2 w-full text-xs font-medium text-gray-900 group-hover:text-red-500">
                            Logout
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </Transition.Child>
          <div className="w-14 flex-shrink-0">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* for desktop */}
      <div className="z-10 hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white">
          <div className="flex flex-1 flex-col overflow-y-hidden  pb-4">
            {/* <div className='flex flex-shrink-0 items-center justify-center px-4'> */}
            <div className="h-32 border-b border-gray-100 bg-white shadow-sm ">
              <Image
                src={"/logo.svg"}
                alt="sushimerksem Logo"
                width={100}
                height={100}
                className="z-10 h-full w-full object-contain py-2"
              />
            </div>

            {/* </div> */}

            <nav className="mt-5 flex-1 space-y-1 px-6 overflow-y-auto">
              {menus?.map((item) => {
                return (
                  <div key={item.name}>
                    {!item.children && (
                      <Link
                        key={item?.name}
                        href={item?.href || "#"}
                        className={cn(
                          "flex items-center rounded-md p-2  hover:bg-primary-400 hover:text-white ",
                          activeRoute(item?.href || "#")
                        )}
                      >
                        {item.icon && (
                          <item.icon
                            className="group:text-white h-5 w-5  shrink-0 hover:text-white"
                            aria-hidden="true"
                          />
                        )}
                        <span className="mx-2 text-sm font-semibold  hover:text-white">
                          {item?.name}
                        </span>
                      </Link>
                    )}
                    {item.children && (
                      <Disclosure as="div">
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={cn(
                                "flex items-center rounded-md p-2  hover:bg-primary-400 hover:text-white ",
                                activeRoute(item?.href || "#")
                              )}
                            >
                              {item.icon && (
                                <item.icon
                                  className="group:text-white h-5 w-5  shrink-0 hover:text-white"
                                  aria-hidden="true"
                                />
                              )}
                              <span className="mx-2 text-sm font-semibold  ">
                                {item.name}
                              </span>
                              <ChevronRightIcon
                                className={cn(
                                  open
                                    ? "rotate-90 hover:text-white"
                                    : "hover:text-white",
                                  "ml-auto h-5 w-5 shrink-0 "
                                )}
                                aria-hidden="true"
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel
                              as="ul"
                              className="mt-1 w-full px-2"
                            >
                              {item?.children?.map((subItem: any) => (
                                <li key={subItem.name}>
                                  <Link href={subItem.href}>
                                    <Disclosure.Button
                                      className={cn(
                                        "flex items-center rounded-md p-2  ml-4 w-full  text-left hover:bg-primary-400 hover:text-white ",
                                        activeRoute(item?.href || "#")
                                      )}
                                    >
                                      {subItem.icon && (
                                        <subItem.icon
                                          className="group:text-white h-5 w-5  shrink-0 hover:text-white"
                                          aria-hidden="true"
                                        />
                                      )}
                                      <span className="mx-2 text-sm font-semibold  ">
                                        {subItem.name}
                                      </span>
                                    </Disclosure.Button>
                                  </Link>
                                </li>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 bg-white p-4 pt-8 shadow-2xl">
            <div className="flex items-center">
              <div></div>
              <div className="ml-3">
                {/* <p className="text-xs font-bold text-gray-900">{user?.name}</p> */}
                <div>
                  <button className="my-2 flex items-center" onClick={logout}>
                    <LogOutIcon
                      width={24}
                      height={24}
                      className="font-semibold text-gray-900 group-hover:text-red-500"
                    />
                    <Link href="/auth/login">
                      <p className="ml-2  text-xs font-semibold text-gray-900 group-hover:text-red-500">
                        Logout
                      </p>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
        <button
          type="button"
          className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <div className="  box-border flex-1 w-full  flex-col overflow-hidden bg-gray-200  lg:pl-72 pl-7 pr-7">
        <main className=" min-h-screen overflow-hidden">
          <div className="py-7">
            <div className="mx-auto px-4 lg:px-0">
              <div className=" p-8 bg-white rounded-md shadow-xl min-h-[90vh] overflow-hidden">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
