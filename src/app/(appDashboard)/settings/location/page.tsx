"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import { EyeIcon, Trash2Icon } from "lucide-react";

import { useGetAllLocation } from "@/hooks/api/location/useGetAllLocation";
import Table from "@/components/ui/table";

import SquarePenIcon from "../../../../../public/icons/square-pen.svg";

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor("locationName", {
    header: "Location Name",
    cell: (info) => {
      return <div className="font-semibold">{info.getValue()}</div>;
    },
  }),
  columnHelper.accessor("postalCode", {
    header: "Postal Code",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("minPrice", {
    header: "Minimum Price",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("minDeliveryTime", {
    header: "Minimum Delivery Time",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("action", {
    header: `Action`,

    cell: (info) => {
      return (
        <div className="flex gap-x-3">
          <Link href={`/settings/location/${info.row.original.id}/edit`}>
            <Image
              height={20}
              width={20}
              src={SquarePenIcon}
              className="h-6 w-6 mt-[1px] "
              alt="square-pen-icon"
            />
          </Link>
          <Link href={`/settings/location/${info.row.original.id}/delete`}>
            <Trash2Icon size={22} className="cursor-pointer text-primary" />
          </Link>
        </div>
      );
    },
  }),
];

const Page = () => {
  const { data } = useGetAllLocation();

  return (
    <Table
      columns={columns}
      data={data}
      primaryButtonLabel="Add Location"
      hasPrimaryButton
      link="/settings/location/new"
      title="Location"
    />
  );
};

export default Page;
