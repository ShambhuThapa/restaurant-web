"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Footer, Modal, Navbar, PopUp } from "@/components";

import { cn } from "@/lib/utils";
import { useGetAllPopUp } from "@/hooks/api/popUp/useGetAllPopUp";
import { OrdersProvider } from "@/hooks/useOrder";
import { CookieModal } from "@/components/ui/cookiePopupModal";

import { hammersmith } from "../layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data } = useGetAllPopUp();
  const path = usePathname();
  const [openCookies, setOpenCookie] = useState(false);

  const isHomePage = path?.includes("/home");

  return (
    <>
      <div className={cn(hammersmith.variable, " font-sans relative")}>
        <div className="relative">
          <Navbar header={data?.headerContent} />
          <main className="bg-dark text-white min-h-screen  ">
            <OrdersProvider>{children}</OrdersProvider>
            <Footer />
          </main>
        </div>

        <div className="">
          <PopUp
            webViewImageUrl={data?.webViewImageUrl}
            mobileViewImageUrl={data?.mobileViewImageUrl}
            setOpenCookie={setOpenCookie}
          />
        </div>
      </div>
      {isHomePage && (
        <div className="">
          <CookieModal
            open={openCookies}
            onClose={() => setOpenCookie(false)}
          />
        </div>
      )}
    </>
  );
}
