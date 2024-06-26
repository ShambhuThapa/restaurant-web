"use client";

import React, { useEffect } from "react";
import { DropDown } from "@/components";
import { ReviewStatus } from "@/enum";
import { createColumnHelper } from "@tanstack/react-table";
import { useForm } from "react-hook-form";

import { converToNormalDate } from "@/lib/utils";
import { useGetAllReview } from "@/hooks/api/Review/useGetReview";
import { useUpdateReviewStatus } from "@/hooks/api/Review/useUpdateReviewStatus";
import { useUpdateReviewViewStatus } from "@/hooks/api/Review/useUpdateReviewViewStatus";
import Table from "@/components/ui/table";

const columnHelper = createColumnHelper<any>();

const filterOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Approved",
    value: ReviewStatus.HOME,
  },
  {
    label: "Declined",
    value: ReviewStatus.ARCHIVED,
  },
];

const Page = () => {
  const { control, watch } = useForm({
    defaultValues: {
      filter: filterOptions[0],
    },
  });
  const { data } = useGetAllReview(watch("filter")?.value);
  const { mutate } = useUpdateReviewStatus();
  const { mutate: mutateReviewStatus } = useUpdateReviewViewStatus();

  const handleStatusChange = (data: any) => {
    if (
      data?.status === ReviewStatus.DEFAULT ||
      data?.status === ReviewStatus.ARCHIVED
    ) {
      mutate({
        id: data?.id,
        status: ReviewStatus.HOME,
      });
    }

    if (data?.status === ReviewStatus.HOME) {
      mutate({
        id: data?.id,
        status: ReviewStatus.ARCHIVED,
      });
    }
  };

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
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
      header: "Email",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("createdAt", {
      header: "Date",
      cell: (info) => {
        const date = converToNormalDate(info.getValue());
        return <p className="min-w-28">{date}</p>;
      },
    }),

    columnHelper.accessor("rating", {
      header: "Rating",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("message", {
      header: "Message",
      cell: (info) => {
        return <p className="min-w-72">{info.getValue()}</p>;
      },
    }),

    columnHelper.accessor("action", {
      header: `Action`,
      cell: (info) => {
        return (
          <div className="flex gap-x-3 min-w-40 pl-1">
            {info.row.original.status === ReviewStatus.DEFAULT ||
            info.row.original.status === ReviewStatus.ARCHIVED ? (
              <button
                onClick={() => handleStatusChange(info.row.original)}
                className="px-2 py-1 bg-green-500 rounded-md font-semibold text-white hover:bg-green-700"
              >
                Approve
              </button>
            ) : (
              <button
                onClick={() => handleStatusChange(info.row.original)}
                className="px-2 py-1 bg-primary rounded-md font-semibold text-white hover:bg-primary-700"
              >
                Decline
              </button>
            )}
          </div>
        );
      },
    }),
  ];

  const markAsRead = (data: any) => {
    if (!data?.isRead) {
      mutateReviewStatus(data.id);
    }
  };

  return (
    <Table
      columns={columns}
      data={data}
      title="Reviews"
      filterButton={
        <DropDown
          className="rounded-md h-[46px] w-[12rem]"
          control={control}
          name="filter"
          options={filterOptions}
        />
      }
      handleRowClick={(data: any) => markAsRead(data)}
    />
  );
};

export default Page;
