"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  AcceptedButton,
  CompletedButton,
  DropDown,
  IncompleteButton,
  PendingButton,
  RejectedButton,
  SucceededButton,
} from "@/components";
import { OrderStatus } from "@/enum";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { EyeIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn, converToRelativeDate } from "@/lib/utils";
import { useGetAllOrder } from "@/hooks/api/orders/useGetAllOrder";
import { useMarkRead } from "@/hooks/api/orders/useMarkOrderRead";
import Table from "@/components/ui/table";

const columnHelper = createColumnHelper<any>();

 const orderFilterOptions = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Accepted",
    value: OrderStatus.ACCEPTED,
  },
  {
    label: "Pending",
    value: OrderStatus.PENDING,
  },
  {
    label: "Completed",
    value: OrderStatus.COMPLETED,
  },
  {
    label: "Rejected",
    value: OrderStatus.REJECTED,
  },
];

 const paymentFilterOptions = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Succeeded",
    value: OrderStatus.SUCCEEDED,
  },
  {
    label: "Incompleted",
    value: OrderStatus.INPOMPLETED,
  },
];

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => {
      return (
        <Link href={`/orders/${info.row.original.id}/details`}>
          <div className="flex gap-x-1 relative font-semibold cursor-pointer hover:underline">
            {!info.row.original.isRead && (
              <p className="text-primary font-bold text-2xl absolute -ml-4">
                *
              </p>
            )}
            <p
              className={cn({
                "text-primary": !info.row.original.isRead,
              })}
            >
              {info.getValue()}
            </p>
          </div>
        </Link>
      );
    },
  }),

  columnHelper.accessor("phoneNumber", {
    header: "Phone Number",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("paymentMethod", {
    header: "Payment Method",
    cell: (info) => <p className="uppercase">{info.getValue()}</p>,
  }),

  columnHelper.accessor("createdAt", {
    header: "Order Time",
    cell: (info) => (
      <div className="text-black">{converToRelativeDate(info.getValue())}</div>
    ),
  }),

  columnHelper.accessor("deliveryDate", {
    header: "Desired Delivery Date",
    cell: (info) => {
      let date = format(new Date(info.getValue()), "yyyy-MM-dd KK:mm a");
      return <div className="w-40 text-black">{date}</div>;
    },
  }),

  columnHelper.accessor("isTakeAway", {
    header: "Delivery Type",
    cell: (info) => {
      return (
        <div className="w-40 text-black">
          {info.getValue() ? "Take away" : "Delivery"}
        </div>
      );
    },
  }),

  columnHelper.accessor("totalPrice", {
    header: "Total Price",
    cell: (info) => (
      <div className="font-semibold">€{info.getValue().toFixed(2)}</div>
    ),
  }),

  columnHelper.accessor("orderStatus", {
    header: "Order Status",
    cell: (info) => {
      return (
        <>
          <div>
            {info.getValue() === OrderStatus.ACCEPTED && <AcceptedButton />}
            {info.getValue() === OrderStatus.REJECTED && <RejectedButton />}
            {info.getValue() === OrderStatus.PENDING && <PendingButton />}
            {info.getValue() === OrderStatus.COMPLETED && <CompletedButton />}
          </div>
        </>
      );
    },
  }),

  columnHelper.accessor("paymentStatus", {
    header: "Payment Status",
    cell: (info) => {
      return (
        <div className="text-center">
          {info?.row?.original?.paymentMethod == "cash" ? (
            <span className="text-center">-</span>
          ) : (
            <div>
              {info.getValue() === OrderStatus.ACCEPTED && <AcceptedButton />}
              {info.getValue() === OrderStatus.REJECTED && <RejectedButton />}
              {info.getValue() === OrderStatus.PENDING && <PendingButton />}
              {info.getValue() === OrderStatus.COMPLETED && <CompletedButton />}
              {info.getValue() === OrderStatus.SUCCEEDED && <SucceededButton />}
              {info.getValue() === OrderStatus.INPOMPLETED && (
                <IncompleteButton />
              )}
              {info.getValue() === OrderStatus.INPOMPLETE && (
                <IncompleteButton />
              )}
            </div>
          )}
        </div>
      );
    },
  }),

  columnHelper.accessor("action", {
    header: `Action`,
    cell: (info) => {
      return (
        <div className="flex gap-x-3">
          <Link href={`/orders/${info.row.original.id}/details`}>
            <EyeIcon size={24} color="#475569" className="cursor-pointer" />
          </Link>
        </div>
      );
    },
  }),
];

const Page = () => {
  const { control, watch } = useForm({
    defaultValues: {
      filter: orderFilterOptions[0],
      paymentFilter: paymentFilterOptions[0],
    },
  });

  let params = {
    orderStatus: `${watch("filter.value")}`,
    paymentStatus: `${watch("paymentFilter.value")}`,
  };

  useEffect(() => {
    if (watch("filter.value") || watch("paymentFilter.value")) {
      params = {
        orderStatus: `${watch("filter.value")}`,
        paymentStatus: `${watch("paymentFilter.value")}`,
      };
    }
  }, [watch("filter"), watch("paymentFilter")]);

  let searchParams = Object.fromEntries(
    Object.entries(params).filter(([key, value]) => value !== "")
  );

  const queryStringFilters = new URLSearchParams(searchParams).toString();

  const { data } = useGetAllOrder(
    queryStringFilters !== "" ? queryStringFilters : ""
  );
  const { mutate: mutateOrderStatus } = useMarkRead();

  const markAsRead = (data: any) => {
    if (!data?.isRead) {
      mutateOrderStatus(data.id);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        data={data}
        title="Order"
        handleRowClick={(data: any) => markAsRead(data)}
        headerClass="flex gap-x-4 py-5"
        filterButton={
          <DropDown
            className="rounded-md h-[46px] w-[12rem] -mt-[49px]"
            labelClass="text-gray-500"
            control={control}
            name="filter"
            label="Order filter :"
            options={orderFilterOptions}
          />
        }
        secondFilterButton={
          <DropDown
            className="rounded-md h-[46px] w-[12rem] -mt-[49px]"
            control={control}
            labelClass="text-gray-500"
            name="paymentFilter"
            label="Payment Filter :"

            options={paymentFilterOptions}
          />
        }
      />
    </>
  );
};

export default Page;
