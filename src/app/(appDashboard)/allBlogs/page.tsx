"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import { Trash2Icon } from "lucide-react";

import { useGetAllBlog } from "@/hooks/api/blog/useGetAllBlog";
import Table from "@/components/ui/table";
import SquarePenIcon from "../../../../public/icons/square-pen.svg";

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor("title", {
    header: "Name",
    cell: (info) => {
      return <div className="font-semibold">{info.getValue()}</div>;
    },
  }),
  columnHelper.accessor("body", {
    header: "Description",
    cell: (info) =><p className="truncate w-40">{info.getValue()}</p> ,
  }),
  columnHelper.accessor("imageUrl", {
    header: "image",
    cell: (info) => (
      <div>
        {info.getValue() && (
          <Image src={info.getValue()} alt="sdvsjhj" width={200} height={200} className="rounded"/>
        )}
      </div>
    ),
  }),

  columnHelper.accessor("action", {
    header: `Action`,
    cell: (info) => {
      return (
        <div className="flex gap-x-3">
          <Link href={`/allBlogs/${info.row.original.id}/edit`}>
          <Image
              height={20}
              width={20}
              src={SquarePenIcon}
              className="h-6 w-6 mt-[1px] "
              alt="square-pen-icon"
            />
          </Link>
          <Link href={`/allBlogs/${info.row.original.id}/delete`}>
            <Trash2Icon size={22} className="cursor-pointer text-primary" />
          </Link>
        </div>
      );
    },
  }),
];

const Page = () => {
  const { data } = useGetAllBlog();
  return (
    <Table
      columns={columns}
      data={data}
      primaryButtonLabel="Add Blog"
      hasPrimaryButton
      link="/allBlogs/new"
      title="Blogs"
    />
  );
};

export default Page;
