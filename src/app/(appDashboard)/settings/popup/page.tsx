"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import { Trash2Icon } from "lucide-react";

import { useGetAllPopUp } from "@/hooks/api/popUp/useGetAllPopUp";
import Table from "@/components/ui/table";

import SquarePenIcon from "../../../../../public/icons/square-pen.svg";

const columnHelper = createColumnHelper<any>();

const columns = [

  columnHelper.accessor("webViewImageUrl", {
    header: "Web Image",
    cell: (info) => {
      return (
        <>
          <Image
            height={200}
            width={200}
            src={`${info.getValue()}`}
            alt="Pop-up Image"
            className="h-44 rounded"
          />
        </>
      );
    },
  }),
   columnHelper.accessor("mobileViewImageUrl", {
    header: "Mobile Image",
    cell: (info) => {
      return (
        <>
          <Image
            height={200}
            width={200}
            src={`${info.getValue()}`}
            alt="Pop-up Image"
            className="h-44 rounded"
          />
        </>
      );
    },
  }),

  columnHelper.accessor("action", {
    header: `Action`,

    cell: (info) => {
      return (
        <div className="flex gap-x-3">
          <Link href={`/settings/popup/${info.row.original.id}/edit`}>
            <Image
              height={20}
              width={20}
              src={SquarePenIcon}
              className="h-6 w-6 mt-[1px] "
              alt="square-pen-icon"
            />
          </Link>
          <Link href={`/settings/popup/${info.row.original.id}/delete`}>
            <Trash2Icon size={22} className="cursor-pointer text-primary" />
          </Link>
        </div>
      );
    },
  }),
];

const Page = () => {
  const { data } = useGetAllPopUp();

  return (
    <>
      {data?.id ? (
        <Table
          title="Popup"
          columns={columns}
          data={[data]}
          hasSearch={false}
          showPagination={false}
        />
      ) : (
        <Table
          title="Popup"
          columns={columns}
          data={data?.id ? [data] : []}
          primaryButtonLabel="Add Popup"
          link="/settings/popup/new"
          hasPrimaryButton
          hasSearch={false}
          showPagination={false}
        />
      )}
    </>
  );
};

export default Page;
