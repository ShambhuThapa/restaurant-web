"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import { Trash2Icon } from "lucide-react";

import { useGetAllDish } from "@/hooks/api/dish/useGetAllDish";
import { useFilterAllDishType } from "@/hooks/api/dishType/useGetAllDishType";
import Table from "@/components/ui/table";

import SquarePenIcon from "../../../../public/icons/square-pen.svg";

const columnHelper = createColumnHelper<any>();

const Page = () => {
  const { data } = useGetAllDish();
  const { data: dish } = useFilterAllDishType();

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

    columnHelper.accessor("image", {
      header: "Dish Image",
      cell: (info) => (
        <div className="text-center">
          {info.getValue() ? (
            <Image
              src={info.getValue()}
              height={200}
              width={200}
              alt="dish image"
              className="rounded"
            />
          ): "-"}
        </div>
      ),
    }),

    columnHelper.accessor("dishTypeId", {
      header: "Dish Type",
      cell: (info) => {
        const dishType = dish?.find((el: any) => el.value === info.getValue())
          ?.label;
        return <div className="">{dishType}</div>;
      },
    }),

    columnHelper.accessor("price", {
      header: "Price",
      cell: (info) => {
        return `€${info.getValue()}`;
      },
    }),
    columnHelper.accessor("deliveryDiscount", {
      header: "Delivery Discount",
      cell: (info) => {
        return <>{info.getValue()}%</>;
      },
    }),
    columnHelper.accessor("takeAway", {
      header: "Take Away",
      cell: (info) => {
        return <div>{info.getValue() ? "Yes" : "No"}</div>;
      },
    }),
    columnHelper.accessor("takeAwayDiscount", {
      header: "Take Away Discount",
      cell: (info) => {
        return <>{info.getValue()}%</>;
      },
    }),
    columnHelper.accessor("vat", {
      header: "VAT",
      cell: (info) =><>{info.getValue()}%</> ,
    }),
    columnHelper.accessor("eatIn", {
      header: "Eat In",
      cell: (info) => {
        return <div>{info.getValue() ? "Yes" : "No"}</div>;
      },
    }),
    columnHelper.accessor("isSupplement", {
      header: "Supplement",
      cell: (info) => {
        return <div>{info.getValue() ? "Yes" : "No"}</div>;
      },
    }),

    columnHelper.accessor("available", {
      header: "Available",
      cell: (info) => {
        return <div>{info.getValue() ? "Yes" : "No"}</div>;
      },
    }),

    columnHelper.accessor("action", {
      header: `Action`,
      cell: (info) => {
        return (
          <div className="flex gap-x-3">
            <Link href={`/dish/${info.row.original.id}/edit`}>
              <Image
                height={20}
                width={20}
                src={SquarePenIcon}
                className="h-6 w-6 mt-[1px] "
                alt="square-pen-icon"
              />
            </Link>
            <Link href={`/dish/${info.row.original.id}/delete`}>
              <Trash2Icon size={22} className="cursor-pointer text-primary" />
            </Link>
          </div>
        );
      },
    }),
  ];

  return (
    <Table
      columns={columns}
      data={data}
      primaryButtonLabel="Add Dish"
      hasPrimaryButton
      link="/dish/new"
      title="Dish"
    />
  );
};

export default Page;
