import Image from "next/image";
import { Header } from "@/components";

interface Props {
  data: Data;
  readMore: boolean;
  readMoreText: () => void;
}
interface Data {
  id: string;
  title: string;
  body: string;
  imageUrl: string;
}

export default function BlogContent(props: Props) {
  const { readMore, readMoreText, data } = props;

  const displayText = data?.body.slice(0, 600);
  const readmoreText = data?.body.slice(600, data?.body.length);

  return (
    <div className="w-full flex justify-center ">
      <div className="  w-full flex justify-center   ">
        <div
          className=" w-full bg-primary  flex m-10  py-10 lg:px-7 px-3"
          id={data?.title}
        >
          <div className="flex lg:flex-row flex-col gap-5 ">
            <div className=" h-auto lg:w-[40rem] w-full">
              <Image
                src={data?.imageUrl}
                height={900}
                width={900}
                alt="blog images"
                className="object-cover h-[30vh] lg:h-[60vh] w-full "
              />
            </div>
            <div className="w-full">
              <div className="">
                <Header className="my-0 p-0 text-center">{data?.title}</Header>
              </div>
              <div className="  flex ">
                <div className="max-w">
                  <p className="overflow-hidden ">
                    {displayText}
                    <span className={`${readMore ? "block" : "hidden"}`}>
                      {readmoreText}
                    </span>
                  </p>
                  {data?.body?.length > 600 && (
                    <button
                      className="rounded absolute right-24 "
                      onClick={readMoreText}
                    >
                      {readMore ? "Read Less" : "Read More..."}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
