import Image from "next/image";

const MenuImage = (props: { imageUrl: string }) => {
  const { imageUrl } = props;
  return (
    <div className="lg:w-[30rem] w-full  h-[30rem] bg-white shadow rounded-md mt-4">
      <Image
        src={imageUrl}
        width={600}
        height={600}
        alt="menu image"
        className="w-full h-full rounded-md"
      />
    </div>
  );
};

export default MenuImage;
