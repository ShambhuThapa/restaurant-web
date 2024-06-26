"use client";

import React from "react";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";

import { converToNormalDate } from "@/lib/utils";
import { useGetAllContactMessage } from "@/hooks/api/contactMessage/useGetAllMessages";
import { useUpdateMessageStatus } from "@/hooks/api/contactMessage/useUpdateMessageStatus";
import { useUpdateReviewViewStatus } from "@/hooks/api/Review/useUpdateReviewViewStatus";
import Table from "@/components/ui/table";

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: `Name`,
    cell: (info) => {
      return (
        <div className="flex gap-x-1 relative">
          {!info.row.original.isRead && (
            <p className="text-primary font-bold text-2xl absolute -ml-4">*</p>
          )}
          <p className="font-semibold">{info.getValue()}</p>
        </div>
      );
    },
  }),
  columnHelper.accessor("email", {
    header: `Email`,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("createdAt", {
    header: `Date`,
    cell: (info) => converToNormalDate(info.getValue()),
  }),

  columnHelper.accessor("message", {
    header: `Messages`,
    cell: (info) => {
      return <p className="max-w-60">{info.getValue()}</p>;
    },
  }),
];

const Page = () => {
  const { data } = useGetAllContactMessage();
  const { mutate: mutateContactMessageStatus } = useUpdateMessageStatus();

  const markAsRead = (data: any) => {
    if (!data?.isRead) {
      mutateContactMessageStatus(data.id);
    }
  };
  return (
    <Table
      columns={columns}
      data={data}
      title="Contact Messages"
      handleRowClick={(data: any) => markAsRead(data)}
    />
  );
};

export default Page;
