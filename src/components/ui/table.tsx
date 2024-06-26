"use client";

import React from "react";
import Link from "next/link";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button, Header, Input } from "..";

const TableHead = (props: { table: any; headerHasBackground: boolean }) => {
  const { table, headerHasBackground } = props;

  return (
    <thead className="font-medium">
      {table.getHeaderGroups().map(
        (headerGroup: {
          id: React.Key | null | undefined;
          headers: {
            column: { columnDef: any };
            id: React.Key | null | undefined;
            isPlaceholder: any;
            getContext: () => any;
          }[];
        }) => {
          return (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(
                (
                  header: {
                    column: { columnDef: any };
                    id: React.Key | null | undefined;
                    isPlaceholder: any;
                    getContext: () => any;
                  },
                  idx: number
                ) => {
                  const { columnDef } = header.column;

                  return (
                    <th
                      scope="col"
                      key={header.id}
                      className={cn(
                        headerHasBackground ? "bg-gray-100" : "bg-white",
                        "px-6 py-4 text-start text-nowrap	 text-base border-y font-semibold tracking-wider text-gray-700"
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(columnDef.header, header.getContext())}
                    </th>
                  );
                }
              )}
            </tr>
          );
        }
      )}
    </thead>
  );
};

const TableBody = (props: any) => {
  const { table } = props;

  return (
    <tbody className="bg-white text-xs">
      {table.getRowModel().rows.map(
        (
          row: {
            id: React.Key | null | undefined;
            getVisibleCells: () => any[];
            original: any;
          },
          idx: any
        ) => {
          const { isSuspended } = row.original;
          return (
            <tr
              key={row.id}
              className={cn(idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
              onClick={() =>
                props?.handleRowClick && props?.handleRowClick(row.original)
              }
            >
              {row.getVisibleCells().map((cell, idx) => {
                const { columnDef } = cell.column;
                return (
                  <td
                    key={cell.id}
                    className={cn(
                      "px-6 py-4 text-sm",
                      isSuspended
                        ? "text-red-300 line-through"
                        : "text-gray-900"
                    )}
                  >
                    {flexRender(columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        }
      )}
    </tbody>
  );
};

export const pages = [5, 10, 20, 30, 50, 80, 100];

interface ITable {
  data: any[];
  columns: any[];
  title: string;
  link?: string;
  filterButton?: React.ReactElement;
  secondFilterButton?: React.ReactElement;
  hasPrimaryButton?: boolean;
  primaryButtonLabel?: string;
  primaryButtonAction?: () => void;
  primaryButtonDisabled?: boolean;
  handleRowClick?: (data: any) => void;
  isLoading?: boolean;
  hasSearch?: boolean;
  showPagination?: boolean;
  showLimit?: boolean;
  headerHasBackground?: boolean;
  headerClass?:string
}

export default function Table({
  data,
  columns,
  title,
  link,
  filterButton,
  secondFilterButton,
  hasPrimaryButton = false,
  primaryButtonLabel,
  primaryButtonAction,
  handleRowClick,
  primaryButtonDisabled = false,
  isLoading,
  hasSearch = true,
  showPagination = true,
  showLimit = true,
  headerHasBackground = true,
  headerClass
}: ITable) {
  const { register, watch } = useForm();
  const watchSearch = watch();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const safeValue: any = (() => {
        const value = row.getValue(columnId);
        return typeof value === "number" ? String(value) : value;
      })();

      return safeValue?.toLowerCase().includes(filterValue.toLowerCase());
    },
    state: {
      globalFilter: watchSearch?.search,
      columnVisibility: {
        id: false,
      },
    },
  });

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
        <div className="sm:flex-auto">
          {title && <Header className="py-0 ">{title}</Header>}
        </div>
        <div className={`mt-4 flex items-center justify-end gap-2 sm:mt-0 ${headerClass}`}>
          {hasSearch && (
            <div className="relative w-full  focus-within:z-10">
              <Input
                register={register}
                name="search"
                placeholder={"search"}
                className="rounded-md"
              />
            </div>
          )}
          {filterButton && React.cloneElement(filterButton)}
          {secondFilterButton && React.cloneElement(secondFilterButton)}
          {hasPrimaryButton && (
            <div className="flex-auto w-full ">
              {link && primaryButtonLabel && (
                <Link href={link} className="">
                  <Button
                    disabled={primaryButtonDisabled}
                    label={primaryButtonLabel}
                    className="rounded-md"
                    size="lg"
                  />
                </Link>
              )}
              {primaryButtonAction && primaryButtonLabel && (
                <Button
                  disabled={primaryButtonDisabled}
                  label={primaryButtonLabel}
                  onClick={primaryButtonAction}
                  className="rounded-md "
                  size="lg"
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 px-8 align-middle sm:px-6 md:px-8">
            <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 whitespace-normal">
                <TableHead
                  table={table}
                  headerHasBackground={headerHasBackground}
                />
                {isLoading && (
                  <tbody>
                    <tr>
                      <td colSpan={4}>
                        <p className="animate-pulse p-4 text-center text-xs">
                          {"Please wait. Data is loading..."}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                )}
                {data && data.length ? (
                  <TableBody table={table} handleRowClick={handleRowClick} />
                ) : (
                  <tbody>
                    <tr>
                      <td>
                        <p className="p-4 text-sm text-gray-500">
                          {"No data found."}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
              {showPagination && data && (
                <nav
                  className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                  aria-label="Pagination"
                >
                  <div className="hidden sm:block">
                    <p className="text-base text-gray-700">
                      {"Page"} &nbsp;
                      <span className="font-medium">
                        {table.getState().pagination.pageIndex + 1}
                      </span>
                      &nbsp; {"of"} &nbsp;
                      <span className="font-medium">
                        {table.getPageCount()}
                      </span>
                    </p>
                  </div>
                  {showLimit && (
                    <div className="pl-3">
                      <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                          table.setPageSize(Number(e.target.value));
                        }}
                        // placeholder="Limit"
                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                      >
                        {pages?.map((pageSize) => (
                          <option key={pageSize} value={pageSize}>
                            {pageSize}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="flex flex-1 justify-between sm:justify-end">
                    <button
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50"
                    >
                      {"Previous"}
                    </button>
                    <button
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50"
                    >
                      {"Next"}
                    </button>
                  </div>
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
