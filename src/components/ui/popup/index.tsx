"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { Modal } from "@/components";
import { XIcon } from "lucide-react";

export const PopUp = ({
  mobileViewImageUrl,
  webViewImageUrl,
  setOpenCookie,
}: {
  webViewImageUrl: string;
  mobileViewImageUrl: string;
  setOpenCookie: any;
}) => {
  const params = usePathname();
  const [openPopup, setOpenPopup] = useState(params == "/home" ? true : false);

  const closePopup = () => {
    setOpenPopup(false);
    if (
      !localStorage.getItem("isCookie") ||
      localStorage.getItem("isCookie") === "false"
    ) {
      setOpenCookie(true);
    }
  };

  return (
    <Modal
      show={mobileViewImageUrl || webViewImageUrl ? openPopup : false}
      onModalClose={closePopup}
      className="p-0 rounded-none h-auto"
    >
      <>
        {(mobileViewImageUrl || webViewImageUrl) && (
          <XIcon
            size={30}
            className="bg-primary text-white rounded-full absolute right-2 cursor-pointer m-2"
            onClick={closePopup}
          />
        )}
        {mobileViewImageUrl && (
          <Image
            src={mobileViewImageUrl}
            height={1010}
            width={790}
            alt="popup image mobile"
            className="w-full h-full object-contain lg:hidden block"
          />
        )}
        {webViewImageUrl && (
          <Image
            src={webViewImageUrl}
            height={1000}
            width={1000}
            alt="popup image web"
            className="w-full h-full object-contain lg:block hidden"
          />
        )}
      </>
    </Modal>
  );
};
