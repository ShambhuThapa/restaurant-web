import React from "react";
import Image from "next/image";
import { Header } from "@/components";

import { cn } from "@/lib/utils";
import { playfair_Display, playfair_Display_Sc } from "@/app/layout";

interface IInformationCart {
  reverse?: boolean;
  imageUrl: string;
}

export const InformationCart: React.FC<IInformationCart> = (props) => {
  const { reverse = false, imageUrl } = props;
  return (
    <div dir={cn({ rtl: reverse, ltr: !reverse })}>
      <div className="relative flex lg:flex-row  flex-col items-center lg:py-20 py-0 lg:my-10 lg:bg-primary ">
        <div className=" flex-1  ">
          <Image
            height={900}
            width={530}
            className="lg:absolute lg:left-[8%] left-[50%]-0 -top-[16%] lg:h-[32rem] h-[30rem] lg:px-0 px-8"
            alt="cover-image"
            src={imageUrl}
          />
        </div>
        <div
          className={cn(
            "flex-1 lg:px-20 px-5 text-center lg:py-0 py-8 lg:bg-transparent bg-primary lg:opacity-100 opacity-70 lg:relative absolute -bottom-40 lg:-bottom-0 lg:mt-0 mt-20	"
          )}
        >
          <Header
            className={cn(
              `${playfair_Display_Sc.variable} font-customFontSc py-4`
            )}
            variant="lg"
          >
            Our Chef’s story
          </Header>

          <p
            className={cn(
              `${playfair_Display.variable} font-customFont text-sm`
            )}
          >
           Our chef Shambhu Thapa hails from Nepal and brings over 10 years of culinary expertise to our kitchen. Starting his journey in various brasseries and restaurants, he mastered the basics of cooking early on. In 2016, Shambhu transitioned to Japanese cuisine, instantly recognizing it as his true passion. He emphasizes consistency in quality and taste, presentation, technique, and the use of fresh ingredients.
           Drawing from his diverse culinary background and extensive experience, Shambhu was prepared to open his own restaurant. Despite the challenges of launching during a pandemic, he successfully brought his long-held dream to life. The result? An extraordinary culinary experience that showcases his dedication and skill in Eastern cuisine, evident in every delicious dish.
          </p>
        </div>
      </div>
    </div>
  );
};
