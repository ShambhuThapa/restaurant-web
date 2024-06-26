"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import { EyeIcon, Trash2Icon } from "lucide-react";

import { useGetAllCoupon } from "@/hooks/api/coupan/useGetAllCoupan";
import Table from "@/components/ui/table";

import SquarePenIcon from "../../../../../public/icons/square-pen.svg";

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => {
      return <div className="font-semibold">{info.getValue()}</div>;
    },
  }),
  columnHelper.accessor("discount", {
    header: "Discount",
    cell: (info) => <div className="">{info.getValue()}%</div>,
  }),

  columnHelper.accessor("code", {
    header: "Coupon Code",
    cell: (info) => <div className="font-semibold">{info.getValue()}</div>,
  }),

  columnHelper.accessor("action", {
    header: `Action`,
    cell: (info) => {
      return (
        <div className="flex gap-x-3 items-center">
          <Link href={`/settings/coupon/${info.row.original.id}/edit`}>
            <Image
              height={20}
              width={20}
              src={SquarePenIcon}
              className="h-6 w-6 mt-[1px] "
              alt="square-pen-icon"
            />
          </Link>
          <Link href={`/settings/coupon/${info.row.original.id}/delete`}>
            <Trash2Icon size={25} className="cursor-pointer text-primary" />
          </Link>
        </div>
      );
    },
  }),
];

const Page = () => {
  const { data } = useGetAllCoupon();
  return (
    <>
      {data?.id ? (
        <Table
          columns={columns}
          data={[data]}
          title="Discount Coupon"
          hasSearch={false}
          showPagination={false}
        />
      ) : (
        <Table
          title="Discount Coupon"
          columns={columns}
          data={data?.id ? [data] : []}
          primaryButtonLabel="Add Discount Coupon"
          link="/settings/coupon/new"
          hasPrimaryButton
          hasSearch={false}
          showPagination={false}
        />
      )}
    </>
  );
};

export default Page;
