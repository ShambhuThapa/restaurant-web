"use client";

import React from "react";
import { Button } from "@/components";

import { useGetOrderAnalytics } from "@/hooks/api/orders/useGetOrderAnalytics";
import { useChangeRestaurantStatus } from "@/hooks/api/restaurantStatus/useChangeRestaurantStatus";
import { useGetRestaurantStatus } from "@/hooks/api/restaurantStatus/useGetRestaurentStatus";

const Page = () => {
  const { data } = useGetOrderAnalytics();
  const { mutate } = useChangeRestaurantStatus();
  const { data: status } = useGetRestaurantStatus();

  const handleRestaurentStatus = () => {
    mutate({
      ...status,
      isClosed: !status.isClosed,
    });
  };

  return (
    <div className="">
      <p className="text-gray-800">Today&apos;s order information.</p>

      <dl className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 border border-gray-200 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Total Orders
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-green-500">
            {data?.totalOrders || "0"}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 border border-gray-200 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Accepeted Orders
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-green-500">
            {data?.accepetedOrders || "0"}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 border border-gray-200 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Pending Orders
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-green-500">
            {data?.pendingOrders || "0"}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 border border-gray-200 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Completed Orders
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-green-500">
            {data?.completedOrders || "0"}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 border border-gray-200 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Rejected Orders
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-primary">
            {data?.rejectedOrders || "0"}
          </dd>
        </div>
      </dl>

      <div className="mt-10">
        <h1 className="text-xl font-bold text-primary">Restaurant Status</h1>
        <p className="text-gray-600 text-sm">
          You can change restaurant status by clicking the button.
        </p>

        <p className="text-sm font-semibold text-gray-700">
          Current Status:
          {status?.isClosed ? (
            <span className="text-lg text-primary ml-2 font-semibold">
              Closed
            </span>
          ) : (
            <span className="text-lg text-green-500 ml-2 font-semibold">
              Open
            </span>
          )}
        </p>
        <div className="my-4">
          <Button
            className="rounded-md w-auto"
            label={!status?.isClosed ? "Close Restaurant" : "Open Restaurant"}
            variant={"secondary"}
            onClick={handleRestaurentStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
