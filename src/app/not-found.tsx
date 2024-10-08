"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components";

import { cn } from "@/lib/utils";

import { poppins } from "./layout";

export default function NotFound() {
  const router = useRouter();
  return (
    <html lang="en">
      <body className={cn(poppins.variable, "font-sans")}>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-3xl">
              Page not found
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600 sm:text-2xl">
              You are not supposed to be here.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                label="Go back "
                className="rounded-md"
                onClick={() => router.back()}
              />
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
