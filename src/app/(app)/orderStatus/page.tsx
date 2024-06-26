"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Header } from "@/components";
import { ArrowLeftCircle } from "lucide-react";

import { useGetOrderStatus } from "@/hooks/api/orders/useGetOrderStatus";
import { useOrdersContext } from "@/hooks/useOrder";
import { Spinner } from "@/components/ui/spinner";
import {
  hammersmith,
  playfair_Display,
  playfair_Display_Sc,
} from "@/app/layout";

interface PropsData {
  paymentMethod: string;
  phoneNumber: string;
  email: string;
  amountPaid: number;
}

const SuccessPage = () => {
  const router = useRouter();

  const [paymentId, setPaymentId] = useState("");
  const { updateOrders } = useOrdersContext();

  const paymentIntentId =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("payment_intent")
      : null;

  const { data, isLoading } = useGetOrderStatus(paymentId);

  const goToOrder = () => {
    localStorage.removeItem("orderDetails");
    localStorage.removeItem("orders");
    updateOrders([]);
    router.push("/order");
  };

  useEffect(() => {
    localStorage.removeItem("orders");
    updateOrders([]);
  }, []);

  useEffect(() => {
    if (paymentIntentId) {
      setPaymentId(paymentIntentId);
    }
  }, [paymentIntentId, setPaymentId]);

  return (
    <>
      {(data && data?.status !== "succeeded")  ? (
        <div className="w-full flex justify-center items-center pt-48 mb-10">
          <div className="lg:w-[65vw] w-[97vw] py-40  span-4 shadow   bg-primary flex flex-col items-center">
            <p className="text-2xl">Payment Failed !!! Try again..</p>
            <div className="py-5 ">
              <Button
                label="Go back to menu"
                labelClassName="mt-1"
                iconLeft={<ArrowLeftCircle />}
                onClick={goToOrder}
              />
            </div>
          </div>
        </div>
      ) : null}

      {(data && data?.status === "succeeded") || !paymentIntentId ? (
        <div className="w-full flex justify-center items-center pt-48 mb-10">
          <div className="lg:w-[65vw] w-[97vw]  span-4 shadow   bg-primary flex flex-col items-center">
            <Header
              className={`${playfair_Display_Sc.variable} font-customFontSc  span-0 p-0 mb-0 mt-7 pt-6 text-white text-center `}
              variant="lg"
            >
              Bedankt voor je bestelling!
            </Header>

            <p
              className={`${playfair_Display.variable} font-customFont text-center my-7`}
            >
              U heeft zonet een bestelling geplaatst. <br />
              Wat mag u nu verwachten?
            </p>

            <div
              className={`${hammersmith.variable} font-sans text-center lg:text-2xl text-xl px-10`}
            >
              <li>een eerste bevestiging mail met bestelbevestiging.</li>
              <li>
                een tweede mail met de bezorg/afhaal tijd + besteloverzicht.
              </li>
            </div>

            <div className="mx-5 my-3 bg-white w-[2/3] text-primary">
              <p className="p-5 text-center">
                ** !!Tip: Voeg onze email adres (sushimerksem@gmail.com) toe als
                een veilige zender in je e-mail account. Zo voorkomt bent u
                zeker dat de updates over uw bestelling niet in de spam folder
                verdwijnen.
              </p>
            </div>

            <p
              className={`${playfair_Display.variable} font-customFont text-center mb-3`}
            >
              Als u binnen 10-15 minuten geen enkele email ontvangt dan mag u
              ons gerust bellen op onderstaande nummer
            </p>

            <p
              className={`${hammersmith.variable} font-sans text-center mb-5 text-2xl font-medium`}
            >
              (+32) 03 33 79 229
            </p>

            <div>
              <p
                className={`${playfair_Display.variable} font-customFont  text-center `}
              >
                of een bericht sturen via de
              </p>

              <p
                className={`${hammersmith.variable} font-sans text-center mb-4 text-2xl font-medium`}
              >
                contactformulier.
              </p>
            </div>
            <div className="py-5 ">
              <Button
                label="Go back to menu"
                labelClassName="mt-1"
                iconLeft={<ArrowLeftCircle />}
                onClick={goToOrder}
              />
            </div>
          </div>
        </div>
      ) : null}

      {paymentIntentId && (isLoading || !data)  && (
        <div className="w-full flex justify-center items-center pt-48 mb-10">
          <div className="lg:w-[65vw] w-[97vw] py-40  span-4 shadow   bg-primary flex flex-col items-center">
            <Spinner color="white" height="12" width="12" />
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessPage;
