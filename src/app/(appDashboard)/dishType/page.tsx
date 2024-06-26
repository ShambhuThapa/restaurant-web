"use client";

import React from "react";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import {  Trash2Icon } from "lucide-react";

import { useGetAllDishType } from "@/hooks/api/dishType/useGetAllDishType";
import Table from "@/components/ui/table";

import SquarePenIcon from "../../../../public/icons/square-pen.svg";
import Image from "next/image";

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => {
      return <div className="font-semibold">{info.getValue()}</div>;
    },
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("action", {
    header: `Action`,
    cell: (info) => {
      return (
        
        <div className="flex gap-x-3">
          <Link href={`/dishType/${info.row.original.id}/edit`}>
             <Image
              height={20}
              width={20}
              src={SquarePenIcon}
              className="h-6 w-6 mt-[1px] "
              alt="square-pen-icon"
            />
          </Link>
          <Link href={`/dishType/${info.row.original.id}/delete`}>
            <Trash2Icon size={25} className="cursor-pointer text-primary" />
          </Link>
        </div>
      );
    },
  }),
];

const Page = () => {
  const { data } = useGetAllDishType();

  return (
    <Table
      columns={columns}
      data={data}
      primaryButtonLabel="Add Dish Type"
      hasPrimaryButton
      link="/dishType/new"
      title="Dish Type"
    />
  );
};

export default Page;
