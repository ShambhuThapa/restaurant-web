import React from "react";
import Image from "next/image";
import { Header } from "@/components";

import { cn } from "@/lib/utils";
import { playfair_Display } from "@/app/layout";

interface IProductCart {
  reverse?: boolean;
  imageUrl: string;
  mobileImageUrl: string;
  header: string;
  body: string;
}
export const ProductCart: React.FC<IProductCart> = (props) => {
  const { reverse = false, imageUrl, mobileImageUrl, header, body } = props;
  return (
    <div dir={cn({ rtl: reverse, ltr: !reverse })} className={cn(``)}>
      <div className="relative lg:py-16 py-10">
        <div className={"lg:w-[60%] w-full "}>
          <Image
            height={100}
            width={500}
            className={cn(
              "w-full lg:h-[25rem] h-[20rem] object-fill hidden lg:block	",
              {
                "scale-x-[-1]": reverse,
              }
            )}
            alt="cover-image"
            src={imageUrl}
          />
          <Image
            height={100}
            width={500}
            className={cn(
              "w-full lg:h-[25rem] h-[20rem] object-fill lg:hidden block	",
              {
                "scale-x-[-1]": reverse,
              }
            )}
            alt="cover-image"
            src={mobileImageUrl}
          />
        </div>
        <div
          className={cn(
            "lg:w-[40%] absolute lg:top-6 top-16 md:top-[30%] lg:px-0 px-16 lg:left-[57%] lg:text-start lg:bg-transparent bg-dark-500/60 text-center w-full lg:mx-0 mx-auto pr-20 flex-col items-start lg:pt-8 lg:py-8 py-6 justify-start ",
            {
              "lg:left-24 lg:top-20": reverse,
            }
          )}
        >
          <Header
            variant="lg"
            className={`${playfair_Display.variable} font-customFont mb-2 lg:mb-8 p-0 lg:py-10 `}
          >
            {header}
          </Header>
          <p className="text-sm">{body}</p>
        </div>
      </div>
    </div>
  );
};
