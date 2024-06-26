"use client";

import { ChevronLeftIcon } from "lucide-react";

export function SwiperPrevButton(props:any) {

  return (
    <button {...props}>
      <ChevronLeftIcon  className="text-primary cursor-pointer lg:h-20 lg:w-20 h-12 w-12" />
    </button>
  );
}
