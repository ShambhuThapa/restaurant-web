"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Header } from "@/components";
import { ArrowLeftCircle } from "lucide-react";

import { useOrdersContext } from "@/hooks/useOrder";
import { Spinner } from "@/components/ui/spinner";
import {
  hammersmith,
  playfair_Display,
  playfair_Display_Sc,
} from "@/app/layout";
import { useCheckEsewaPaymentStatus } from "@/hooks/api/payment/useCheckEswaPaymentStatus";

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
      ? new URLSearchParams(window.location.search).get("data")
      : null;

  const { data, isPending } = useCheckEsewaPaymentStatus(paymentId);

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
      {(data && data?.status !== "COMPLETE") ? (
        <div className="w-full flex justify-center items-center pt-48 mb-10">
          <div className="lg:w-[65vw] w-[97vw] py-40 span-4 shadow bg-primary flex flex-col items-center">
            <p className="text-2xl">Payment Failed !!! Try again..</p>
            <div className="py-5">
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

      {(data && data?.status === "COMPLETE") ? (
        <div className="w-full flex justify-center items-center pt-48 mb-10">
          <div className="lg:w-[65vw] w-[97vw] span-4 shadow bg-primary flex flex-col items-center">
            <Header
              className={`${playfair_Display_Sc.variable} font-customFontSc span-0 p-0 mb-0 mt-7 pt-6 text-white text-center`}
              variant="lg"
            >
              Thank you for your order!
            </Header>

            <p className={`${playfair_Display.variable} font-customFont text-center my-7`}>
              You have just placed an order. <br />
              What can you expect next?
            </p>

            <div className={`${hammersmith.variable} font-sans text-center lg:text-2xl text-xl px-10`}>
              <li>A first confirmation email with the order confirmation.</li>
              <li>A second email with the delivery/pick-up time + order overview.</li>
            </div>

            <div className="mx-5 my-3 bg-white w-[2/3] text-primary">
              <p className="p-5 text-center">
                ** Tip: Add our email address (sushimerksem@gmail.com) as a safe sender in your email account. This ensures that updates about your order don&apos;t end up in the spam folder.
              </p>
            </div>

            <p className={`${playfair_Display.variable} font-customFont text-center mb-3`}>
              If you do not receive any email within 10-15 minutes, feel free to call us at the number below
            </p>

            <p className={`${hammersmith.variable} font-sans text-center mb-5 text-2xl font-medium`}>
              (+32) 03 33 79 229
            </p>

            <div>
              <p className={`${playfair_Display.variable} font-customFont text-center`}>
                or send a message via the
              </p>

              <p className={`${hammersmith.variable} font-sans text-center mb-4 text-2xl font-medium`}>
                contact form.
              </p>
            </div>
            <div className="py-5">
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

      {paymentIntentId && (isPending || !data) && (
        <div className="w-full flex justify-center items-center pt-48 mb-10">
          <div className="lg:w-[65vw] w-[97vw] py-40 span-4 shadow bg-primary flex flex-col items-center">
            <Spinner color="white" height="12" width="12" />
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessPage;
