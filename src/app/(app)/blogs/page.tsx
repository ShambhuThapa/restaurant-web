"use client";

import React, { useState } from "react";
import Link from "next/link";

import { useGetAllBlog } from "@/hooks/api/blog/useGetAllBlog";
import BlogContent from "@/components/ui/blog";

const Page = () => {
  const { data } = useGetAllBlog();
  const [readMore, setReadMore] = useState(false);
  const [selected, setSelected] = useState("");
  const readmoreText = () => {
    setReadMore(!readMore);
  };

  return (
    <>
      <div className=" pt-72 ">
        <div className="flex lg:flex-row flex-col   gap-5  ">
          <div className=" lg:p-4  px-7  flex flex-col lg:w-[20vw] w-full lg:border-r-2">
            <div className="lg:text-end px-2 lg:-mt-6">
              <h1 className=" text-4xl">Blog Posts</h1>
            </div>

            <div className="mt-6 flex flex-col lg:items-end   ">
              {data?.map((value: any) => {
                {
                  return (
                    <Link
                      href={`#${value.title}`}
                      key={value.id}
                      onClick={() => setSelected(value.id)}
                    >
                      <li
                        className={`p-2 cursor-pointer hover:text-primary  list-none uppercase ${
                          selected === value.id ? "text-primary" : "text-white"
                        }`}
                      >
                        {value.title}
                      </li>
                    </Link>
                  );
                }
              })}
            </div>
          </div>

          <div className="flex  flex-col w-full justify-center lg:-mt-9 ">
            {data?.length ? (
              data?.map((data: any) => (
                <div key={data.id}>
                  <BlogContent
                    readMore={readMore}
                    readMoreText={readmoreText}
                    data={data}
                  />
                </div>
              ))
            ) : (
              <p className="text-primary lg:px-0 px-10">No blogs found..</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
