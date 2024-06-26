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
            className="lg:absolute lg:left-[10%] left-[50%]-0 -top-[16%] lg:h-[36rem] h-[32rem] lg:px-0 px-8"
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
            our Chef’s story
          </Header>

          <p
            className={cn(
              `${playfair_Display.variable} font-customFont text-sm`
            )}
          >
            Onze chef Sajan is afkomstig uit Nepal en voor hem gaat niets boven zijn liefde
          voor het vak. Al jong begon hij in diverse brasserieën en restaurants en leerde
snel de basistechnieken van de Belgisch-Franse keuken. In 2016 maakte hij de
overstap naar de Japanse keuken en wist meteen dat hij hierin zijn passie
verder kon verdiepen. Consistentie in kwaliteit en smaak, presentatie, techniek
en versheid van de producten, dat zijn de musthaves van onze chef.
Met als basis die twee verschillende keukens én een jarenlange ervaring was
onze chef klaar om met een eigen zaak te starten. Maar een horecazaak
openen in volle pandemie? Dat is het avontuur dat Sajan aanging en ondanks
twee lockdowns is hij er perfect in geslaagd om zijn jarenlange droom waar te
maken.Dat hij al acht jaar ervaring heeft in de Oosterse keuken zul je ongetwijfeld
proeven in al onze heerlijke gerechten.
          </p>
        </div>
      </div>
    </div>
  );
};
