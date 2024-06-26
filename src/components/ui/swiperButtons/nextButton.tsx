"use client";

import { ChevronRightIcon } from "lucide-react";

export function SwiperNextButton(props: any) {
  return (
    <button {...props}>
      <ChevronRightIcon  className="text-primary cursor-pointer lg:h-20 lg:w-20 h-12 w-12" />
    </button>
  );
}
